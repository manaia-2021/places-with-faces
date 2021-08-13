const path = require('path')
const fs = require('fs')

module.exports = {
  getPlaces,
  addPlace
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

function addPlace (newPlace, cb) {
  getPlaces((err, placeData) => {
    if (err) {
      cb(new Error('Error loading original place file'))
      return
    }

    const newId = placeData.places[placeData.places.length - 1].id + 1
    placeData.places.push({ id: newId, ...newPlace })

    try {
      const placeString = JSON.stringify(placeData, null, 2)
      const filePath = path.join(__dirname, 'data.json')
      fs.writeFile(filePath, placeString, 'utf8', (err) => {
        if (err) {
          cb(new Error('problem writing to file'))
          return
        }
        cb(null, newId)
      })
    } catch (stringifyError) {
      cb(new Error('problem converting to JSON string'))
    }
  })
}
