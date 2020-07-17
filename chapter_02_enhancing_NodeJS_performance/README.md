# Chapter-2 Enhancing Performance

## Table of Contents
1. [Enhancing Performance](#enhancing-performance)


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

NOTE: starting up NodeJS in **cluster mode** to handle a lot of heavy duty
performance,  relevant calculations, is **recommend approach** for improving
application performance. Cluster mode is very well battle tested procedure  and
it's something that are very confident will work correctly and definitely
enhance performance inside application.

NOTE: using **worker threads** is way more experimental and it's something
**not recommend approach**.


## What is cluster mode ?

Cluster mode is use to start up multiple copies of node that are all running
your server inside of them.
