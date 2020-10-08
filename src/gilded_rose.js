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
      let itemQuality = this.items[i].quality;
      if (
        itemName != 'Aged Brie' &&
        itemName != 'Backstage passes to a TAFKAL80ETC concert'
      ) {
        if (itemQuality > 0) {
          if (itemName != 'Sulfuras, Hand of Ragnaros') {
            itemQuality = itemQuality - 1;
          }
        }
      } else {
        if (itemQuality < 50) {
          itemQuality = itemQuality + 1;
          if (itemName == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (itemQuality < 50) {
                itemQuality = itemQuality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (itemQuality < 50) {
                itemQuality = itemQuality + 1;
              }
            }
          }
        }
      }

      if (itemName != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (itemName != 'Aged Brie') {
          if (itemName != 'Backstage passes to a TAFKAL80ETC concert') {
            if (itemQuality > 0) {
              if (itemName != 'Sulfuras, Hand of Ragnaros') {
                itemQuality = itemQuality - 1;
              }
            }
          } else {
            itemQuality = itemQuality - itemQuality;
          }
        } else {
          if (itemQuality < 50) {
            itemQuality = itemQuality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
module.exports = {
  Item,
  Shop,
};
