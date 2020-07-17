"use strict"
/*
 * Server with express | I don't like to use 3rd party libs when in cours
 *
 * XXX TODO use NodeJS standard lib for "worker_threads" either installing
 * "webworker-threads" in NodeJS V12-LTS.XXX
 *
 * XXX FIXME: This code need to  change!!! cause not working XXX
 *
 */

// Dependencies
const express = require("express")
const cluster = require("cluster")

const app  = express()
const port = 8000

// console.log (cluster.isMaster)

// Is the file being executed in master mode?
if (cluster.isMaster) {
    // Cause index.js to be executed *again* but in "slave | child mode"
    cluster.fork()
}
else {
    // I am a child, I'm going to act like a server an do nothing else
    const doWork = (duration) => {
        const start = Date.now()

        //while (Date.now() - start < duration) {
        //    //...
        //}
    }
    app.get ("/", (req, res) => {

        // Blocking any other request that coming
        doWork(5000)

        res.send("Hello world")
    })

    app.listen (port, () => {
        console.log ('\x1b[36m%s\x1b[0m',"index.js is running on port:", port)
    })
}



