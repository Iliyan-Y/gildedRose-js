const { Item } = require('../src/items');

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let itemName = this.items[i].name;
      let currentItem = this.items[i];

      if (itemName != 'Sulfuras, Hand of Ragnaros') {
        currentItem.sellIn = currentItem.sellIn - 1;
      }

      this._sellIn(itemName, currentItem);

      this._sellAfterExpireTime(itemName, currentItem);
    }

    return this.items;
  }

  _sellIn(itemName, currentItem) {
    if (
      itemName != 'Aged Brie' &&
      itemName != 'Backstage passes to a TAFKAL80ETC concert' &&
      currentItem.quality > 0
    ) {
      this._decreesQuality(itemName, currentItem);
    } else {
      if (currentItem.quality < 50) {
        currentItem.quality = currentItem.quality + 1;
        this._backStagePriceRate(itemName, currentItem);
      }
    }
  }

  _sellAfterExpireTime(itemName, currentItem) {
    if (currentItem.sellIn < 0) {
      if (itemName != 'Aged Brie') {
        this._backStageCheck(itemName, currentItem);
      } else {
        if (currentItem.quality < 50) {
          currentItem.quality = currentItem.quality + 1;
        }
      }
    }
  }

  _backStageCheck(itemName, currentItem) {
    if (
      itemName != 'Backstage passes to a TAFKAL80ETC concert' &&
      currentItem.quality > 0
    ) {
      this._decreesQuality(itemName, currentItem);
    } else {
      //drops the quality of the backstage pass to 0 after the concert
      currentItem.quality = 0;
    }
  }

  _backStagePriceRate(itemName, currentItem) {
    if (itemName == 'Backstage passes to a TAFKAL80ETC concert') {
      if (currentItem.sellIn < 11) {
        if (currentItem.quality < 50) {
          currentItem.quality = currentItem.quality + 1;
        }
      }
      if (currentItem.sellIn < 6) {
        if (currentItem.quality < 50) {
          currentItem.quality = currentItem.quality + 1;
        }
      }
    }
  }

  _decreesQuality(itemName, currentItem) {
    if (itemName == 'Conjured Mana Cake') {
      currentItem.quality = currentItem.quality - 2;
    } else if (itemName != 'Sulfuras, Hand of Ragnaros') {
      currentItem.quality = currentItem.quality - 1;
    }
  }
}
module.exports = {
  Item,
  Shop,
};
