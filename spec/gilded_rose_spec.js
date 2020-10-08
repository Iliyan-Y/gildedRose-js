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

    it('Check if the quality and sellIn properties work after they hit 0', () => {
      for (let i = 0; i < 21; i++) {
        shop.updateQuality();
      }
      expect(shop.items[0].sellIn).toEqual(-11);
      expect(shop.items[0].quality).toEqual(0);
    });

    it('Check if Once the sell by date has passed, Quality degrades twice as fast', () => {
      for (let i = 0; i < 11; i++) {
        shop.updateQuality();
      }
      expect(shop.items[0].sellIn).toEqual(-1);
      expect(shop.items[0].quality).toEqual(8);
    });
  });

  describe('“Aged Brie', () => {
    let shop;
    beforeEach(() => {
      shop = new Shop([new FakeItem('Aged Brie', 2, 0)]);
    });

    it('Check if the quality increase when the sellIn decrees', () => {
      shop.updateQuality();
      expect(shop.items[0].sellIn).toEqual(1);
      expect(shop.items[0].quality).toEqual(1);
    });

    it('Check if the quality of an item is never more then 50', () => {
      for (let i = 0; i < 52; i++) {
        shop.updateQuality();
      }
      expect(shop.items[0].sellIn).toEqual(-50);
      expect(shop.items[0].quality).toEqual(50);
    });
  });

  describe('Sulfuras Items', () => {
    let shop;
    beforeEach(() => {
      shop = new Shop([new FakeItem('Sulfuras, Hand of Ragnaros', 0, 80)]);
    });

    it('is unique item, never has to be sold or decreases in Quality ', () => {
      shop.updateQuality();
      expect(shop.items[0].sellIn).toEqual(0);
      expect(shop.items[0].quality).toEqual(80);
    });
  });

  describe('Backstage passes', () => {
    it('like aged brie, increases in Quality as it’s SellIn value approaches', () => {
      let shop = new Shop([
        new FakeItem('Backstage passes to a TAFKAL80ETC concert', 15, 20),
      ]);
      shop.updateQuality();
      expect(shop.items[0].sellIn).toEqual(14);
      expect(shop.items[0].quality).toEqual(21);
    });
  });
});
