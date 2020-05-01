"use strict"
/*
 * Server with express | I don't like to use 3rd party libs when in cours
 * Implement "cluster mode"
 *
 */

// Dependencies
const cluster		= require ("cluster")

// Is the file being executed in master mode?
if (cluster.isMaster) {
	// cause index-plain.js to be executed *again* but in slave (child) mode
	cluster.fork ()
	console.log ("cluster isMaster when called fork () ",cluster.isMaster)
}
else {
	// I'm a child, I'm going to act like a server and do nothing else
	const express		= require ('express')
	const app			= express ()

	const port = 8000

	// Helpers Functions
	const doWork = duration => {
		const start = Date.now ()

		// Loping while is true
		while (Date.now () - start < duration) {}
	}

	app.get ("/", (req, res) => {
		doWork (5000)
		res.send ("Hi There")
	})

	app.listen (port, () => {
		console.log ('\x1b[36m%s\x1b[0m',"index.js is running on port:", port)
	})
	console.log ("cluster isMaster: ",cluster.isMaster)
}


