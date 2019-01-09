"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FeatureToggle = (function () {
    function FeatureToggle(config) {
        if (config)
            this.setConfig(config);
    }
    FeatureToggle.prototype.setConfig = function (config) {
        this.config = config;
    };
    FeatureToggle.prototype.isEnabled = function (featureName) {
        var enabled = false;
        if (featureName) {
            if (this.config && this.config.features[featureName] && this.config.features[featureName].enabled) {
                enabled = true;
            }
        }
        return enabled;
    };
    FeatureToggle.prototype.execFeature = function (featureName, enabledFunction, disabledFunction) {
        if (this.isEnabled(featureName)) {
            enabledFunction ? enabledFunction() : null;
        }
        else {
            disabledFunction ? disabledFunction() : null;
        }
    };
    FeatureToggle.prototype.getWarningFeatures = function () {
        var features = [];
        if (this.config) {
            var warningPeriod = this.config.metaData && this.config.metaData.featureExpiryWarningDays;
            if (warningPeriod && this.config.features) {
                for (var featureName in this.config.features) {
                    var warningStartDate = new Date(this.config.features[featureName].expiry);
                    warningStartDate.setDate(warningStartDate.getDate() - warningPeriod);
                    if (warningStartDate <= new Date()) {
                        features.push(featureName);
                    }
                }
            }
            else {
                console.log('missing features or warning period, check config');
            }
        }
        else {
            console.log('missing config');
        }
        return features;
    };
    FeatureToggle.prototype.getExpiredFeatures = function () {
        var features = [];
        if (this.config) {
            if (this.config.features) {
                for (var featureName in this.config.features) {
                    var expiryDate = new Date(this.config.features[featureName].expiry);
                    if (expiryDate <= new Date()) {
                        features.push(featureName);
                    }
                }
            }
            else {
                console.log('missing features, check config');
            }
        }
        else {
            console.log('missing config');
        }
        return features;
    };
    return FeatureToggle;
}());
exports.FeatureToggle = FeatureToggle;
//# sourceMappingURL=feature-toggle.js.map