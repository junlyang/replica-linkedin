const express = require("express");
const cors = require("cors");
const next = require("next");

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({dev});
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();
        server.all('/*', function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "X-Requested-With");
            next();
        });
        server.get('*', (req, res) => {
            return handle(req, res)
        });
        server.listen(port, (err) => {
            if (err) throw err;
            console.log(`> Ready on Server Port: ${port}`)
        })
    })
    .catch((ex) => {
        console.error(ex.stack);
        process.exit(1);
    })
