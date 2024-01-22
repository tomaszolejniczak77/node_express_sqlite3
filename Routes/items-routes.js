const express = require("express")
const Users = require("../models/dbHandlers")

const router = express.Router()

router.delete("/:id", (req, res) => {
    const { id } = req.params
  
    Users.removeItem(id)
    .then(data => {
      if(data > 0) {
      res.status(200).json({ message: `Message with id:${id} successfully deleted`})
      } else {
      res.status(404).json({ message: "Unable to locate record"})
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Unable to delete"})
    })
  
  }) 
  
  router.patch("/:id", (req, res) => {
    const { id } = req.params
    const changes = req.body
   
    Users.updateItem(id, changes)
     .then(user => {
      if (user) {
       res.status(200).json(user)
      } else {
       res.status(404).json({ message: "Item not found"})
      }
     })
     .catch(err => {
     res.status(500).json({ message: "Error updating record"})
     })
   })
  
module.exports = router