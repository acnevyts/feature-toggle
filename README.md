
# State-Object-Hash-Utilities

# Installation

Clone the repository and do:

    npm install

# Building the library

    npm run build
    
# Running Tests

    npm run test 

# Overview

## FeatureToggle

Feature toggle is a framework built in typescript used to simplify feature toggling in javascript/typescript applicaitons. It is a standalone library with no nested dependencies. 

### Usage
This feature toggle module is meant to be as user friendly as possible. 

In your typescript. Simply import FeatureToggle, create a new instance with your config, then use the class functions

isEnabled() returns a boolean representing if feature is enabled

execFeature() void method that will wrap the if/else logic around checking if the feature is enabled for cleaner code. 
```
import {FeatureToggle } from 'feature-toggle';

var featureToggle = new FeatureToggle(testConfig);
if(featureToggle.isEnabled('FEATURE.FOO')){
    // Feature Logic //
    ...
} else { ...}

// OR //

featureToggle.execFeature('FEATURE.FOO', ()) => {
    // Feature Logic //
    ...
}, () => {
    // Feature Disabled Logic //
    ...
});

```

#### Feature Management Functions 
This class also provides methods to assist in feature management

getWarningFeatures() returns an array of feature names that are nearing the expiry date.

getExpiredFeatures() returns an array of feature names that have expired. 

```
import {FeatureToggle } from 'feature-toggle';

var featureToggle = new FeatureToggle(testConfig);

var featuresNearExpiry = featureToggle.getWarningFeatures();

var expiredFeatures = featureToggle.getExpiredFeatures();
```


