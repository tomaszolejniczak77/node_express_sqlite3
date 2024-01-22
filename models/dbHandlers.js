const knex = require("knex")
const config = require("../knexfile")
const db = knex(config.development)

module.exports = {
    add,
    find,
    findById,
    remove,
    update,
    addItem,
    findItemById,
    findUserItems,
    removeItem,
    updateItem

}

async function add(user) {
   const [id] = await db("users").insert(user)
   return id
}

function find() {
    return db("users")
}

function findById(id) {
    return db("users")
    .where({ id })
    .first()
}

function remove(id) {
    return db("users")
    .where({ id })
    .del()
}

function update(id, changes) {
    return (
        db("users")
        .where({ id })
        .update(changes)
        .then(()=> {
            return findById(id)
        })
    )
}

function findItemById(id) {
    return db("items")
    .where( {id})
    .first()
    }
    
async function addItem(item, item_id) {
    const [id] = await db("items")
    .where({ item_id })
    .insert(item)
    return findItemById(id)
}

function findUserItems(user_id){
 return db("users")
 .join("items", "users.id", "items.item_id")
 .select(
    // "users.id",
    "users.name",
    "items.item_id",
    "items.id",
    "items.sender",
    "items.text"
 )
 .where("items.item_id", user_id)
}

function removeItem(id) {
 return db("items")
 .where({ id })
 .del()
}

function updateItem(id, changes) {
    return (
        db("items")
        .where({ id })
        .update(changes)
        .then(()=> {
            return findItemById(id)
        })
    )
}