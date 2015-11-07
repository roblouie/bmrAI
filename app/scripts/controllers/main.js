'use strict';

/**
 * @ngdoc function
 * @name bmrAiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the bmrAiApp
 */
angular.module('bmrAiApp')
    .controller('MainCtrl', function (brainService, algorithmService) {
        var vm = this;
        vm.result = 0;

        vm.age = 0;
        vm.isMale = 0;
        vm.height = 0;
        vm.weight = 0;

        vm.calculateAlgorithmBmr = function() {
            vm.algorithmBmr = algorithmService.calculateBasalMetabolicRate(vm.weight, vm.height, vm.age, vm.isMale);
        };

        vm.calculateAIBmr = function() {
            vm.aiBmr = brainService.calculateBmr(vm.weight, vm.height, vm.age, vm.isMale) * 2324;
        };

        vm.trainAIForBmr = brainService.trainAIForBmr;

    });
