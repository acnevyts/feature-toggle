"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class FeatureToggle {
    constructor(config) {
        if (config)
            this.setConfig(config);
    }
    setConfig(config) {
        this.config = config;
    }
    isEnabled(featureName) {
        let enabled = false;
        if (featureName) {
            if (this.config && this.config.features[featureName] && this.config.features[featureName].enabled) {
                enabled = true;
            }
        }
        return enabled;
    }
    execFeature(featureName, enabledFunction, disabledFunction) {
        if (this.isEnabled(featureName)) {
            enabledFunction ? enabledFunction() : null;
        }
        else {
            disabledFunction ? disabledFunction() : null;
        }
    }
    getWarningFeatures() {
        let features = [];
        if (this.config) {
            let warningPeriod = this.config.metaData && this.config.metaData.featureExpiryWarningDays;
            if (warningPeriod && this.config.features) {
                for (var featureName in this.config.features) {
                    let warningStartDate = new Date(this.config.features[featureName].expiry);
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
    }
    getExpiredFeatures() {
        let features = [];
        if (this.config) {
            if (this.config.features) {
                for (var featureName in this.config.features) {
                    let expiryDate = new Date(this.config.features[featureName].expiry);
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
    }
}
exports.FeatureToggle = FeatureToggle;
//# sourceMappingURL=feature-toggle.js.map