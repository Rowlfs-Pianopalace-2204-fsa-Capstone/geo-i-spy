/** @format */
const challengeNames = ['Bottle', 'Can', 'Mouse', 'Laptop', 'Horse'];
const userNames = ['cody', 'murphy'];

const {
  db,
  models: { User },
} = require('../server/db/index');
const Challenge = require('../server/db/models/challenges');
User;
/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log('db synced!');

  // Creating Users
  for (let i = 0; i < userNames.length; i++) {
    console.log(userNames[1]);
    const user = await User.create({
      username: userNames[i],
      password: '123',
    });

    for (let j = 0; j < challengeNames.length; j++) {
      const challenge = await Challenge.create({
        name: challengeNames[j],
        difficulty: 'easy',
        score: j,
        description: 'Everyday items you can find easy.',
      });
      await user.addChallenge(challenge);
    }
  }
  console.log(`seeded ${challengeNames.length} challenges`);
  console.log(`seeded successfully`);
  return 'Data seeded';
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log('seeding...');
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log('closing db connection');
    await db.close();
    console.log('db connection closed');
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
