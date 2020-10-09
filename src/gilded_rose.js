class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      let itemName = this.items[i].name;

      if (
        itemName != 'Aged Brie' &&
        itemName != 'Backstage passes to a TAFKAL80ETC concert'
      ) {
        //decrees  the quality
        if (this.items[i].quality > 0) {
          this.decreesQuality(itemName, i);
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (itemName == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }

      if (itemName != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      //sell by less then ZERO
      if (this.items[i].sellIn < 0) {
        if (itemName != 'Aged Brie') {
          if (itemName != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              this.decreesQuality(itemName, i);
            }
          } else {
            this.items[i].quality = 0;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }

  decreesQuality(itemName, itemNumber) {
    if (itemName == 'Conjured Mana Cake') {
      this.items[itemNumber].quality = this.items[itemNumber].quality - 2;
    } else if (itemName != 'Sulfuras, Hand of Ragnaros') {
      this.items[itemNumber].quality = this.items[itemNumber].quality - 1;
    }
  }
}
module.exports = {
  Item,
  Shop,
};
