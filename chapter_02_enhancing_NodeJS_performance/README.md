# Chapter-2 Enhancing Performance

## Table of Contents
1. [Enhancing Performance](#enhancing-performance)
2. [Blocking the Event Loop](#blocking-the-event-loop)


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

Example in [index.js](./example/index.js)

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

So as developer though to understand why having NodeJS server run into a single thread
can sometimes be not very good approach.

