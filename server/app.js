const argv = require('yargs').argv
const express = require('express')
const cors = require('cors')
const PORT = argv.port || 3333
const routes = require('./routes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

app.listen(PORT, () => {
  console.log(`App is listening on port: ${PORT}`)
})