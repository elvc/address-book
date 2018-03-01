const assert = require('assert');
const {
  mockData,
  getContacts,
  getContactById,
  getAllContacts,
} = require('./server');

describe('Server functions test', function() {
  describe('getAllContacts()', function() {
    it('should return all contacts', function() {
      assert.equal(getAllContacts(), mockData);
    });
  });
  describe('getContactById (id = 1)', function() {
    it('should return first contact in mockData', function() {
      assert.equal(getContactById({ contactId: 1 }), mockData[0]);
    });
  });
  describe('getContacts (first name = "Steven")', function() {
    it('should return the 3rd contact in mockData', function() {
      // the first element of the result should match
      assert.equal(getContacts({ firstName: 'Steven' })[0], mockData[3]);
    });
  });
  describe('getAllContacts()', function() {
    it('should return all contacts', function() {
      assert.equal(getAllContacts(), mockData);
    });
  });
});
