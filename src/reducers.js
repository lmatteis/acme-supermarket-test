const { isOdd } = require('./utils')

module.exports = {
  buyOneGetOneFree(productCode) {
    return (items) => {
      // remove the even FR1 from items, to implement buy 1 get 1 free.
      // first find all even FR1 items
      const allEven = items.filter(item => item.productCode === productCode)
        .filter((item, idx) => !isOdd(idx))

      // then remove all FR1 from items
      const withoutProductCode = items.filter(item => item.productCode !== productCode)

      // concat them together
      return allEven.concat(withoutProductCode)
    }
  },
  changePriceWhenMoreThan(productCode, newPrice, moreThan) {
    return (items) => {
      const filteredItems = items.filter(item => item.productCode === productCode)
      if (filteredItems.length >= moreThan) {
        // remove these items
        items = items.filter(item => item.productCode !== productCode)

        // now add them again, with price changed
        const newPriceChangedItems = filteredItems.map(item =>
          ({
            ...item,
            price: newPrice
          })
        )

        // add the priced changed items back to items
        items = items.concat(newPriceChangedItems)
      }
      return items
    }
  }
}
