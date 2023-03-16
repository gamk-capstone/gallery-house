"use strict";
const axios = require("axios");

const {
  db,
  models: { User, Art, Wall, ArtOnWall },
} = require("../server/db");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "cody", password: "123" }),
    User.create({ username: "murphy", password: "123" }),
  ]);

  /**
   * `findAllActiveListingsByShop` retrieves a list of all active listings on Etsy in a specific shop, paginated by listing creation date.
   * @returns {array} An array of 100 active listing_ids.
   */

  const findAllActiveListingsByShop = async () => {
    try {
      let { data } = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/17721959/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      const listing_ids = data.results.map((l) => l.listing_id);
      return listing_ids;
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * `getListingsByListingIds` allows to query multiple listing ids at once. Limit 100 ids maximum per query.
   * @returns {obj[]} An array of objects, including "name", "imageUrl", and "purchaseUrl" keys.
   */
  const getListingsByListingIds = async () => {
    try {
      let { data } = await axios.get(
        `https://openapi.etsy.com/v3/application/listings/batch?includes=Images&listing_ids=${await findAllActiveListingsByShop()}`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      const result = data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
      }));
      return result;
    } catch (error) {
      console.log(error);
    }
  };
  const art17721959 = await getListingsByListingIds();

  //Creating instances of Art Model from Esty shop 17721959. Note: We can easily change the shop(s) we're featuring in our db.
  const loadArt17721959 = await Promise.all(art17721959.map((l) => Art.create(l)))

  //Creating Wall
  const walls = await Promise.all([
    Wall.create({
      name: "wall1",
      userId: 1,
    }),
    Wall.create({
      name: "wall2",
      userId: 1,
    }),
    Wall.create({
      name: "wall3",
      userId: 2,
    }),
  ]);

  // find the art
  const artRow = await Art.findByPk(1);
  const artRow2 = await Art.findByPk(2);
  // insert the association in the ArtOnWall table
  await walls[0].addArt(artRow, { through: ArtOnWall });
  await walls[0].addArt(artRow2, { through: ArtOnWall });
  await walls[1].addArt(artRow2, { through: ArtOnWall });
  await walls[2].addArt(artRow2, { through: ArtOnWall });

  console.log(`seeded ${loadArt17721959.length} artworks from shop Esty shop 17721959`)
  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
