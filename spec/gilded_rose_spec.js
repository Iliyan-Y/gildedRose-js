var { Shop } = require('../src/gilded_rose.js');
var { FakeItem } = require('../spec/testHelpers');
describe('Gilded Rose', function () {
  let shop;

  beforeEach(() => {
    shop = new Shop(FakeItem);
  });

  describe('Normal Items', () => {
    beforeEach(() => {
      shop.addItem('+5 Dexterity Vest', 10, 20);
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
  // -----------------------------
  // Edge case !
  // ask the customer if he want's to be sorted
  // it('Check if normal item can be listed with quality more then 50', () => {
  //   let shop = new Shop([new FakeItem('+5 Dexterity Vest', 10, 56)]);
  //   shop.updateQuality();
  //   expect(shop.items[0].sellIn).toEqual(9);
  //   expect(shop.items[0].quality).toEqual(50);
  // });
  // -----------------------------
  describe('Aged Brie', () => {
    beforeEach(() => {
      shop.addItem('aged Brie', 2, 0);
    });

    it('Check if the quality increase when the sellIn decrees and name is capitalized', () => {
      shop.updateQuality();
      expect(shop.items[0].name).toEqual('Aged Brie');
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
    beforeEach(() => {
      shop.addItem('Sulfuras, Hand of Ragnaros', 0, 80);
    });

    it('is unique item, never has to be sold or decreases in Quality ', () => {
      shop.updateQuality();
      expect(shop.items[0].sellIn).toEqual(0);
      expect(shop.items[0].quality).toEqual(80);
    });
  });

  describe('Backstage passes', () => {
    it('like aged brie, increases in Quality as it’s SellIn value approaches', () => {
      shop.addItem('Backstage passes to a TAFKAL80ETC concert', 15, 20);
      shop.updateQuality();
      expect(shop.items[0].sellIn).toEqual(14);
      expect(shop.items[0].quality).toEqual(21);
    });

    it('Quality increases by 2 when there are 10 days or less', () => {
      shop.addItem('Backstage passes to a TAFKAL80ETC concert', 10, 20);
      shop.updateQuality();
      expect(shop.items[0].sellIn).toEqual(9);
      expect(shop.items[0].quality).toEqual(22);
    });

    it('Quality increases by 3 when there are 5 days or less', () => {
      shop.addItem('Backstage passes to a TAFKAL80ETC concert', 5, 48);
      shop.updateQuality();
      expect(shop.items[0].sellIn).toEqual(4);
      expect(shop.items[0].quality).toEqual(50);
    });

    it('Quality drops to 0 after the concert', () => {
      shop.addItem('Backstage passes to a TAFKAL80ETC concert', 0, 20);
      shop.updateQuality();
      expect(shop.items[0].sellIn).toEqual(-1);
      expect(shop.items[0].quality).toEqual(0);
    });
  });

  describe('Conjured items', () => {
    it('Conjured items degrade in Quality twice as fast as normal items', () => {
      shop.addItem('Conjured Mana Cake', 3, 6);
      shop.updateQuality();
      expect(shop.items[0].sellIn).toEqual(2);
      expect(shop.items[0].quality).toEqual(4);
    });
  });
});
