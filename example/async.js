"use strict"
/*
 * Explaining OS operation handling network request
 *
 * libuv delegate the request making to the underline OS.
 * OS actually that does real HTTP request. libuv is use to issue the request
 * then wait some OS to emit a signal some response has comeback to the request.
 *
 * Because libuv delegate work to the OS, the OS self decide whether to make
 * a new threads or not, or just generally how to handle the entire process of
 * making request.
 *
 * Because OS is making a request, there's no blocking of JS code inside the
 * event-loop.
 *
 * All the work is done by OS
 *
 */

// Dependencies
const https		= require ("https")

const start = Date.now ()

// Helpers function
const doRequest = () => {
	https
		.request ("https://www.duckduckgo.com", res => {
			res.on ("data", () => {})
			res.on ("end", () => {
				console.log ("async call a https request result: ", Date.now () - start)
			})
		})
		.end ()
}

doRequest ()
doRequest ()
doRequest ()
doRequest ()
doRequest ()
doRequest ()
doRequest ()
