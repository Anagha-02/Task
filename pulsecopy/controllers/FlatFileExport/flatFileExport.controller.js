const { ObjectId } = require('mongodb')
const FileExport = require('../../typeDefs')

const _ = require('lodash')
const Excel = require("exceljs");
const path = require('path')
const { check, validationResult } = require('express-validator')

const COLLECTION = 'exportConfigurations'

class FlatFileExportController {

    constructor(db) {
        this.db = db
        this.saveExportConfiguration = this.saveExportConfiguration.bind(this)
        this.editExportConfiguration = this.editExportConfiguration.bind(this)
        this.getExcelSheets = this.getExcelSheets.bind(this)
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

    async editExportConfiguration(req, res, next) {
        const { configId } = req.params
        const payload = {
            $set: {
                ...req.body,
                updatedAt: new Date().toISOString(),
            },
        }

        const findConfig = await this.getConfiguration(COLLECTION, configId)

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

    async getExcelSheets(req, res, next) {

        let result = []
        result = await this.fetchAllRecords(COLLECTION);
/*
        this.db.collection('exportConfigurations').find({}).toArray(function (err, result) {
            if (err) throw err;*/
            console.log(result);

            let workBook = new Excel.Workbook();
            let workSheet = workBook.addWorksheet("Data");

            workSheet.columns = [
                { header: "Id", key: "id", width: 5 },
                { header: "ClientId", key: "clientId", width: 25 },
                { header: "Team", key: "team", width: 25 },
                { header: "Tool", key: "tool", width: 25 },
            ];
            workSheet.addRows(result);

            const fileName = 'Data.xlsx'
            const filePath = path.resolve(__dirname, fileName)

            /*
            workBook.xlsx.writeFile(filePath).then(function () {
                console.log("file saved!");
            });
            */

            return workBook.xlsx.writeFile(filePath).then((data) => {
                res.setHeader(
                    "Content-Type",
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                );
                res.setHeader(
                    "Content-Disposition",
                    "attachment; filename=" + "Data.xlsx"
                );
                res.status(200).end();
            });
       // });
    }

    getConfiguration(collection, id) {
        return this.db.collection(collection).findOne({ _id: ObjectId(id) })
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
        else if (action === 'download') {
            defaultSchema = [
                check('configId').isMongoId().withMessage('Invalid configuration id'),
            ]
        }

        return defaultSchema
    }

    validate(req, res, next) {
        const errors = validationResult(req)

        if (errors.isEmpty()) {
            return next()
        }
        const extractedErrors = []
        errors.array().map((err) => {
            if (err.value === "" || err.param === 'configId')
                extractedErrors.push({ currentValue: err.value, [err.param]: err.msg })
        })

        return res.json({ status: "error", message: extractedErrors })
    }

    fetchAllRecords(collection) {
        let datas = [];
        datas = this.db.collection(collection).find({}).toArray()
        return datas;
    }
}

module.exports = FlatFileExportController;