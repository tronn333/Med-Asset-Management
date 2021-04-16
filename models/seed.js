const mongoose = require('mongoose') /// seeder for fake users for testing
const faker = require('faker');
const User = require("./user")
mongoose.connect('mongodb://localhost:27017/studyproject', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
}, () => {
  console.log('Connection to databse is successful.');
});


async function seedUser() {
  for (let i = 0; i < 10; i++) {
    let name1 = faker.name.findName();
    let email1 = faker.internet.email();
    let admin1 = faker.datatype.boolean();
    let password1 = faker.internet.password();
    let numberRandom = Math.floor(Math.random() * 5)
    let item = new User({
      name: `${name1}`,
      email: `${email1}`,
      admin: `${admin1}`,
      department: `${numberRandom}`,
      password: `${password1}`
    });
    await item
      .save()
      .then(success => { })
      .catch(err => { });
  }
}
async function main() {
  await seedUser()
}
main().then(() => console.log('its work+'))

module.exports = { seedUser }

