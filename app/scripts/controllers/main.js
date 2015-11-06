'use strict';

/**
 * @ngdoc function
 * @name doseAiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the doseAiApp
 */
angular.module('doseAiApp')
    .controller('MainCtrl', function (brainService, algorithmService) {
        var vm = this;
        vm.result = 0;
        vm.numbers = {first: 0, second: 0};

        vm.age = 0;
        vm.isBlack = 0;
        vm.isSmoker = 0;
        vm.height = 0;
        vm.weight = 0;
        vm.isDvtPe = 0;
        vm.isUsingAmiodarone = 0;


        vm.triggerAI = function() {
            vm.result = brainService.sampleXorAI([vm.numbers.first, vm.numbers.second]);
        };

        vm.calculateAlgorithmDose = function() {
            vm.algorithmDose = algorithmService.calculateInitialDose(vm.age, vm.isBlack, vm.isSmoker, vm.height, vm.weight, vm.isDvtPe, vm.isUsingAmiodarone);
        };

        vm.calculateAIDose = function() {
            vm.aiDose = brainService.calculateInitialDose(vm.age, vm.isBlack, vm.isSmoker, vm.height, vm.weight, vm.isDvtPe, vm.isUsingAmiodarone).dose * 25;
            vm.aiDoseLookup = algorithmService.getActualDose(vm.aiDose);
        };

        vm.trainAIForInitialDose = brainService.trainAIForInitialDose;


    });
