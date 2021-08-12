const path = require('path')
const fs = require('fs')

module.exports = {
  getPlaces
}

function getPlaces (cb) {
  const filePath = path.join(__dirname, 'data.json')
  fs.readFile(filePath, 'utf8', (err, contents) => {
    if (err) {
      cb(new Error('Unable to load file'))
      return
    }
    try {
      const parsedData = JSON.parse(contents)
      cb(null, parsedData)
    } catch (parseError) {
      cb(new Error('Unable to parse data'))
    }
  })
}
