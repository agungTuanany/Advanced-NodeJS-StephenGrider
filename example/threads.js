"use strict"

/*
 * This code explain that Node is not run all of things in single-threads
 *
 * Thread Pool is a series for threads that can be used for running
 * computationally intensive task such as the pbkdf2() function by default
 *
 */

// Control Thread Pool size
// change it into 2, and see the result of the code
process.env.UV_THREADPOOL_SIZE = 2
// process.env.UV_THREADPOOL_SIZE = 5

// Dependencies
const crypto	= require ("crypto")

const start = Date.now ()

crypto.pbkdf2 ("a", "b", 100000, 512, "sha512", () => {
    console.log ("crypto.pbkdf2 - 1:", Date.now () - start)
})

crypto.pbkdf2 ("a", "b", 100000, 512, "sha512", () => {
    console.log ("crypto.pbkdf2 - 2:", Date.now () - start)
})

crypto.pbkdf2 ("a", "b", 100000, 512, "sha512", () => {
    console.log ("crypto.pbkdf2 - 3:", Date.now () - start)
})

crypto.pbkdf2 ("a", "b", 100000, 512, "sha512", () => {
    console.log ("crypto.pbkdf2 - 4:", Date.now () - start)
})

crypto.pbkdf2 ("a", "b", 100000, 512, "sha512", () => {
    console.log ("crypto.pbkdf2 - 5:", Date.now () - start)
})
