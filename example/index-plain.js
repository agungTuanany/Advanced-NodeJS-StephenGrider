"use strict"

/*
 * Plain server only with Node
 *
 */

// Dependencies
const cluster = require ("cluster")


//console.log ("cluster isMaster: ",cluster.isMaster)

// Is the file being executed in master mode?
if (cluster.isMaster) {
    // cause index-plain.js to be executed *again* but in slave (child) mode
    cluster.fork ()
    console.log ("cluster isMaster when called fork () ",cluster.isMaster)
}
else {
    // I'm a child, I'm going to act like a server and do nothing else
    const http = require ("http")

    // port
    const port = 8082

    // Helpers Functions
    const doWork = duration => {
        const start = Date.now ()

        // Loping while is true
        while (Date.now () - start < duration) {}
    }


    // Init server
    const server = http.createServer ( (req, res) => {
        res.end ("Hello There world")
    })

    server.listen (port, () => {
        console.log ('\x1b[36m%s\x1b[0m',`index-plain.js is running on port: `, port)
        console.log ("cluster isMaster: ",cluster.isMaster)
    })
}



