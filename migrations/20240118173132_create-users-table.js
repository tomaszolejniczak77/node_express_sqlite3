exports.up = function(knex) {
  return knex.schema.createTable('users', table => {
    table.increments();
    table.text("name", 128).notNullable()
    table.timestamps(true,true);
  })
  .createTable("items", table => {
    table.increments();
    table.text("sender")
    .notNullable()
    .index();
    table.text("text")
    .notNullable()
    table.timestamps(true, true)

    table
    .integer("item_id")
    .unsigned()
    .notNullable()
    .references("id")
    .inTable("users")
    .onDelete("CASCADE")
    .onUpdate("CASCADE");
  })  
};


exports.down = function(knex) {
   return knex.schema.dropTableIfExists('users').dropTableIfExists("items")
};
