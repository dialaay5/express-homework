const express = require('express')
const router = express.Router()
const path = require('path')
const url = require('url')
const cors = require('cors')
const { response } = require('express')

const port = 8080;
// http://localhost:8080

const app = express()

// to use body parameters
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))


app.use(express.static(path.join('.', '/static/')))
// /static/index.html
// correct.html
// wrong.html

//datetime
app.get('/datetime', (req, resp) => {
    resp.writeHead(201);
    resp.end(`<h1>${new Date().toLocaleString()}</h1>`)
})

//query params example
app.get('/bigger', (req, resp) => {
    // http://localhost:8080/bigger?a=2&b=3

    console.log(req.url);
    console.log(req.query);

    const a = Number(req.query.a)
    const b = Number(req.query.b)

    if (isNaN(a)) {
        resp.writeHead(400)
        resp.end(`${req.query.a} is not a number`)
        return
    }
    if (isNaN(b)) {
        resp.writeHead(400)
        resp.end(`${req.query.b} is not a number`)
        return
    }

    if (a > b) {
        resp.writeHead(201)
        resp.end(`<h1>${a} > ${b}</h1>`)
        return
    }
    else if (b > a) {
        resp.writeHead(201)
        resp.end(`<h1>${b} > ${a}</h1>`)
        return
    }
    else {
        resp.writeHead(201)
        resp.end(`<h1>${b} = ${a}</h1>`)
        return

    }
})

//targil with query parameters
app.get('/targil', (req, resp) => {
        // http://localhost:8080/targil?a=2&b=3&sum=8

    console.log(req.url);
    console.log(req.query);

    const a = Number(req.query.a)
    const b = Number(req.query.b)
    const sum = Number(req.query.sum)

    if (a + b == sum) {
        resp.sendFile(path.join(__dirname, '/static/correct.html'))
        return
    }
    else{
        resp.sendFile(path.join(__dirname, '/static/wrong.html'))
        return
    }
})

// targil with path parameters
app.get('/targil/:a/:b/:sum', (req, resp) => {
    // http://localhost:8080/targil/2/3/8

console.log(req.url);
console.log(req.query);

const a = Number(req.params.a)
const b = Number(req.params.b)
const sum = Number(req.params.sum)

if (a + b == sum) {
    resp.sendFile(path.join(__dirname, '/static/correct.html'))
    return
}
else{
    resp.sendFile(path.join(__dirname, '/static/wrong.html'))
    return
}
})

// targil with body parameters
app.get('/targilbody', (req, resp) => {
    // http://localhost:8080/targil/2/3/8

console.log(req.url);
console.log(req.query);
console.log(req.body);


const a = Number(req.body.a)
const b = Number(req.body.b)
const sum = Number(req.body.sum)

if (a + b == sum) {
    resp.sendFile(path.join(__dirname, '/static/correct.html'))
    return
}
else{
    resp.sendFile(path.join(__dirname, '/static/wrong.html'))
    return
}
})


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
})


