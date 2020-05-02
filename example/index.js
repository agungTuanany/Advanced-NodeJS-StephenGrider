"use strict"
/*
 * Server with express | I don't like to use 3rd party libs when in cours
 * Implement "cluster mode"
 *
 * test the cluster with:
 * ? ab -c 6 -n 6 localhost:8000/
 *
 */

// Init Threadpool
process.env.UV_THREADPOOL_SIZE = 1;

// Dependencies
const cluster		= require ("cluster")

// Is the file being executed in master mode?
if (cluster.isMaster) {
	// Cause index.js to be executed *again* but in slave (child) mode
	cluster.fork ()
	cluster.fork ()
	console.log ("cluster isMaster when called fork () ",cluster.isMaster)
}
else {
	// I'm a child, I'm going to act like a server and do nothing else
	const crypto		= require ("crypto")
	const express		= require ('express')
	const app			= express ()

	const port = 8000

	app.get ("/", (req, res) => {
		crypto.pbkdf2 ("a", "b", 100000, 512, "sha512", () => {
			res.send ("Hi There")
		})
	})

	app.get ("/fast", (req, res) => {
		res.send ("This was fast")
	})

	app.listen (port, () => {
		console.log ('\x1b[36m%s\x1b[0m',"index.js is running on port:", port)
	})
	console.log ("cluster isMaster: ",cluster.isMaster)
}


