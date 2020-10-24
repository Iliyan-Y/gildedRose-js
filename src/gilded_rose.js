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
    this.items = this.items.map((item) => {
      let name = item.name.replace(',', '').split(' ')[0];
      let updateItem = this._checkForSpecialItem()[name];
      updateItem ? updateItem(item) : this._updateNormalItem(item);
      this._validateMinQuality(item, name);
      this._validateMaxQuality(item, name);
      return item;
    });
  }

  _checkForSpecialItem() {
    return {
      Conjured: (item) => {
        item.quality -= 2;
        item.sellIn -= 1;
      },
      Aged: (item) => {
        item.quality++;
        item.sellIn -= 1;
      },
      Backstage: (item) => {
        item.sellIn -= 1;
        item.quality++;
        this._backStageCaseCheck(item);
      },
      Sulfuras: (item) => {},
    };
  }

  _updateNormalItem(item) {
    item.sellIn -= 1;
    item.sellIn < 0 ? (item.quality -= 2) : item.quality--;
  }

  _backStageCaseCheck(item) {
    if (item.sellIn < 11) item.quality++;
    if (item.sellIn < 6) item.quality += 2;
    if (item.sellIn < 0) item.quality = this.MINVALUE;
  }

  _validateMinQuality(item, name) {
    if (item.quality < this.MINVALUE && name != 'Sulfuras') {
      item.quality = this.MINVALUE;
    }
  }
  _validateMaxQuality(item, name) {
    if (item.quality > this.MAXVALUE && name != 'Sulfuras') {
      item.quality = this.MAXVALUE;
    }
  }
}
module.exports = {
  Item,
  Shop,
};
