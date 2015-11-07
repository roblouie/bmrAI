'use strict';

describe('Service: algorithmService', function () {

  // load the service's module
  beforeEach(module('bmrAiApp'));

  // instantiate service
  var algorithmService;
  beforeEach(inject(function (_algorithmService_) {
    algorithmService = _algorithmService_;
  }));

  it('should do something', function () {
    expect(!!algorithmService).toBe(true);
  });

});
