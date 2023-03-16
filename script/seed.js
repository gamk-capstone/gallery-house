"use strict";

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

  //Creating Art
  const art = await Promise.all([
    Art.create({
      name: "Starry Night",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1200px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
      purchaseUrl:
        "https://www.overstockart.com/painting/van-gogh-starry-night",
    }),
    Art.create({
      name: "Dance",
      imageUrl: "https://arthive.net/res/media/img/oy800/work/b74/449397.jpg",
      purchaseUrl:
        "https://artisticafineart.com/products/the-dance-1910-by-henri-matisse",
    }),
  ]);

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

  console.log(`seeded ${users.length} users`);
  console.log(`seeded successfully`);
  // return {
  //   users: {
  //     cody: users[0],
  //     murphy: users[1],
  //   },
  //   art: {
  //     art1: art[0],
  //     art2: art[1],
  //   },
  //   wall: {
  //     cody: wall[0],
  //     murphy: wall[1],
  //   },
  //   artOnWall: {
  //     cody: art[0],
  //     murphy: art[1],
  //   },
  // };
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
