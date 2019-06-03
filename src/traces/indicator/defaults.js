/**
* Copyright 2012-2019, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var Lib = require('../../lib');
var attributes = require('./attributes');
var handleDomainDefaults = require('../../plots/domain').defaults;
var Template = require('../../plot_api/plot_template');
// var handleDomainDefaults = require('../../plots/domain').defaults;
// var handleText = require('../bar/defaults').handleText;

module.exports = function supplyDefaults(traceIn, traceOut, defaultColor, layout) {
    function coerce(attr, dflt) {
        return Lib.coerce(traceIn, traceOut, attributes, attr, dflt);
    }

    coerce('mode');
    coerce('values');
    coerce('valueformat');
    coerce('min');
    coerce('max', 1.5 * traceOut.values[traceOut.values.length - 1]);
    coerce('target');
    if(traceOut.target > traceOut.max) traceOut.target = traceOut.max;

    handleDomainDefaults(traceOut, layout, coerce);

    // Font attribtes
    coerce('font.color', layout.font.color);
    coerce('font.family', layout.font.family);
    // Lib.coerceFont(coerce, 'font', layout.font);


    // gauge attributes
    var gaugeIn = traceIn.gauge;
    var gaugeOut = Template.newContainer(traceOut, 'gauge');

    function coerceGauge(attr, dflt) {
        return Lib.coerce(gaugeIn, gaugeOut, attributes.gauge, attr, dflt);
    }
    coerceGauge('shape');
    coerceGauge('background.color');
    coerceGauge('background.line.color');
    coerceGauge('background.line.width');
    coerceGauge('value.color');
    coerceGauge('value.line.color');
    coerceGauge('value.line.width');
    coerceGauge('target.color');
    coerceGauge('target.line.color');
    coerceGauge('target.line.width');

    // ticker attributes
    coerce('delta.showpercentage');
    coerce('delta.valueformat', traceOut.delta.showpercentage ? '2%' : traceOut.valueformat);
    coerce('delta.increasing.color');
    coerce('delta.decreasing.color');
};
