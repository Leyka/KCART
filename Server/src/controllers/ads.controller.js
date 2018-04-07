const User = require('../models/user')
const kijiji = require('kijiji-scraper')
const AdsHelper = require('../helpers/ads.helper')

class AdsController {
  /** Scrap kijiji and populate database */
  async populate (req, res) {
    const users = await User.find({}).populate('queries').populate('location')

    users.forEach(user => {
      const { location, queries } = user

      queries.forEach(query => {
        const prefs = {
          categoryId: AdsHelper.CAR_CATEGORY,
          locationId: location.publicId
        }

        const searchCriteria = {
          keywords: AdsHelper.formatQueryToKeywords(query),
          minPrice: query.minPrice,
          maxPrice: query.maxPrice
        }

        kijiji.query(prefs, searchCriteria, (err, ads) => {
          if (err) {
            return res.status(400).send(err)
          }
          ads.forEach(saveAd)
        })
      })
    })
  }
}

/**
 * TODO: Save ad
 * Check if ad url exists in db and (by public Id)
 * If no, map props and save it.
 */
function saveAd (ad) {
  console.log('We will save ad!', ad)
}

module.exports = new AdsController()
