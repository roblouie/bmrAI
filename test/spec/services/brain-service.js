'use strict';

describe('Service: brainService', function () {

  // load the service's module
  beforeEach(module('doseAiApp'));

  // instantiate service
  var brainService;
  beforeEach(inject(function (_brainService_) {
    brainService = _brainService_;
  }));

  it('should do something', function () {
    expect(!!brainService).toBe(true);
  });

});
