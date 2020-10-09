const items = require('../src/items.js');
var { Item } = require('../src/items.js');

describe('Item', () => {
  let item;
  beforeEach(() => {
    item = new Item('test', 1, 2);
  });

  it('create instance of an item with name sellIn and quality', () => {
    expect(item.name).toEqual('test');
    expect(item.sellIn).toEqual(1);
    expect(item.quality).toEqual(2);
  });
});
