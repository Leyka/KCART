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
  retrieveIdFromUrl (url) {
    return url.split('/').slice(-1)[0]
  }
}
