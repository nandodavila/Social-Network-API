const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { usernames, emails, thoughts } = require('./data');


const user = [];
const userThought = [];
insertUsers();
insertThought();


function insertUsers(){
    for(let i=0; i < usernames.length; i++) {
        const userObj = {
            username: usernames[i],
            email: emails[i]
        }
        user.push(userObj)
    }
};

function insertThought(){
    for(let i=0; i < usernames.length; i++) {
        const thoughtObj = {
            thoughtName: thoughts[i],
            username: usernames[i],
        }
        userThought.push(thoughtObj)
    }
};

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');
  console.log(userThought)

  
  await User.deleteMany({});

  
  await Thought.deleteMany({});

  await User.insertMany(user);

  await Thought.insertMany(userThought);

  console.table(user);
  console.table(userThought);
  console.info('Seeding complete! 🌱');
  process.exit(0);


});