const path = require('path')
const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// const fs = require('fs-extra')
//
// const appDbPath = './db/'
// const appDbFile = 'app.sqlite'
// fs.ensureDirSync(appDbPath)
// const appDbFullPath = path.resolve(appDbPath, appDbFile)

const sequelizeConfig = require('./package.json').sequelize[0]
console.log({sequelizeConfig});

const sequelizeSetup = require('./sequelize').setup
console.log({sequelizeSetup});
sequelizeSetup()


// console.log(path.resolve(appDbPath, appDbFile));
// const Sequelize = require('sequelize')
// const sequelize = new Sequelize(
//   'database',
//   'username',
//   'password',
//   {
//     dialect: 'sqlite',
//     storage: appDbFullPath
//   }
// )
// const {db} = require('./package.json')
// console.log(db);

// sequelize
//   .authenticate()
//   .then(
//     () => {
//       console.log('Connection has been established successfully');
//     }
//   )
//   .catch(
//     (err) => {
//       console.log('Unable to connect');
//     }
//   )
//
// const App = sequelize
//   .define(
//     'app',
//     {
//       version: {
//         type: Sequelize.STRING
//       }
//     }
//   )
//
// App.sync(
//     // {force: true}
//   )
//   .then(
//     () => {
//       console.log('Setup App table successfully');
//       return App.create({
//         version: 3
//       })
//     }
//   )
//   .then(
//     () => {
//       return App.findAll().then(users => {
//         console.log(users)
//       })
//
//     }
//   )
//   .catch(
//     (err) => {
//       console.log('Cannot setup App table');
//     }
//   )





app.prepare()
.then(() => {
  const server = express()

  server.use('/adminlte', express.static(__dirname))

  server.get('/p/:id', (req, res) => {
    const actualPage = '/post'
    const queryParams = { id: req.params.id }
    app.render(req, res, actualPage, queryParams)
  })

  server.get('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(3000, (err) => {
    if (err) throw err
    console.log('> Ready on http://localhost:3000')
  })
})
.catch((ex) => {
  console.error(ex.stack)
  process.exit(1)
})
