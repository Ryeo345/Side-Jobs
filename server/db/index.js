const conn = require('./conn');
const User = require('./User');
const Task = require('./Task');
const { faker } = require('@faker-js/faker');

User.hasMany(Task);
Task.belongsTo(User);

const syncAndSeed = async () => {
  if (process.env.NO_SEED) {
    return;
  }
  await conn.sync({ force: true });
  const [moe, lucy, larry, ethyl] = await Promise.all([
    User.create({
      username: 'moe',
      password: '123',
      firstName: 'Moe',
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: `https://avatars.githubusercontent.com/u/${Math.floor(
        Math.random() * 1000
      )}`,
      isAdmin: true,
    }),
    User.create({
      username: 'lucy',
      password: '123',
      firstName: 'Lucy',
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: `https://avatars.githubusercontent.com/u/${Math.floor(
        Math.random() * 1000
      )}`,
    }),
    User.create({
      username: 'larry',
      password: '123',
      firstName: 'Larry',
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: `https://avatars.githubusercontent.com/u/${Math.floor(
        Math.random() * 1000
      )}`,
    }),
    User.create({
      username: 'ethyl',
      password: '123',
      firstName: 'Ethyl',
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      avatar: `https://avatars.githubusercontent.com/u/${Math.floor(
        Math.random() * 1000
      )}`,
    }),
  ]);

  const [task1, task2] = await Promise.all([
    Task.create({
      title: 'Bring me a dozen eggs',
      description: 'Pick up a dozen eggs form the market and bring them to 123 Main St.',
      price: 15,
      city: 'New York',
      state: 'NY',
      category: 'shopping'
    }),
    Task.create({
      title: 'Organize my calendar',
      description: 'Put important dates on my google calendar and organize it',
      price: 25,
      city: 'New York',
      state: 'NY',
      category: 'virtual'
    })
  ]);

  return {
    users: {
      moe,
      lucy,
      larry,
      ethyl,
    },
    tasks: {
      task1,
      task2
    }
  };
};


module.exports = {
  syncAndSeed,
  User,
  Task,
};
