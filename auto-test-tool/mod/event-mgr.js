var _ = require('underscore');

var EventManager = {
    'modName': 'EventManager'
};

_.extend(EventManager, require('events').EventEmitter.prototype);

module.exports = EventManager;