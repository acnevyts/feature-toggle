export interface FeatureFlagConfiguration {
    metaData: {
        environment: string;
        owner: string;
        featureExpiryWarningDays: number;
    };
    features: {
        [featureName: string]: {
            enabled: boolean;
            descreiption: string;
            expiry: string;
        };
    };
}
export declare class FeatureToggle {
    private config;
    constructor(config?: FeatureFlagConfiguration);
    setConfig(config: FeatureFlagConfiguration): void;
    isEnabled(featureName: string): boolean;
    execFeature(featureName: string, enabledFunction: Function, disabledFunction: Function): any;
    getWarningFeatures(): string[];
    getExpiredFeatures(): string[];
}
