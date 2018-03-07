const Basket = require('../src/basket').default
const {
  buyOneGetOneFree,
  changePriceWhenMoreThan
} = require('../src/reducers')

const products = require('./products')

describe('Basket', () => {
  var pricingRules = []

  beforeEach(() => {
    pricingRules = []
  })

  describe('with no pricingRules', () => {
    it('should add 1 FR1 and 3 SR1', () => {
      const basket = new Basket()
      basket.add(products.FR1)
      basket.add(products.SR1)
      basket.add(products.SR1)
      basket.add(products.SR1)
      const price = basket.total()
      expect(price).toEqual(18.11)
    })
  })

  describe('with pricingRules = buy-1-get-1-free for FR1', () => {
    describe('with pricingRules = 3 or more SR1, price should be 4.50', () => {
      beforeEach(() => {
        pricingRules = [
          buyOneGetOneFree('FR1'),
          changePriceWhenMoreThan('SR1', 4.50, 3)
        ]
      })

      it('should add 2 FR1 and 3 SR1', () => {
        const basket = new Basket(pricingRules)
        basket.add(products.FR1)
        basket.add(products.FR1)
        basket.add(products.SR1)
        basket.add(products.SR1)
        basket.add(products.SR1)
        const price = basket.total()

        expect(price).toEqual(16.61)
      })

      it('should apply buyOneGetOneFree to FR1', () => {
        const basket = new Basket(pricingRules)
        basket.add(products.FR1)
        basket.add(products.SR1)
        basket.add(products.FR1)
        basket.add(products.CF1)
        const price = basket.total()

        expect(price).toEqual(19.34)
      })

      it('should add 2 FR1', () => {
        const basket = new Basket(pricingRules)
        basket.add(products.FR1)
        basket.add(products.FR1)
        const price = basket.total()

        expect(price).toEqual(3.11)
      })

      it('should add 3 Strawberries', () => {
        const basket = new Basket(pricingRules)
        basket.add(products.SR1)
        basket.add(products.SR1)
        basket.add(products.FR1)
        basket.add(products.SR1)
        const price = basket.total()

        expect(price).toEqual(16.61)
      })
    })
  })
})
