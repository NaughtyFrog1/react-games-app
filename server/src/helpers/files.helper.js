const fs = require('fs')
const path = require('path')

function fileExists(dir) {
  return fs.existsSync(dir)
}

function createJsonFile(dir, initialData) {
  if (!fs.existsSync(dir)) {
    if (!fs.existsSync(path.dirname(dir))) {
      fs.mkdirSync(path.dirname(dir), { recursive: true })
    }
    fs.appendFileSync(dir, JSON.stringify(initialData), 'utf-8')
    return true
  }
  return false
}

function readJsonFile(dir) {
  return JSON.parse(fs.readFileSync(dir))
}

function writeJsonFile(dir, data) {
  fs.writeFileSync(dir, JSON.stringify(data))
}

module.exports = { fileExists, createJsonFile, readJsonFile, writeJsonFile }
