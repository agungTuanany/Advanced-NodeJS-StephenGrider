"use strict"
/*
 * Date: Sat 18 Jul 2020 08:06:59 PM WIB
 *
 * Example chapter-2: using worker_threads
 *
 * I'm not using 'webworker-thrads' as 3rd party libs instead using standard
 * library 'worker_threads'. As nodejs v12 `worker_threads` is stable
 *
 * extended tutorial: https://www.youtube.com/watch?v=eFJ7Q03jEVY
 *
 */

process.env.UV_THREADPOOL_SIZE = 1

// Dependencies
const { Worker, isMainThread, parentPort, workerData } = require("worker_threads")
const os = require("os")
const path = require("path")
// UI
const inquirer = require("inquirer")
const ora = require("ora")

const userCPUCount = os.cpus().length
const workerPath = path.resolve("factorial-worker.js")

const calculateFactorial = (number) => {
    if (number == 0) {
        return 1
    }
    return new Promise(async (parentResolve, parentReject) => {

        const numbers = [...new Array(number)].map(( _,i ) => i + 1)

        const segmentSize = Math.floor(numbers.length / userCPUCount)
        const segments = []

        console.log ("numbers:", numbers.length, ", CPU:", userCPUCount, ", segmentSize:", segmentSize)

        for (let segmentIndex = 0; segmentIndex < userCPUCount; segmentIndex++) {
            const start = segmentIndex * segmentSize
            const end = start + segmentSize
            const segment = numbers.slice(start, end)
            segments.push(segment)
        }

        try {
            const results = await Promise.all(
                segments.map(
                    segment =>
                    new Promise((resolve, reject) => {
                        const worker = new Worker(workerPath, {
                            workerData: segment
                        })

                        worker.on("message", resolve)
                        worker.on("error", reject)
                        worker.on("exit", code => {
                            if (code !== 0) reject (new Error(`worker stopped with exit code ${code}`))
                        })
                    })
                )

            )

            const finalResult = results.reduce((acc, val) => acc * val, 1)

            console.log("finalResult:", finalResult)
            console.log("results:", results)

            parentResolve(finalResult)
        }
        catch (e) {
            console.log("error in catch", e)
            parentReject(e)
        }

    })
}

const run = async () => {
    const {inputNumber} = await inquirer.prompt([
        {
            type: "number",
            name: "inputNumber",
            message: "Calculate factorial for",
            default: 10,
        }
    ])

    // console.log("Calculating factorial for", inputNumber)

    const spinner = ora("Calculating... ").start()

    const result = await calculateFactorial(inputNumber)

    spinner.succeed(`Result: ${result}`)
}

run()


// calculateFactorial(10)

