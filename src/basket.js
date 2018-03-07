module.exports.default = class Basket {
  constructor(pricingRules) {
    // pricingRules is an array of reducers that
    // are exectued in order starting with the items that
    // were added to the basket.
    // each reducer returns a new list of items that is passed to the next
    this.pricingRules = pricingRules
    this.items = []
  }

  add(item) {
    this.items.push(item)
  }

  calculatePrice(acc, item) {
    return acc + item.price
  }

  total() {
    return this.pricingRules
      ? this.pricingRules.reduce((acc, reducer) =>
        reducer(acc)
      , this.items).reduce(this.calculatePrice, 0)
      : this.items.reduce(this.calculatePrice, 0)
  }
}
