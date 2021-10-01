const {
  FlatFileExportCtrl
} = require('./controllers')

const express = require('express');
let LOADER_URI = 'mongodb://localhost:27017/'

const app = express();

const MongoClient = require('mongodb').MongoClient;

MongoClient.connect(LOADER_URI, { useUnifiedTopology: true }, (err, client) => {
  if (err) throw err
  console.log("connected")

  const pulseDevDb = client.db('pulse-dev')

  const flatFileExportCtrl = new FlatFileExportCtrl(pulseDevDb)

  // const flatFileExportCtrl = new FlatFileExportCtrl()
  
  app.post('/save',
    flatFileExportCtrl.validationSchema(),
    flatFileExportCtrl.validate,
    async (req, res) => {
      flatFileExportCtrl.saveExportConfiguration(req, res)
    })

  app.put('/edit/:configId',
    // flatFileExportCtrl.getConfiguration,
    flatFileExportCtrl.validationSchema('edit'),
    flatFileExportCtrl.validate,
    async (req, res) => {
      flatFileExportCtrl.editExportConfiguration(req, res)
    }
  )

  app.get(
    '/export-config',
    // flatFileExportCtrl.validationSchema('download'),
    // flatFileExportCtrl.validate,
    async (req, res) => {
      flatFileExportCtrl.getExcelSheets(req, res)
    }
  )

})

module.exports = app;