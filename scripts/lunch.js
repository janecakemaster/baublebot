var prettyDataSet = new Set(require('../lunch/pretty-data.json'))
var dataSet = new Set(require('../lunch/data.json'))

function getPlaces(set) {
  return Array.from(set)
}

function saveData() {
  fs.writeFile('../lunch/dataArray.json', JSON.stringify(getPlaces(dataSet)))
}

function addPlace(place) {
  var key = place.trim().toLowerCase();
  if(dataSet.contains(place))
  dataSet.add(place)
  return false
}

module.exports = function(bot) {
  bot.hear(/what.*lunch/i, function(res) {
    return res.reply(res.random(getPlaces(dataSet)))
  })

  bot.respond(/bot add (.*) to lunch places/i, function(res) {
    var place = res.match[1];

    if (addPlace(place)) {
      return res.reply("I'll add " + place + " to the lunch places")
    } else {
      return res.reply(place + " is already an place")
    }
  })
}
