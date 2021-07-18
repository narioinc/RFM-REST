const sqlite3 = require("sqlite3");
const sqlite = require("sqlite");
const fs = require("fs").promises;

async function provideDatabase() {
  const databaseExists = await fs
    .access("./data/database.db")
    .catch(() => false);

  const db = await sqlite.open({
    filename: "./data/database.db",
    driver: sqlite3.Database
  });

  if (databaseExists === false) {
   await db.exec(
      "CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT, salt TEXT)"
    );
  }

  return db;
}

module.exports = provideDatabase;