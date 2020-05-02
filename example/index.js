"use strict"
/*
 * Server with express | I don't like to use 3rd party libs when in cours
 *
 * XXX TODO use NodeJS standart lib for "worker_threads" either installing
 * "webworker-threads" in NodeJS V12-LTS.XXX
 * XXX FIXME: This code need to change!!! cause not working XXX
 *
 */

// Dependencies
const crypto		= require ("crypto")
const express		= require ('express')
const app			= express ()
const Worker		= require ("worker_threads")

const port = 8000

app.get ("/", (req, res) => {
	const worker = new Worker ( function () {
		this.onmessage = function () {
			let counter = 0
			while (conter < 1e9) {
				counter++
			}


			postMessage (counter)
		}
	})

	worker.onmessage = function (message) {
		console.log (message.data)
		res.send (""+message.data)
	}

	worker.postMessage ()
})

app.get ("/fast", (req, res) => {
	res.send ("This was fast")
})

app.listen (port, () => {
	console.log ('\x1b[36m%s\x1b[0m',"index.js is running on port:", port)
})

