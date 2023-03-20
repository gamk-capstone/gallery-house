"use strict";
const axios = require("axios");
const chalk = require("chalk");

const {
  db,
  models: { User, Art, Wall, ArtOnWall },
} = require("../server/db");
const getMainColors = require("../server/get-images");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // Creating Users
  const users = await Promise.all([
    User.create({ username: "grace", password: "123" }),
    User.create({ username: "malinda", password: "123" }),
    User.create({ username: "alex", password: "123" }),
    User.create({ username: "katrina", password: "123" }),
  ]);

  //Julia Ockert, FungusGallery, ArtKoraju, RedCheeksFactory, OnLaneAvenue
  const shop_ids = [5478758, 19639425, 14928731, 7780904, 6300167];

  /**
   * `findAllActiveListingsByShop` retrieves a list of all active listings on Etsy in a specific shop, paginated by listing creation date.
   * @returns {array} An array of 100 active listing_ids.
   */

  const findAllActiveListingsByShop = async (shop_ids) => {
    try {
      // const shop_id = shop_ids.map((s) => s)
      // console.log(shop_id)
      let { data } = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/17721959/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data1 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/5478758/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data2 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/19639425/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data3 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/14928731/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data4 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/7780904/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data5 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/6300167/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );

      const listing_ids = data.results.map((l) => l.listing_id);
      const listings_ids1 = data1.data.results.map((l) => l.listing_id);
      const listings_ids2 = data2.data.results.map((l) => l.listing_id);
      const listing_ids3 = data3.data.results.map((l) => l.listing_id);
      const listing_ids4 = data4.data.results.map((l) => l.listing_id);
      const listing_ids5 = data5.data.results.map((l) => l.listing_id);

      const listing_ids_result = [
        ...listing_ids,
        ...listings_ids1,
        ...listings_ids2,
        ...listing_ids3,
        ...listing_ids4,
        ...listing_ids5,
      ];
      return listing_ids_result;
    } catch (error) {
      console.log(error);
    }
  };

  const result = await findAllActiveListingsByShop();
  const a = result.slice(0, 100);
  const b = result.slice(101, 201);
  const c = result.slice(201, 301);
  const d = result.slice(301, 401);
  const e = result.slice(401, 501);

  /**
   * `getListingsByListingIds` allows to query multiple listing ids at once. Limit 100 ids maximum per query.
   * @returns {obj[]} An array of objects, including "name", "imageUrl", and "purchaseUrl" keys.
   */
  const getListingsByListingIds = async () => {
    try {
      let { data } = await axios.get(
        `https://openapi.etsy.com/v3/application/listings/batch?includes=Images&listing_ids=${a}`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data1 = await axios.get(
        `https://openapi.etsy.com/v3/application/listings/batch?includes=Images&listing_ids=${b}`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data2 = await axios.get(
        `https://openapi.etsy.com/v3/application/listings/batch?includes=Images&listing_ids=${c}`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data3 = await axios.get(
        `https://openapi.etsy.com/v3/application/listings/batch?includes=Images&listing_ids=${d}`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data4 = await axios.get(
        `https://openapi.etsy.com/v3/application/listings/batch?includes=Images&listing_ids=${e}`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );

      const result = data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
        colors: [[l.images[0].hue, l.images[0].saturation, l.images[0].brightness]]
      }));
      const result1 = data1.data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
        colors: [[l.images[0].hue, l.images[0].saturation, l.images[0].brightness]]
      }));
      const result2 = data2.data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
        colors: [[l.images[0].hue, l.images[0].saturation, l.images[0].brightness]]
      }));
      const result3 = data3.data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
        colors: [[l.images[0].hue, l.images[0].saturation, l.images[0].brightness]]
      }));
      const result4 = data4.data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
        colors: [[l.images[0].hue, l.images[0].saturation, l.images[0].brightness]]
      }));

      const final_result = [
        ...result,
        ...result1,
        ...result2,
        ...result3,
        ...result4,
      ];

      return final_result;
    } catch (error) {
      console.log(error);
    }
  };

  const art = await getListingsByListingIds();

  // const assignColors = async () => {
  //   // for (let i = 0; i<=art.length - 300; i++){
  //     art[0].colors = await getMainColors(art[0].imageUrl);
  //   // }
  // };

  // await assignColors();

  //Creating instances of Art Model from Esty shop 17721959. Note: We can easily change the shop(s) we're featuring in our db.
  const loadArt = await Promise.all(art.map((l) => Art.create(l)));

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

  console.log(`seeded ${chalk.blue(art.length)} artworks from 6 Esty shops`);
  console.log(`seeded ${chalk.green(users.length)} users`);
  console.log(chalk.red(`seeded successfully`));
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
    console.log(chalk.yellow("db connection closed 🎨"));
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
