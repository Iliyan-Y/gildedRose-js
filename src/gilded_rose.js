const { Item } = require('../src/items');

class Shop {
  constructor(item = Item) {
    this.items = [];
    this.item = item;
    this.MAXVALUE = 50;
    this.MINVALUE = 0;
  }

  addItem(name, sellIn, quality) {
    name = name.charAt(0).toUpperCase() + name.slice(1);
    this.items.push(new this.item(name, sellIn, quality));
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let itemName = this.items[i].name.replace(',', '').split(' ')[0];
      let currentItem = this.items[i];

      this._countDawn(itemName, currentItem);
      this._sellIn(itemName, currentItem);
      this._sellAfterExpireTime(itemName, currentItem);
    }

    return this.items;
  }

  //------- Helpers -------
  _sellIn(itemName, currentItem) {
    if (
      itemName != 'Aged' &&
      itemName != 'Backstage' &&
      currentItem.quality > this.MINVALUE
    ) {
      this._decreesQuality(itemName, currentItem);
    } else if (currentItem.quality < this.MAXVALUE) {
      currentItem.quality += 1;
      this._backStagePriceRate(itemName, currentItem);
    }
  }

  _sellAfterExpireTime(itemName, currentItem) {
    if (currentItem.sellIn < this.MINVALUE) {
      if (itemName != 'Aged') {
        this._backStageCheck(itemName, currentItem);
      } else if (currentItem.quality < this.MAXVALUE) {
        currentItem.quality += 1;
      }
    }
  }

  _countDawn(itemName, currentItem) {
    if (itemName != 'Sulfuras') {
      currentItem.sellIn -= 1;
    }
  }

  _backStageCheck(itemName, currentItem) {
    if (itemName != 'Backstage' && currentItem.quality > this.MINVALUE) {
      this._decreesQuality(itemName, currentItem);
    } else {
      //drops the quality of the backstage pass to 0 after the concert
      currentItem.quality = this.MINVALUE;
    }
  }

  _backStagePriceRate(itemName, currentItem) {
    if (itemName == 'Backstage' && currentItem.sellIn < 11) {
      currentItem.quality += 1;
    }

    if (itemName == 'Backstage' && currentItem.sellIn < 6) {
      currentItem.quality += 1;
    }
  }

  _decreesQuality(itemName, currentItem) {
    if (itemName == 'Conjured') {
      currentItem.quality -= 2;
    } else if (itemName != 'Sulfuras') {
      currentItem.quality -= 1;
    }
  }
}
module.exports = {
  Item,
  Shop,
};
