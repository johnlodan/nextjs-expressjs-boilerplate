import StudentsModel from "../models/students";
import InitiateMongoServer from '../config/db'
import UsersModel from "../models/users/users";
import TeachersModel from "../models/teachers";

var process = require('node:process');
var uFake = require('../faker/users.json')
var tFake = require('../faker/teachers.json')
var sFake = require('../faker/students.json')

InitiateMongoServer()

async function runFaker() {
    Promise.all([
        await UsersModel.insertMany(uFake),
        await StudentsModel.insertMany(sFake),
        await TeachersModel.insertMany(tFake)
    ]).catch(err => {
        console.error("An error occurred. ", err)
    }).finally(() => {
        console.info("::ALL DATA IMPORTED SUCCESSFULLY.")
        console.info("::Running faker module was successful. You can now exit/close this terminal.")
        process.exit()
    })
}

runFaker()