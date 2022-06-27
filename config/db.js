const { Sequelize } = require('sequelize');


// check if "test" was passed as parameter in console (if yes, use test db)
storage_path = "./database.sqlite";
if(process.argv[2]){
  if(process.argv[2]=="test"){
    storage_path = "./test_database.sqlite"
  }
}

// REPLACE HERE WITH postgresql or whatever (: 
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: storage_path
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

module.exports = sequelize;


