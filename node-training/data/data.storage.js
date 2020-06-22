const data = require('./data.json');

class DataStorage {
    getData() {
      return this.data;
    }
}

module.exports = DataStorage;
