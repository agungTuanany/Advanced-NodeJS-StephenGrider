"use strict"
/*
 * Psudo code event-loop
 *
 * Understanding how event-loop work: You can think of the event-loop as being
 * like a control structure that decided what thread should doing any given
 * point in time.  The event-loop is the absolute core of every program that
 * run. The run program exactly one event loop.
 *
 * The 5 steps below is the abstraction how your code be executed.
 *
 */

// Holders
const pendingTimers     = []
const pendingOSTasks    = []
const pendingOperations = []



// Node myFile.js
// New timers, tasks, operation are recorded from myFile running
myFile.runContents ()

// Helpers function
const shouldContinue = () => {
    // Check one   : Any pending setTimeout, setInterval, setImmediate?
    // Check two   : Any pending OS task? (like server listening to port)
    // Check three : Any pending long running operations? (like fs module)

    return (
        pendingTimers.length || pendingOSTasks.length || pendingOperations.length
    )
}


// Entire body execute in one 'tick'
while (shouldContinue) {
    // 1) Node looks at pendingTimers and sees if any functions are ready to be
    //    called. SetTimeout, setInterval

    // 2) Node looks at PendingOSTasks and pendingOperations and calls relevant
    //    callback

    // 3) Pause execution. Continue when ...
    //    - a new PendingOSTasks is done
    //    - a new pendingOperations is done
    //    - a timer is about to complete

    // 4) Look at pendingTimers. Call any setImmediate

    // 5) Handle any "close" events

}

// Exit back to terminal

