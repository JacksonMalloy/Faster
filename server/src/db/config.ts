// const fs = require('fs')
// const path = require('path')
import * as pg from 'pg'

// Use SSL when connecting to a Digital Ocean managed database
// Certificate downloaded via the Digital Ocean control panel
// const ca = fs.readFileSync(path.join(__dirname, '/ca-certificate.crt'), 'utf8').toString()

const config = {
  db: {
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
    port: process.env.POSTGRES_PORT,
    ssl: false
  },
}

const { Pool } = pg

const db = new Pool(config.db as any)

export default db