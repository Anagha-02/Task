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
  app.post('/save/delete',
    // flatFileExportCtrl.getConfiguration,
    async (req, res) => {
      flatFileExportCtrl.deleteExportConfiguration(req, res)
    })

  app.post('/save', async (req, res) => {
    flatFileExportCtrl.saveExportConfiguration(req, res)
  })

  app.put('/edit/:configId',
      // flatFileExportCtrl.getConfiguration,
      async (req, res) => {
        flatFileExportCtrl.editExportConfiguration(req, res)
      }
    )
})

module.exports = app;