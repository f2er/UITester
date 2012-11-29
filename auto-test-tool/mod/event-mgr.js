var _ = require('underscore');

var EventManager = {};

_.extend(EventManager, require('events').EventEmitter.prototype);

module.exports = EventManager;