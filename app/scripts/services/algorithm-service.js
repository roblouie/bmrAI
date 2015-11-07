'use strict';

//BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) + 5         (man)
//BMR = 10 * weight(kg) + 6.25 * height(cm) - 5 * age(y) - 161     (woman)

angular.module('bmrAiApp')
  .service('algorithmService', function () {
        var WEIGHT_MULTIPLIER = 10;
        var HEIGHT_MULTIPLIER = 6.25;
        var AGE_MULTIPLIER = 5;
        var MALE_MODIFIER = 5;
        var FEMALE_MODIFIER = -161;

        return {
            calculateBasalMetabolicRate: calculateBasalMetabolicRate
        };

        function calculateBasalMetabolicRate(weight, height, age, isMale) {
            var BMR = WEIGHT_MULTIPLIER * weight + HEIGHT_MULTIPLIER * height - AGE_MULTIPLIER * age + (isMale == 1 ? MALE_MODIFIER : FEMALE_MODIFIER);
            return Math.round(BMR);
        }
  });
