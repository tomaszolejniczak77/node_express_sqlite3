
module.exports = {
  development: {
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './data/users.db'
    },
    pool: {
      afterCreate: function(conn, done) {
        conn.run("PRAGMA foreign_keys = ON", done)
      }
    }
  },
  
}



  


