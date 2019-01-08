import {FeatureToggle } from './lib/feature-toggle';

import test from 'ava';
import sinon from 'sinon';

var testConfig = {
	"metaData": {
        environment: "DEV",
        owner: "TESTER",
        featureExpiryWarningDays: 15
	},
	"features": {
		"FEATURE.FOO": {
			enabled: true,
			description: "CR1234: Enabling Foo Feature",
			expiry: "Mon Jan 07 2019 14:54:15 GMT-0800 (Pacific Standard Time)"
		},
		"FEATURE.BAR": {
			enabled: false,
			description: "CR1111: Enabled Bar Feature",
			expiry: "Mon Jan 28 2019 14:54:15 GMT-0800 (Pacific Standard Time)"
		},
		"FEATURE.BAN": {
			enabled: true,
			description: "CR1234: Enabling Foo Feature",
			expiry: "Mon Jan 06 2019 14:54:15 GMT-0800 (Pacific Standard Time)"
		}
	}
}

var service = new FeatureToggle(testConfig);
var clock = sinon.useFakeTimers(new Date(2019,0,7).getTime());

test('FeatureToggle', t => {
	t.pass();
});

test('FeatureToggle...should exist', t => {
	t.truthy(service);
	t.pass();
});

test('FeatureToggle...should have a isEnabled method', t => {
	t.truthy(service.isEnabled);
	t.is(typeof service.isEnabled, 'function');
});

test('FeatureToggle...should have a execFeature method', t => {
	t.truthy(service.execFeature);
	t.is(typeof service.execFeature, 'function');
});

test('FeatureToggle...should have a getWarningFeatures method', t => {
	t.truthy(service.getWarningFeatures);
	t.is(typeof service.getWarningFeatures, 'function');
});

test('FeatureToggle...should have a getExpiredFeatures method', t => {
	t.truthy(service.getExpiredFeatures);
	t.is(typeof service.getExpiredFeatures, 'function');
});

test('FeatureToggle:Constructor...should set config based on input parameters', t => {
	t.truthy(service.config)
	t.is(service.config, testConfig);
});

test('FeatureToggle:isEnabled...should return true if config has enabled: true', t => {
	t.true(service.isEnabled('FEATURE.FOO'));
});

test('FeatureToggle:isEnabled...should return false if config has enabled: false', t => {
	t.false(service.isEnabled('FEATURE.BAR'));
});

test('FeatureToggle:isEnabled...should return false when config does not have feature', t => {
	t.false(service.isEnabled('FEATURE.BAZ'));
});

test('FeatureToggle:execFeature...should execute enabledFunction if feature is enabled in config', t => {
	var spy = sinon.spy()
	service.execFeature('FEATURE.FOO', spy);
	t.true(spy.called)
});

test('FeatureToggle:execFeature...should not execute enabledFunction if feature is not enabled in config', t => {
	var spy = sinon.spy()
	service.execFeature('FEATURE.BAR', spy);
	t.false(spy.called)
});

test('FeatureToggle:execFeature...should execute disabledFunction if feature is not enabled in config', t => {
	var enabledFunction = sinon.spy()
	var disabledFunction = sinon.spy()

	service.execFeature('FEATURE.BAR', enabledFunction, disabledFunction);
	t.false(enabledFunction.called);
	t.true(disabledFunction.called);
});

test('FeatureToggle:execFeature...should execute disabledFunction if feature is not present in config', t => {
	var enabledFunction = sinon.spy()
	var disabledFunction = sinon.spy()

	service.execFeature('FEATURE.BAZ', enabledFunction, disabledFunction);
	t.false(enabledFunction.called);
	t.true(disabledFunction.called);
});

test('FeatureToggle:getWarningFeatures...should return correct features in warning status', t => {
	var featuresWarning = service.getWarningFeatures();
	t.true(Array.isArray(featuresWarning));
	t.is(featuresWarning.length, 2);
	t.is(featuresWarning[0], "FEATURE.FOO");
	t.is(featuresWarning[1], "FEATURE.BAN");
});

test('FeatureToggle:getExpiredFeatures...should return correct expired features', t => {
	var featureExpired = service.getExpiredFeatures();
	t.true(Array.isArray(featureExpired));
	t.is(featureExpired.length, 1);
	t.is(featureExpired[0], "FEATURE.BAN");
});