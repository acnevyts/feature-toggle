export interface FeatureFlagConfiguration {
    metaData: {
        environment: string,
        owner: string,
        featureExpiryWarningDays: number
    },
    features: {
        [featureName: string]: {
            enabled: boolean,
            descreiption: string,
            expiry: string
        }
    }
}

export class FeatureToggle {
    private config: FeatureFlagConfiguration
    constructor(config?: FeatureFlagConfiguration){
        if (config) this.setConfig(config);
    }

    public setConfig(config: FeatureFlagConfiguration){
        this.config = config;
    }

    public isEnabled(featureName: string): boolean {
        let enabled: boolean = false;
        if(featureName){
            if(this.config && this.config.features[featureName] && this.config.features[featureName].enabled){
                enabled = true;
            }
        }
        return enabled;
    }

    public execFeature(featureName: string, enabledFunction: Function, disabledFunction:Function):any {
        if(this.isEnabled(featureName)){
            enabledFunction ? enabledFunction() : null;
        } else {
            disabledFunction ? disabledFunction() : null;
        }
    }

    public getWarningFeatures(): string[] {
        let features: string[] = [];
        if(this.config){
            let warningPeriod: number = this.config.metaData && this.config.metaData.featureExpiryWarningDays;
            if(warningPeriod && this.config.features){
                for (var featureName in this.config.features){
                    let warningStartDate: Date = new Date(this.config.features[featureName].expiry);
                    warningStartDate.setDate(warningStartDate.getDate() - warningPeriod);
                    if (warningStartDate <= new Date()){
                        features.push(featureName);
                    }   
                }
            } else {
                console.log('missing features or warning period, check config');
            }
        } else {
            console.log('missing config');
        }
        return features;
    }

    public getExpiredFeatures() {
        let features: string[] = [];
        if(this.config){
            if(this.config.features){
                for (var featureName in this.config.features){
                    let expiryDate: Date = new Date(this.config.features[featureName].expiry);
                    if (expiryDate <= new Date()){
                        features.push(featureName);
                    }   
                }
            } else {
                console.log('missing features, check config');
            }
        } else {
            console.log('missing config');
        }
        return features;
    }
}