# Starting With NodeJS

![chapter-1-1.png](images/chapter-1-1.png "Inside NodeJS")

## What is behind NodeJS ?

NodeJS internally has a collection of dependencies that is uses to execute the
code.

Behind NodeJS is `V8`-engine & `libuv`

## What is V8  ?

The `V8` project is an open source **JavaScript engine** created by Google that
written in C++ and JavaScript code. The purpose of `` is to be able to execute
JavaScript code outside of the browser.

## What is libuv ?

The `libuv` project here is a C++ open source project that gives NodeJS access
to the operating system underlying file system, it gives NodeJS users access to
**networking** and it also handles some aspects of **concurrency** as well.

`libuv` give access to developer to the file system, networking, etc..

## What is Concurrency (computer science) ?

In computer science concurrency is the **ability** of different parts or unit of
program, algorithm or problem to be executed out-of-order on in partial order,
without affecting the final outcome.

This allow for parallel execution of the concurrent (yang berbarengan) units,
which can significantly improve overall speed of the execution in
multi-processor and multi-core system.

In more technical terms, concurrency refers to the decomposability(menguraikan)
property of programs, algorithm, or problem into order-independent or
partially-ordered (secara sebagian-sebagian) components or units.

## What is purpose of NodeJS ? Why we not use directly  or libuv ?

NodeJS is actually written with half (50%) C++ and half more JavaScript. The
`V8`-engine project written 70% in C++ and 30% in JavaScript, and `libuv` project
written 100% in C++ code.

So chances are that as JavaScript developer do not want to be writing C++ code.

NodeJS give a nice interface (a point where two system) **to use**, **to
relate** (show a connection between) JavaScript side of application to the
actual C++ that running on computer, to actually interpret (make clear)
JavaScript and execute the code.

NodeJS provide a series (number of things) of wrappers (cover) and a very
unified (make or become united, uniform) inconsistent API for us to use inside
of our project. (MEANS: NodeJS enhance all inconsistent API into very
consistent).

![chapter-1-2.png](images/chapter-1-2.png "NodeJS implement 'libuv' code")

**e.g**: NodeJS implements the `http`, `fs`, `path`, `crypto` modules.

**NOTE**: All the NodeJS modules have very consistent API.

NodeJS modules ultimately refer to a functionality that is mostly implemented
inside of the `libuv` project. So as JavaScript developer, the developer just
want to require in C++ functionality into JavaScript as a functions inside
codebase.

So by using of NodeJS you don't have to work with all the C++ that exists
iniside of `libuv` it self.

After long explanation, *__the purpose of NodeJS__* is to give developer a nice
consistent API for getting access to functionality that is ultimately
implemented inside a `V8` and `libuv`.


# Module implementation

![chapter-1-3.png](images/chapter-1-3.png "Implement Module")

![chapter-1-4.png](images/chapter-1-4.png "Implement pbkdf2 function")

[`pbkdf2`](https://nodejs.org/dist/latest-v12.x/docs/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_digest_callback)
is the name of algorithm that is used for hashing some arbitrary data for
storage inside of database.

## How to understand what inside the 'lib' folder in 'nodejs/node/lib' ?

The `lib` folder in `github/nodejs/node/lib` is the JavaScript definitions of
functions and modules.

## How to understand what inside the 'src' folder in 'nodejs/node/src' ?

![chapter-1-5.png](images/chapter-1-5.png "Defined pbkdf2 function")

The `src` folder in `github/nodejs/node/src` is the C++ implementation of all
those functions in `lib` folder.

The `src` folder is where NodeJS actually pulls in `libuv` and `V8` project and
flushes out the implementation of all the models are used.

