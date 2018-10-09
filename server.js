const path = require('path')
const express = require('express')
const next = require('next')
const logger = require('morgan')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

// const sequelizeConfig = require('./package.json').sequelize
// const sequelizeSetup = require('./sequelize').setup
// sequelizeSetup(sequelizeConfig)

const componentTypeController = require('./sequelize/controllers').componentType;
// router.get('/api/componentType',        componentTypeController.list);
// router.get('/api/componentType/:id',    componentTypeController.getById);
// router.post('/api/componentType',       componentTypeController.add);
// router.put('/api/componentType/:id',    componentTypeController.update);
// router.delete('/api/componentType/:id', componentTypeController.delete);


app.prepare()
  .then(() => {
    const server = express()

    server.use('/adminlte', express.static(__dirname))



    // RESTFULL API
    server.use(logger(
      ':method :status :url :response-time ms - :res[content-length]',
      {
        skip: (req, res) => {
          return req.url.startsWith('/_next/on-demand-entries-ping?')
        }
      }
      ))
    server.use(express.json())
    server.use(express.urlencoded({extended: false}))
    // server.use(cookieParser())
    server.get('/api/componentType',        componentTypeController.list);
    server.get('/api/componentType/:id',    componentTypeController.getById);
    server.post('/api/componentType',       componentTypeController.add);
    server.put('/api/componentType/:id',    componentTypeController.update);
    server.delete('/api/componentType/:id', componentTypeController.delete);




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
