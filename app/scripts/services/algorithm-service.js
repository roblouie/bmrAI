'use strict';

angular.module('doseAiApp')
  .service('algorithmService', function () {
        var FACTOR_INITIAL_BASE = 0.613;
        var FACTOR_INITIAL_AGE = 0.0075;
        var FACTOR_INITIAL_BLACK_RACE = 0.156;
        var FACTOR_INITIAL_SMOKER = 0.108;
        var FACTOR_INITIAL_BODY_SURFACE_AREA = 0.425;
        var FACTOR_INITIAL_AMIODARONE = 0.257;
        var FACTOR_INITIAL_TARGET_INR = 0.216;
        var FACTOR_INITIAL_DVT_PE = 0.0784;

        var doses = [
            {actualDose: 0.00, min: 0.00, max: 0.24},
            {actualDose: 0.50, min: 0.25, max: 0.74},
            {actualDose: 1.00, min: 0.75, max: 1.12},
            {actualDose: 1.25, min: 1.13, max: 1.37},
            {actualDose: 1.50, min: 1.38, max: 1.62},
            {actualDose: 1.75, min: 1.63, max: 1.87},
            {actualDose: 2.00, min: 1.88, max: 2.12},
            {actualDose: 2.25, min: 2.13, max: 2.37},
            {actualDose: 2.50, min: 2.38, max: 2.62},
            {actualDose: 2.75, min: 2.63, max: 2.87},
            {actualDose: 3.00, min: 2.88, max: 3.12},
            {actualDose: 3.25, min: 3.13, max: 3.37},
            {actualDose: 3.50, min: 3.38, max: 3.62},
            {actualDose: 3.75, min: 3.63, max: 3.87},
            {actualDose: 4.00, min: 3.88, max: 4.12},
            {actualDose: 4.25, min: 4.13, max: 4.37},
            {actualDose: 4.50, min: 4.38, max: 4.62},
            {actualDose: 4.75, min: 4.63, max: 4.87},
            {actualDose: 5.00, min: 4.88, max: 5.12},
            {actualDose: 5.25, min: 5.13, max: 5.37},
            {actualDose: 5.50, min: 5.38, max: 5.62},
            {actualDose: 5.75, min: 5.63, max: 5.87},
            {actualDose: 6.00, min: 5.88, max: 6.12},
            {actualDose: 6.25, min: 6.13, max: 6.87},
            {actualDose: 7.50, min: 6.88, max: 8.74},
            {actualDose: 10.00, min: 8.75, max: 11.24},
            {actualDose: 12.50, min: 11.25, max: 13.74},
            {actualDose: 15.00, min: 13.75, max: 16.24},
            {actualDose: 17.50, min: 16.25, max: 18.74},
            {actualDose: 20.00, min: 18.75, max: 21.24},
            {actualDose: 22.50, min: 21.25, max: 23.74},
            {actualDose: 25.00, min: 23.75, max: 25.00}];


        return {
            calculateInitialDose: calculateInitialDose,
            getActualDose: getActualDose
        };

        function calculateInitialDose(age, isBlack, isSmoker, height, weight, isDvtPe, isUsingAmiodarone) {
            var bodySurfaceArea = calculateBodySurfaceArea(height, weight);

            var calculatedExponent = FACTOR_INITIAL_BASE - (FACTOR_INITIAL_AGE * age) + (FACTOR_INITIAL_BLACK_RACE * isBlack) + (FACTOR_INITIAL_SMOKER * isSmoker) + (FACTOR_INITIAL_BODY_SURFACE_AREA * bodySurfaceArea) - (FACTOR_INITIAL_AMIODARONE * isUsingAmiodarone) + (FACTOR_INITIAL_TARGET_INR * 2.5) + (FACTOR_INITIAL_DVT_PE * isDvtPe);

            var estimatedDailyDose = Math.pow(Math.E, calculatedExponent);
            var roundedDose = Math.round(estimatedDailyDose);
            return getActualDose(roundedDose);
        }

        function calculateBodySurfaceArea(height, weight) {
            return (Math.pow(weight, 0.425) * Math.pow(height, 0.725)) / 139.2;
        }

        function getActualDose(calculatedDose) {
            for (var i = 0; i < doses.length; i++) {
                if (calculatedDose < doses[i].max && calculatedDose > doses[i].min) {
                    return doses[i].actualDose;
                }
            }
        }
  });
