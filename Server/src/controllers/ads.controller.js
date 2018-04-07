const User = require('../models/user')
const Ad = require('../models/ad')
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

        kijiji.query(prefs, searchCriteria, async (err, ads) => {
          if (err) {
            return res.status(400).send(err)
          }
          await ads.forEach(ad => saveNewAd(query, ad))
          res.send('Done populating!')
        })
      })
    })
  }
}

/**
 * Save ad in database if not existent
 */
async function saveNewAd (query, kijijiAd) {
  // Check if ad already exists in database
  const adPublicId = AdsHelper.retrieveIdFromUrl(kijijiAd)
  const adInDatabase = await Ad.findOne({publicId: adPublicId})
  const brandMatches = AdsHelper.checkBrand(kijijiAd, query.brand)
  if (!adInDatabase && brandMatches) {
    // Save new ad in database
    const fields = AdsHelper.formatAdFields(kijijiAd)
    const ad = new Ad(fields)
    await ad.save()
    // Link it to the current query
    query.ads.addToSet(ad)
    await query.save()
  }
  return query
}

module.exports = new AdsController()
