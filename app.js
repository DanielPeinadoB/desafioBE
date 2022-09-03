const express = require("express");
const db = require("./db.js");
const DB = new db('productos.txt');

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Daniel Peinado")
})

app.get("/productos", async (req, res) => {
    const data = await DB.getAll();

    return res.send(data)
})

app.get("/productoRandom", async (req, res) => {

    const data = await DB.getAll();
    const idRandom = Math.floor(Math.random() * data.length + 1)
    const productoRandom = await DB.getById(idRandom)

    console.log(productoRandom.id)
    return res.send(productoRandom)
})

module.exports = { app }

const server = app.listen(8080, () => {
    console.log("Servidor de express iniciado")
})

server.on('error', error => console.log(`Error en servidor ${error}`))