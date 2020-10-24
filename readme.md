# Set Up

```
- npm install
- npm test
- node
- require('./spec/texttest_fixture')
```

# The approach

- The first thing I 've done was to start writing tests. I wrote test for each case and checked if the program actually work as described.
- Second I've focused on the main task - add the new item in the shop with required conditions.
- Third I refactured the whole code to be more readable.

# Code structure

- The main class is the Shop with the updateQuality and addItem methods.
- The Item class is responsible for storing all the data related to the product.
- The Shop class is capable to add items in his storage
- The Shop class is updating the data of the items each day, this happen with the updateQuality and three main helper methods:
  - checkForSpecialItem() => calculates the values for the special items
  - updateNormalItem() => calculates the values for the normal items
