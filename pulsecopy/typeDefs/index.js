const mongoose = require('mongoose')

const ExportConfigurationSchema = new mongoose.Schema(
	{
		clientId: { type: String, required: true },
		team: { type: String, required: true },
		tool: { type: String, required: true },
		updatedAt: {type: String, required: false}
		
	},
	{ collection: 'exportConfigurations' }
)

const model = mongoose.model('ExportConfigurationSchema', ExportConfigurationSchema)

module.exports = model

/*
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
        const { id } = req.params
        const findConfig = res.returnconfig
        if (!findConfig) { //findByIdAndRemove
            this.db.collection('exportConfigurations').deleteOne({ _id: ObjectId(id) })
                .then(() => {
                    res.json({
                        status: 'Success',
                        message: 'Record deleted successfully.'
                    })
                })
                .catch((err) =>
                    res.status(403).json({
                        error: {
                            status: 'E',
                            message: 'Failed to delete',
                        }
                    })
                )
            // await res.returnconfig.remove()
        }
        else {
            res.json({ status: 'error', message: 'No Id found' })
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

        const findConfig = res.returnconfig
        const options = { returnOriginal: false }

        if (findConfig) {
            this.db.collection('exportConfigurations').updateOne({ _id: ObjectId(configId) }, payload)
                .then(() => {
                    res.json({
                        status: 'Success',
                        message: `Record updated successfully.`
                    })
                })
                .catch((err) =>
                    res.status(403).json({
                        error: {
                            status: 'E',
                            message: `Failed to update document: ${err}`,
                        },
                    })
                )
        }
        else {
            res.json({
                status: 'Error',
                message: `No document matches with provided id`,

            })
        }
    }

    async getConfiguration(req, res, next) {
        let returnconfig
        const id = req.params
        try {
            returnconfig = this.db.collection('exportConfigurations').findOne({ _id: ObjectId(id) })
            // returnconfig = FileExport.findById(id)
            if (returnconfig == null) {
                return res.status(404).json({ status: 'error', message: 'Cannot find Id' })
            }
        } catch (err) {
            return res.status(500).json({ status: 'error', message: err })
        }
        res.returnconfig = returnconfig
        next()
    }
}



module.exports = FlatFileExportController;

*/