"use strict"
/*
 * Server with express | I don't like to use 3rd party libs when in course
 * XXX TODO:
 *
 * example use "cluster" in NodeJS
 *
 */

process.env.UV_THREADPOOL_SIZE = 1

// Dependencies
const cluster = require("cluster")

// Is the file being executed in master mode?
if (cluster.isMaster) {
    // Cause index.js to be executed *again* but in "slave | child mode"
    cluster.fork()      // as you CPU core
    cluster.fork()      // as your CPU core

    // console.log ("isMaster status:", cluster.isMaster)
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
    })

    app.get("/fast", (req, res) => {
        res.send ("this was fast")
    })

    app.listen (port, () => {
        console.log ('\x1b[36m%s\x1b[0m',"index.js is running on port:", port)
    })
    // console.log ("isMaster status:", cluster.isMaster)
}
