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

process.env.UV_THREADPOOL_SIZE = 1

// Dependencies
const cluster = require("cluster")

// Is the file being executed in master mode?
if (cluster.isMaster) {
    // Cause index.js to be executed *again* but in "slave | child mode"
    console.log ("isMaster status:", cluster.isMaster)
    cluster.fork()
    // cluster.fork()
    // cluster.fork()
    // cluster.fork()
}
else {
    // I am a child, I'm going to act like a server an do nothing else
    const express = require("express")
    const crypto = require("crypto")
    const app  = express()

    const port = 8000

    function getCrypto(res) {
        crypto.pbkdf2("a", "b", 100000, 512, "sha512", () => {
            res.send("Hello world")
        })
    }

    app.get ("/", (req, res) => {
        //res.send("Hello world")
        getCrypto(res)
        console.log ("isMaster status:", cluster.isMaster)
    })

    app.get("/fast", (req, res) => {
        res.send ("this was fast")
    })

    app.listen (port, () => {
        console.log ('\x1b[36m%s\x1b[0m',"index.js is running on port:", port)
    })
    console.log ("isMaster status:", cluster.isMaster)
}
