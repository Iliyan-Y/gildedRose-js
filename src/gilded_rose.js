const { Item } = require('../src/items');

class Shop {
  constructor(item = Item) {
    this.items = [];
    this.item = item;
    this.MAXVALUE = 50;
    this.MINVALUE = 0;
  }

  addItem(name, sellIn, quality) {
    name = this._capitalized(name);
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

  _capitalized(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
    let tenDaysToConcert = 10;
    let fiveDaysToConcert = 5;
    let expiredTicket = 0;
    if (item.sellIn <= tenDaysToConcert) item.quality++;
    if (item.sellIn <= fiveDaysToConcert) item.quality += 2;
    if (item.sellIn < expiredTicket) item.quality = this.MINVALUE;
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
