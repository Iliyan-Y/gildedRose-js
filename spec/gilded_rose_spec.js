var { Shop, Item } = require('../src/gilded_rose.js');
var { FakeItem } = require('../spec/testHelpers');
describe('Gilded Rose', function () {
  describe('Normal Items', () => {
    let shop;
    beforeEach(() => {
      shop = new Shop([new FakeItem('+5 Dexterity Vest', 10, 20)]);
    });

    it('Check if the quality and sellIn properties work', () => {
      shop.updateQuality();
      expect(shop.items[0].sellIn).toEqual(9);
      expect(shop.items[0].quality).toEqual(19);
    });
  });
});
