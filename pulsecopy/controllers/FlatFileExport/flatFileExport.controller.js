const { config } = require('dotenv')
const { ObjectId } = require('mongodb')
const FileExport = require('../../typeDefs')

class FlatFileExportController {

     constructor(db) {
         this.db = db
         this.saveExportConfiguration = this.saveExportConfiguration.bind(this)
         this.deleteExportConfiguration = this.deleteExportConfiguration.bind(this)
         this.editExportConfiguration = this.editExportConfiguration.bind(this)
         this.getConfiguration = this.getConfiguration.bind(this)
     }

     async saveExportConfiguration(req, res) {
         const payload = { ...req.body }
         try {
             const response = this.db.collection('exportConfigurations').insertOne(payload)
         } catch (err) {
             res.status(400).json({ status: "error", message: err })
         }
         res.status(200).json({ status: "sucess", message: "Saved sucessfully" })

     }

     async deleteExportConfiguration(req, res) {
         const { id } = req.body.id
         try {
            const findConfig = this.getConfiguration(id)
             if (findConfig) {
                this.db.collection('exportConfigurations').deleteOne({  _id: id })
                 // await res.returnconfig.remove()
                 res.json({ status: 'ok', message: 'Deleted' })
             }
             else
                 res.json({ status: 'error', message: 'No Id found' })
         } catch (err) {
             res.json({ status: 'error', message: err.message })
         }
     }

     async editExportConfiguration(req, res, next) {
        const { configId } = req.params
        const payload = {
            $set: {
                ...req.body,
                updatedAt: new Date().toISOString(),
            },
        }

        const findConfig = this.getConfiguration(configId)

        if (findConfig) {
            this.db.collection('exportConfigurations').findOneAndUpdate({ _id: ObjectId(configId) }, payload)
                .then(() => {
                    res.json({
                        status: 'Success',
                        message: 'Record updated successfully.'
                    })
                })
                .catch((err) =>
                    res.json({
                        error: {
                            status: 'Error',
                            message: 'Failed to update document',
                        },
                    })
                )
        }
        else {
            res.json({
                status: 'Error',
                message: 'No record found',

            })
        }
    }

    getConfiguration(id) {
         return this.db.collection('exportConfigurations').findOne({ _id: ObjectId(id) })
             // returnconfig = FileExport.findById(id)
     }
}



module.exports = FlatFileExportController;