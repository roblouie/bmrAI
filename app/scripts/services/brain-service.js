'use strict';

/**
 * @ngdoc service
 * @name bmrAiApp.brainService
 * @description
 * # brainService
 * Service in the bmrAiApp.
 */
angular.module('bmrAiApp')
    .service('brainService', function (algorithmService) {
        var bmrAI = new brain.NeuralNetwork({
            hiddenLayers: [2, 4, 7]
        });

        return {
            trainAIForBmr: trainAIForBmr,
            calculateBmr: calculateBmr
        };

        function calculateBmr(weight, height, age, isMale) {
            return bmrAI.run({
                age: transformAgeToFraction(age),
                height: transformHeightToFraction(height),
                weight: transformWeightToFraction(weight),
                isMale: isMale
            }).bmr;
        }

        function trainAIForBmr() {
            var options = {
                errorThresh: 0.00001,  // error threshold to reach
                iterations: 20000,   // maximum training iterations
                log: true,           // console.log() progress periodically
                logPeriod: 50,       // number of iterations between logging
                learningRate: 0.3    // learning rate
            };

            var data = buildTestData();

            bmrAI.train(data, options);
        }

        function buildTestData() {
            var personDataList = [];

            for (var i = 0; i < 20000; i ++) {
                var age = getRandomNumberAndBetweenOneAndZero(18, 75);
                var height = getRandomNumberAndBetweenOneAndZero(120, 215);
                var weight = getRandomNumberAndBetweenOneAndZero(45, 135);
                var isMale = getZeroOrOne();

                personDataList.push({
                    input: {
                        age: age.betweenZeroAndOne,
                        height: height.betweenZeroAndOne,
                        weight: weight.betweenZeroAndOne,
                        isMale: isMale
                    },
                    output: {bmr: (algorithmService.calculateBasalMetabolicRate(weight.originalNumber, height.originalNumber, age.originalNumber, isMale) / 2324)}
                });
            }

            return personDataList;
        }

        function transformHeightToFraction(height) {
            return +(height / 215).toFixed(2);
        }

        function transformWeightToFraction(weight) {
            return +(weight / 135).toFixed(2);
        }

        function transformAgeToFraction(age) {
            return +(age / 75).toFixed(2);
        }

        function getRandomNumberAndBetweenOneAndZero(min, max) {
            var randomInt = getRandomInt(min, max);

            return {originalNumber: randomInt, betweenZeroAndOne: +(randomInt / max).toFixed(2)};
        }

        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function getZeroOrOne() {
            return Math.round(getRandomInt(0, 1));
        }

    });
