'use strict'
/*
 * Example Unxepected Event loop Behavior
 *
 * HTTPS module do not work on thred pool
 * fs && crypto module do work on thread pool
 *
*/

// Custom Thread pool
process.env.UV_THREADPOOL_SIZE = 1

// Dependencies
const https			= require ("https")
const crypto		= require ("crypto")
const fs			= require ("fs")

const start = Date.now ()


// Helpers functions
const doRequest = () => {
	https
		.request ("https://www.duckduckgo.com", res => {
			res.on ("data", () => {})
			res.on ("end", () => {
				console.log ("HTTPS async call a request result: ", Date.now () - start)
			})
		})
		.end ()
}

const doHash = () => {
	crypto.pbkdf2 ("a", "b", 100000, 512, "sha512", () => {
		console.log ("HASH crypto.pbkdf2:", Date.now () - start)
	})
}

doRequest ()

fs.readFile ("multitask.js", "utf-8", () => {
	console.log ("FS read file as async:", Date.now () - start)
})

doHash ()
doHash ()
doHash ()
doHash ()







