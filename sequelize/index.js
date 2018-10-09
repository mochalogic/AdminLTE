const path = require('path')
const fs = require('fs-extra')
const Sequelize = require('sequelize')

// {
//   "name": "app",
//   "dialect": "sqlite",
//   "database": null,
//   "username": null,
//   "password": null,
//   "sqlitePath": "db",
//   "sqliteFile": "app.sqlite"
// }

const setup = (sequelizeConfig) => {
  console.log('Setup from inside sequelize/index.js');
  // console.log({sequelizeConfig});

  sequelizeConfig.forEach((conf) => {
    console.log({conf})

    // Ensure DB Path Exists
    fs.ensureDirSync(path.resolve(conf.sqlitePath))
    console.log({ensureDirSync: path.resolve(conf.sqlitePath) });

    const appDbFullPath = path.resolve(conf.sqlitePath, conf.sqliteFile)
    console.log({appDbFullPath});

    const sequelize = new Sequelize(
      conf.database,
      conf.username,
      conf.password,
      {
        dialect: conf.dialect,
        storage: appDbFullPath
      }
    )

    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection has been established successfully');
      })
      .catch((err) => {
        console.log('Unable to connect');
      })

    const a = sequelize.import(path.resolve('sequelize', conf.name, 'App.js'))
    a.sync() //{force: true}
      .then(() => {
        console.log('Setup App table successfully');
        return a.create({
          version: 3
        })
      })
      .then(() => {
        return a.findAll().then(users => {
          console.log(users)
        })
      })
      .catch((err) => {
        console.log('Cannot setup App table');
      })

    console.log({a: a.name });


    // const App = sequelize
    //   .define(
    //     'app',
    //     {
    //       version: {
    //         type: Sequelize.STRING
    //       }
    //     }
    //   )

    // App.sync() // {force: true}
      // .then(() => {
      //   console.log('Setup App table successfully');
      //   return App.create({
      //     version: 3
      //   })
      // })
      // .then(() => {
      //   return App.findAll().then(users => {
      //     console.log(users)
      //   })
      // })
      // .catch((err) => {
      //   console.log('Cannot setup App table');
      // })

  })

  // const appDbFullPath = path.resolve(appDbPath, appDbFile)


}

module.exports = {
  setup
}
