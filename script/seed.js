"use strict";
const axios = require("axios");
const chalk = require("chalk");

const {
  db,
  models: { User, Art, Wall, ArtOnWall, SavedWall },
} = require("../server/db");
const getMainColors = require("../server/get-images");

/**
 * `seed` clears the "gallery-house" database, updates tables to match the models, and populates the database.
 * The function interacts with the User, Art, Wall, and ArtOnWall models.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");

  // --------------------------------------------------------------------
  //#region Instances of `User` model
  // --------------------------------------------------------------------
  const users = await Promise.all([
    User.create({ username: "grace", password: "123" }),
    User.create({ username: "malinda", password: "123" }),
    User.create({ username: "alex", password: "123" }),
    User.create({ username: "katrina", password: "123" }),
  ]);

  //#endregion Instances of `User` model

  // --------------------------------------------------------------------
  //#region Instances of `Art` model
  // --------------------------------------------------------------------

  /**
   * Store our 10 featured Esty shops' ids
   * 1. Julia Ockert, https://www.etsy.com/shop/JuliaOckert, 5478758
   * 2. FungusGallery, https://www.etsy.com/shop/FungusGallery, 19639425
   * 3. ArtKoraju, https://www.etsy.com/shop/ArtKoraju, 14928731
   * 4. RedCheeksFactory, https://www.etsy.com/shop/RedCheeksFactory, 7780904
   * 5. OnLaneAvenue, https://www.etsy.com/shop/OnLaneAvenue, 6300167
   * 6. Stardust Print Shop, https://www.etsy.com/shop/StardustPrintShop, 12949606
   * 7. CityandFlowerCollage, https://www.etsy.com/shop/CityandFlowerCollage, 8954053
   * 8. ArtNostalgie, https://www.etsy.com/shop/ArtNostalgie, 10607194
   * 9. SlavArtVintage, https://www.etsy.com/shop/SlavArtVintage, 17352094
   * 10. DesireePfeifferPhoto, hhttps://www.etsy.com/shop/DesireePfeifferPhoto, 19121341
   * 11. ClareElsaesser, https://www.etsy.com/shop/ClareElsaesser, 5677896
   * 12. Mirlande, https://www.etsy.com/shop/Mirlande, 5625705
   */
  const shop_ids = [
    5478758, 19639425, 14928731, 7780904, 6300167, 12949606, 8954053, 10607194,
    17352094, 5677896, 5625705, 19121341,
  ];

  let removed = 0;
  //  * `findAllActiveListingsByShop` retrieves a list of all active listings on Etsy in a specific shop, paginated by listing creation date.
  //  * @returns {array} An array of 100 active listing_ids.
  //  */

  const findAllActiveListingsByShop = async (shop_ids) => {
    try {
      let { data } = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/5478758/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data1 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/19639425/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data2 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/14928731/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data3 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/7780904/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data4 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/6300167/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data5 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/12949606/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data6 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/8954053/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data7 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/10607194/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data8 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/17352094/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data9 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/5677896/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data10 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/5625705/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data11 = await axios.get(
        `https://openapi.etsy.com/v3/application/shops/19121341/listings/active?limit=100`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );

      const listing_ids = data.results.map((l) => l.listing_id);
      const listings_ids1 = data1.data.results.map((l) => l.listing_id);
      const listings_ids2 = data2.data.results.map((l) => l.listing_id);
      const listing_ids3 = data3.data.results.map((l) => l.listing_id);
      const listing_ids4 = data4.data.results.map((l) => l.listing_id);
      const listing_ids5 = data5.data.results.map((l) => l.listing_id);
      const listing_ids6 = data6.data.results.map((l) => l.listing_id);
      const listing_ids7 = data7.data.results.map((l) => l.listing_id);
      const listing_ids8 = data8.data.results.map((l) => l.listing_id);
      const listing_ids9 = data9.data.results.map((l) => l.listing_id);
      const listing_ids10 = data10.data.results.map((l) => l.listing_id);
      const listing_ids11 = data11.data.results.map((l) => l.listing_id);

      const listing_ids_result = [
        ...listing_ids,
        ...listings_ids1,
        ...listings_ids2,
        ...listing_ids3,
        ...listing_ids4,
        ...listing_ids5,
        ...listing_ids6,
        ...listing_ids7,
        ...listing_ids8,
        ...listing_ids9,
        ...listing_ids10,
        ...listing_ids11,
      ];
      //remove faulty listings
      listing_ids_result.splice(listing_ids_result.indexOf(1012513409), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(809794921), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(267791209), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(817216741), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(667190580), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(1429765158), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(1428988952), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(1211486212), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(673804198), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(641805968), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(1108744508), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(879972253), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(648967950), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(561690842), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(1210493804), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(1409734426), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(1242062210), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(1379644894), 1);
      removed++;
      listing_ids_result.splice(listing_ids_result.indexOf(649425878), 1);
      removed++;

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
  const f = result.slice(501, 601);
  const g = result.slice(601, 701);
  const h = result.slice(701, 801);
  const i = result.slice(801, 901);
  const j = result.slice(901, 1001);

  // /**
  //  * `getListingsByListingIds` allows to query multiple listing ids at once. Limit 100 ids maximum per query.
  //  * @returns {obj[]} An array of objects, including "name", "imageUrl", and "purchaseUrl" keys.
  //  */
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
      let data5 = await axios.get(
        `https://openapi.etsy.com/v3/application/listings/batch?includes=Images&listing_ids=${f}`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data6 = await axios.get(
        `https://openapi.etsy.com/v3/application/listings/batch?includes=Images&listing_ids=${g}`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data7 = await axios.get(
        `https://openapi.etsy.com/v3/application/listings/batch?includes=Images&listing_ids=${h}`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data8 = await axios.get(
        `https://openapi.etsy.com/v3/application/listings/batch?includes=Images&listing_ids=${i}`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );
      let data9 = await axios.get(
        `https://openapi.etsy.com/v3/application/listings/batch?includes=Images&listing_ids=${j}`,
        { headers: { "x-api-key": "5wdviq8lfzumur7vsxlc7i3g" } }
      );

      const result = data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
      }));
      const result1 = data1.data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
      }));
      const result2 = data2.data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
      }));
      const result3 = data3.data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
      }));
      const result4 = data4.data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
      }));
      const result5 = data5.data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
      }));
      const result6 = data6.data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
      }));
      const result7 = data7.data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
      }));
      const result8 = data8.data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
      }));
      const result9 = data9.data.results.map((l) => ({
        name: l.title,
        imageUrl: l.images[0].url_fullxfull,
        purchaseUrl: l.url,
      }));

      const final_result = [
        ...result,
        ...result1,
        ...result2,
        ...result3,
        ...result4,
        ...result5,
        ...result6,
        ...result7,
        ...result8,
        ...result9,
      ];

      return final_result;
    } catch (error) {
      console.log(error);
    }
  };

  const art = await getListingsByListingIds();
  console.log("art.length", art.length);

  /**
   * `getEstyImagesMainColors` uses a callback function `getMainColors` (from /server/get-images.js) to retrieve the four main
   * colors of each image in our db. The colors are stored according to their HSL value (Hue, Saturation, and Lumousity).
   * @returns the `colors` column of art table populated with data
   */
  const getEstyImagesMainColors = async () => {
    for (let i = 0; i <= art.length - 1; i++) {
      //store results of current image's 4 main colors in a variable
      let colorsFromFn = await getMainColors(art[i].imageUrl);

      /** example shape of colorsFromFn:
       * [
       * [ 350, 71, 78, 1 ],
       * [ 271, 40, 24, 1 ],
       * [ 38, 77, 47, 1 ],
       * [ 320, 46, 37, 1 ]
       * ]
       */

      // Perform linear search because the array is unsorted
      /**
       * To apply Binary Search, first the 2D array needs to be sorted and that takes (M*N)log(M*N) time. So the
       * total time complexity to search any element is O((M * N) log(M * N)) + O(N + M) which bad compared with the time
       * complexity of Linear Search which is just O(N*M). Therefore, we choose Linear Search for
       * searching in an unsorted array, over Binary Search.
       */

      // analyze the results of the current image's 4 main colors
      // if the current array has 4 image values

      for (let j = 0; j <= colorsFromFn.length - 1; j++) {
        let currColor = colorsFromFn[j];

        /** example shape of currColor:
         * [ 350, 71, 78, 1 ]
         */

        for (let z = 0; z <= currColor.length - 1; z++) {
          let currValue = currColor[z];

          /**
           * example shape of currValue:
           * 350
           */

          // if the current value is not a number OR it doesn't exist OR it is not an integer, exit the loop.
          if (isNaN(currValue) || !currValue || !Number.isInteger(currValue)) {
            // console.log("BREAK____________", colorsFromFn);
            removed++;
            break;
          } //otherwise, continue searching the currValues in the currColor
        } //otherwise, continue searching the currValue in the next color...
      }
      //if the colorsFromFn data precisely matches all of these requirements, add the colorsFromFn to the `colors` attribute
      //of our Art model.
      art[i].colors = colorsFromFn;
    }
  };

  await getEstyImagesMainColors();

  //Finally, create instances of Art model using manipulated data retrieved from Esty's (v3) open API.
  const loadArt = await Promise.all(art.map((l) => Art.create(l)));

  // //#endregion Instances of `Art` model

  // --------------------------------------------------------------------
  //#region Instances of `SavedWall` model
  // --------------------------------------------------------------------

  const savedWalls = await Promise.all([
    SavedWall.create({
      images: [
        {
          imageUrl:
            "https://gamkgalleryhouse.s3.us-east-2.amazonaws.com/1679519860760.pexels-pixabay-45201.jpeg",
          purchaseUrl: null,
        },
        {
          imageUrl:
            "https://gamkgalleryhouse.s3.us-east-2.amazonaws.com/1679519860760.pexels-pixabay-45201.jpeg",
          purchaseUrl: null,
        },
        {
          imageUrl:
            "https://gamkgalleryhouse.s3.us-east-2.amazonaws.com/1679519860760.pexels-pixabay-45201.jpeg",
          purchaseUrl: null,
        },
        {
          imageUrl:
            "https://gamkgalleryhouse.s3.us-east-2.amazonaws.com/1679519860760.pexels-pixabay-45201.jpeg",
          purchaseUrl: null,
        },
        {
          imageUrl:
            "https://gamkgalleryhouse.s3.us-east-2.amazonaws.com/1679519860760.pexels-pixabay-45201.jpeg",
          purchaseUrl: null,
        },
      ],
    }),
    SavedWall.create({
      images: [
        {
          imageUrl:
            "https://gamkgalleryhouse.s3.us-east-2.amazonaws.com/1679519860760.pexels-pixabay-45201.jpeg",
          purchaseUrl: null,
        },
        {
          imageUrl:
            "https://gamkgalleryhouse.s3.us-east-2.amazonaws.com/1679519860760.pexels-pixabay-45201.jpeg",
          purchaseUrl: null,
        },
        {
          imageUrl:
            "https://gamkgalleryhouse.s3.us-east-2.amazonaws.com/1679519860760.pexels-pixabay-45201.jpeg",
          purchaseUrl: null,
        },
        {
          imageUrl:
            "https://gamkgalleryhouse.s3.us-east-2.amazonaws.com/1679519860760.pexels-pixabay-45201.jpeg",
          purchaseUrl: null,
        },
        {
          imageUrl:
            "https://gamkgalleryhouse.s3.us-east-2.amazonaws.com/1679519860760.pexels-pixabay-45201.jpeg",
          purchaseUrl: null,
        },
      ],
    }),
  ]);

  await savedWalls[0].setUser(await User.findByPk(1));
  await savedWalls[1].setUser(await User.findByPk(1));

  console.log(
    `seeded ${chalk.blue(art.length)} pieces of art from ${chalk.blue(
      shop_ids.length
    )} Esty shops`
  );
  console.log(`${chalk.magenta(removed)} faulty artworks removed from seed`);
  console.log(`seeded ${chalk.green(users.length)} users`);
  console.log(chalk.red(`seeded successfully`));
}

/**
 * We've separated the `seed` function from the `runSeed` function.
 * This way we can isolate the error handling and exit trapping.
 * The `seed` function is concerned only with modifying the database.
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

// We export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
