"use strict"
/*
 * Configuration NodeJS using PM2.
 *
 */

process.env.UV_THREADPOOL_SIZE = 1

// Dependencies
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
