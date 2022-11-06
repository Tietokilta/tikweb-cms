// npm run config-dump creates duplicates in the strapiCongig.json file
// That is probably not intended, so running this script with "npm run removeDuplicates" removes them

const fs = require('fs')

const allConfigItems = JSON.parse(
  fs.readFileSync('./strapiConfig.json', 'utf8')
)
const withOutDuplicates = []
allConfigItems.forEach((itemToAdd) => {
  if (
    !withOutDuplicates.find(
      (itemAlreadyAdded) =>
        JSON.stringify(itemToAdd) === JSON.stringify(itemAlreadyAdded)
    )
  ) {
    withOutDuplicates.push(itemToAdd)
  }
})
fs.writeFileSync('./strapiConfig.json', JSON.stringify(withOutDuplicates))

// eslint-disable-next-line no-console
console.log(
  `Removed ${
    allConfigItems.length - withOutDuplicates.length
  } duplicates from strapiConfig.json`
)
