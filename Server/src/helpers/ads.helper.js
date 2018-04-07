module.exports = {
  CAR_CATEGORY: 27,
  /**
   * Format brand and description of a car to make it compatible with kijij-scraper
   * @param {Query} query
   */
  formatQueryToKeywords (query) {
    if (!query) return ''

    const formattedDescription = query.description.replace(/\s/, '+')
    return query.brand + '+' + formattedDescription
  },
  /** Retrieve ad Kijiji Id from URL */
  retrieveIdFromUrl (kijijiAd) {
    const link = kijijiAd.link
    return link.split('/').slice(-1)[0]
  },
  /** Return formatted Ad object from Kijiji-scrapper to my own Ad field */
  formatAdFields (kijijiAd) {
    if (!kijijiAd) throw new Error('No Kijiji Ad provided')
    const innerAd = kijijiAd.innerAd
    const infos = innerAd.info
    return {
      publicId: this.retrieveIdFromUrl(kijijiAd),
      link: kijijiAd.link,
      title: kijijiAd.title,
      description: innerAd.desc,
      price: kijijiAd['g-core:price'],
      date: infos['Date Listed'],
      address: infos['Address'],
      sellerType: infos['For Sale By'],
      brand: infos['Make'],
      model: infos['Model'],
      edition: infos['Trim'],
      year: infos['Year'],
      drivetrain: infos['Drivetrain'],
      kilometers: infos['Kilometers'],
      images: innerAd.images
    }
  },
  /**
   * Check if user preference brand is in the ad (brand or included in ad title)
   * @param {*} kijijiAd
   * @param {String} userPrefBrand
   */
  checkBrand (kijijiAd, userPrefBrand) {
    const userBrand = userPrefBrand.toLowerCase()
    const adBrand = kijijiAd.innerAd.info['Make']
    if (adBrand) {
      if (userBrand === adBrand.toLowerCase()) return true
    } else if (kijijiAd.title) {
      // The brand is not set or maybe 'other'
      // we can check if the title contains the brand
      const adTitle = kijijiAd.title.toLowerCase()
      return adTitle.includes(userBrand)
    }
    // At this point kijijiAd is invalid
    return false
  }
}
