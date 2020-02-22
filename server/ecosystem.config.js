//process.env variables are passed from docker-compose
const DB_HOST = process.env.DB_HOST || 'postgresql'
const DB_NAME = process.env.DB_NAME || 'reviews'
const DB_PORT = process.env.DB_PORT || 5400 
const DB_USER = process.env.DB_USER || 'docker'
const DB_PASSWORD = process.env.DB_PASSWORD || 'docker'

module.exports = [{
  script: 'app.js',
  args: '--port 3333',
  name: 'app',
  exec_mode: 'cluster',
  instances: 2,
  env: {
    DB_HOST,
    DB_NAME,
    DB_PORT,
    DB_USER,
    DB_PASSWORD
  }
}]