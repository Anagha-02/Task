const { config } = require('dotenv')
const { ObjectId } = require('mongodb')
const FileExport = require('../../typeDefs')
const { check, validationResult } = require('express-validator')

class FlatFileExportController {

    constructor(db) {
        this.db = db
        this.saveExportConfiguration = this.saveExportConfiguration.bind(this)
        this.deleteExportConfiguration = this.deleteExportConfiguration.bind(this)
        this.editExportConfiguration = this.editExportConfiguration.bind(this)
        this.getConfiguration = this.getConfiguration.bind(this)
        this.validationSchema = this.validationSchema.bind(this)
        this.validate = this.validate.bind(this)
    }

    async saveExportConfiguration(req, res) {
        const payload = { ...req.body }
        try {
            const resp = this.db.collection('exportConfigurations').insertOne(payload)
            res.status(200).json({ status: "sucess", message: "Saved sucessfully", data: resp.ops })
        } catch (err) {
            res.status(400).json({ status: "error", message: err })
        }
    }

    async deleteExportConfiguration(req, res) {
        const { id } = req.body.id
        try {
            const findConfig = this.getConfiguration(id)
            if (findConfig) {
                this.db.collection('exportConfigurations').deleteOne({ _id: id })
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

    validationSchema(action) {
        let defaultSchema =
            [
                check('clientId', 'ClientId is required').exists().trim().notEmpty(),
                check('team', 'Team name is required').exists().trim().notEmpty(),
                check('tool', 'Tool is required.').exists().trim().notEmpty()
            ]

        if (action === 'edit') {
            defaultSchema.push(check('configId').isMongoId().withMessage('Invalid id is entered'))
        }

        return defaultSchema
    }

    validate(req, res, next) {
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []
        errors.array().map((err) => extractedErrors.push({ value: err.value, [err.param]: err.msg }))

        return res.json({ status: "error", message: extractedErrors })
    }
}



module.exports = FlatFileExportController;