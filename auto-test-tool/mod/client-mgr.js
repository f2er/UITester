/**
 * UITester Client Manager Module
 * @author: LongGang <tblonggang@gmail.com>
 */

var _ = require('underscore');

var ClientPool = {
    init: function (){
        this.config = {};
        
        this.clients = [];

        this.unavailableClients = [];
    },

    getInfo: function (){
    },

    setItem: function (){
    },

    removeItem: function (){
    }
};

var ClientManager = {
    listenEventMap: {
        'client_connect': function (data){
            console.log('[EventManager] client connect');
        },

        'client_disconnect': function (data){
            console.log('[EventManager] client disconnect event');
        },

        'client_task_finish': function (data){
            console.log('[EventManager] client task finish event');
        },

        'data_update': function (data){
            console.log('[EventManager] data update event');
        },
        'task': function (data){
            console.log('[EventManager] task event');
        }
    },

    init: function (config){
        var host = this;

        host.EventManager = config.EventManager;
        host.handleEventListener();
    },

    handleEventListener: function (){
        var host = this;

        _.each(host.listenEventMap, function (fn, eventName){
            host.EventManager.on(eventName, fn);
        });
    }
};

module.exports = ClientManager;