const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usernames, thoughts } = require('./data');

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  
  await User.deleteMany({});

  
  await Thought.deleteMany({});

  await User.collection.insertMany(usernames);

  await Thought.collection.insertMany(thoughts);

  console.table(usernames);
  console.table(thoughts);
  console.info('Seeding complete! 🌱');
  process.exit(0);


});