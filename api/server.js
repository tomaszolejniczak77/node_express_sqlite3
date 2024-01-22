const express = require("express")

const usersRouter = require("../Routes/users-routes")
const itemsRouter = require("../Routes/items-routes")

const server = express()

server.use(express.json())

server.get('/',  (req, res) => {
    res.json({message: "Server is running"})
  })

server.use("/api/users", usersRouter)
server.use("/api/items", itemsRouter)

module.exports = server
