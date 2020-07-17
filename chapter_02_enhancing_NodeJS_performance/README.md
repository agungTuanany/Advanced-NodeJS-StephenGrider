# Chapter-2 Enhancing Performance

## Table of Contents
1. [Enhancing Performance](#enhancing-performance)
2. [Blocking the Event Loop](#blocking-the-event-loop)
3. [Clustering in theory](#clustering-in-theory)
4. [Forking Children](#forking-children)


# Enhancing Performance

We're going to look at how we can set up NodeJS to run inside **cluster** mode.
Is used to start up multiple copies of node that that are all running inside
them.

![chapter-2-1.png](images/chapter-2-1.png "enhancing performance")

We cannot tricked node into running with multiple threads. But by starting up
multiple copies we get multiple instances of the event-loop. So it is vaguely
(uncertain) somewhat works in a similar fashion as **making node kind of
multi-threaded**.

The other thing going to investigate is using **worker threads** to do a lot of
performance work inside of applications. The worker threads are going to use the
threadpool is setup by `libuv` whenever start up node application.

**NOTE**: starting up NodeJS in **cluster mode** to handle a lot of *heavy duty
performance*,  *relevant calculations*, etc.. is **recommend approach** for
improving application performance. Cluster mode is very well battle tested
procedure  and it's something that are very confident will work correctly and
definitely enhance performance inside application.

**NOTE**: using **worker threads** is way more experimental and it's something
**not recommend approach**.


## What is cluster mode ?

Cluster mode is use to start up multiple copies of node that are all running
your server inside of them.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## Blocking the Event Loop

Example in [index.js](./../example/index.js)

![chapter-2-2.png](images/chapter-2-2.png "Single thread")

So the first thing to keep in mind here is that whenever some request comes into
server it gets processed inside of **one Single Thread** that contains
**event-loop**.

So some **request** comes in, **server processes** and **generates a response**.

However we start to run into some big issues when these **incoming request**
takes **some amount time** to process; So if we have some request coming in that
requires a lot of processing power like a lot of JavaScript that take a long
time to run through, then NodeJS server is not going to be able to process
incoming requests as effectively as they otherwise would.

Clearly the effect of some very long running or computationally intensive code
inside of a NodeJS project can be quite catastrophic.

So as developer though to understand why having NodeJS server run into a single
thread can sometimes be not very good approach.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>

## Clustering in theory
<br/>

![chapter-2-3.png](images/chapter-2-3.png "clustering in theory")

When start to use clustering inside of NodeJS application, is going to be
starting up multiple node processes.

There's always going to be **one parent process** or one kind of like
overarching (comprehensive) process called the **cluster manager**.

The **cluster manager** itself doesn't actually execute any application code; So
in other words the cluster manager isn't really responsible for handling
incoming request or fetching data from database or doing anything like that.
Instead cluster manager is responsible for monitoring the **health of each
individual instances**.

Cluster manager can **start** instances, it can **stop** instances or
**restart** instances, can do other kind of like **administrative tasks** but
it's still going to be up to the these individual instances of our server to
actually process incoming requests and doing to access the database, or handle
authentication or serve up static files, or anything else might usually use in
NodeJS application for.

Understanding how all this clustering stuff works can be a little bit
challenging just by diagrams.

![chapter-2-4.png](images/chapter-2-4.png "clustering in theory")

when use clustering the entire flow above changes little bit.

![chapter-2-5.png](images/chapter-2-5.png "clustering in theory")

So when run `node index.js` we get one copy of node and cluster manager
automatically created. The cluster manager is then responsible for **starting
up** those **worker instance** were actually responsible for processing those
incoming request.

To **create** worker instances the cluster manager is going to **require in**
the **cluster module** from the NodeJS standard library.

So the cluster module is a standard library module just like `fs`, `htpp`,
`crypto` or any of those once.

There's one particular function on `cluster module` called `fork()` and whenever
we call that `fork()` something very interesting happens. NodeJS internally goes
back to `index.js` and execute it a second time, but it executes it that second
time in a slightly different mode, that starts up **worker instance**.

**MEAN**: `index.js` is going executed multiple times by NodeJS. The **first**
time it's going to produce **cluster manager**, **second** or every time after
that it's going to be producing **worker instances**.

## What is cluster manager

Cluster manager is responsible for monitoring the health of individual instances
of applications that we're going to launch at the same time on singular
computer.

**[⬆ back to top](#table-of-contents)**
<br/>
<br/>Forking Children

## Forking Children

```javascript
// /example/.index.js
...
const cluster = require("cluster")

console.log (cluster.isMaster) \\ true
...
```

When NodeJS execute `index.js` NodeJS execute **content** that file; and NodeJS
starts up a copy of node that refer to as the **cluster manager**; The cluster
manager has `isManager` property always set to `true`; As soon start forking off
(`cluster.fork()`) additional worker instances `isMananger` set to `false`.

```javascript
// Is the file being executed in master mode?
if (cluster.isMaster) {
    // Cause index.js to be executed *again* but in "slave | child mode"
    cluster.fork()
}
else {
    ...
}
```
