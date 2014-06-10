var request = require('supertest');  
 
describe('Routing', function() {
  var url = 'http://localhost:3000';

  before(function(done) {
    // todo: mock backend requests with nock
    done();
  });

  it('API root should return status code 200', function(done) {
    request(url)
      .get('/api')
      .expect('Content-Type', /json/)
      .expect(200, done)
    });
});