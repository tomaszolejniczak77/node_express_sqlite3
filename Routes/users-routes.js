const express = require("express")
const Users = require("../models/dbHandlers")

const router = express.Router()

router.post("/", (req, res)=> {
    Users.add(req.body)
    .then( user => {
    res.status(200).json(user)})
    .catch(err => {
    res.status(500).json({message: "cannot add user"})
    })
  })
  
  router.get("/", (req, res) => {
    Users.find()
    .then(users => {
    res.status(200).json(users)})
    .catch(err => {
      res.status(500).json({message: "Unnable to retrive user"})
      })
  })
  
  router.get("/:id", (req, res)=> {
    const { id } = req.params
  
    Users.findById(id)
    .then(user=> {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ Message: "Record not found"})
      }
    })
    .catch(err =>{
      res.status(500).json({ message: "Unable to find"})
    })
  })
  
  router.delete("/:id", (req, res) => {
    const { id } = req.params
  
    Users.remove(id)
    .then(count => {
      if(count > 0) {
      res.status(200).json({ message: "Successfully deleted"})
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
  
   Users.update(id, changes)
    .then(user => {
     if (user) {
      res.status(200).json(user)
     } else {
      res.status(404).json({ message: "Record not found"})
     }
    })
    .catch(err => {
    res.status(500).json({ message: "Error updating record"})
    })
  })
  
  router.post("/:id/items", (req, res) => {
    const { id } = req.params
    const item = req.body
  
    if (!item.item_id) {
      item["item_id"] = parseInt(id, 10)
    }
  
    Users.findById(id)
    .then(data => {
      if(!data) {
        res.status(404).json({ message: "Invalid id"})
      } else if (item.sender && item.text) {
        Users.addItem(item, id)
        .then(data => {
        res.status(200).json(data)
        })
        .catch(err => {
          res.status(500).json({ message: "Failed to add message"})
        })
      } else {
        res.status(400).json({ message: 'Must provide both Sender and Text values'})
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Error finding item"})
    })
  
  })
  
  router.get("/:id/items", (req, res) => {
    const { id } = req.params
  
    Users.findUserItems(id)
     .then(data => {
      res.status(200).json(data)
     })
     .catch(err => {
     res.status(500).json({ message: "Error retriving items" })
     })
   })
  
  module.exports = router