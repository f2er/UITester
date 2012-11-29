/**
 * UITester Client Manager Module
 * @author: LongGang <tblonggang@gmail.com>
 */

var _ = require('underscore');

var ClientPool = {
    init: function (){
        this.config = {
            totalClients: 0
        };
        
        this.clients = {
            ie6: [],
            ie7: [],
            ie8: [],
            ie9: [],
            ie10: [],
            chrome: [],
            firefox: []
        };

        // this.unavailableClients = [];
    },

    getInfo: function (){
        return this.config;
    },

    setItem: function (clientObject, clientType){
        var hsot = this;

        host.clients[clientType] = clientObject;
    },

    removeItem: function (clientId, clientType){
        var host = this;

        if (!clientType || !clientId){
            throw('[err] clientType or clientId Error!');
        }

        var removedItem,
            clients = host.clients[clientType];

        _.each(clients, function (client, index){
            if (clientId === client.clientId){
                clients.splice(index, 1);
            }
        });

        return removedItem;
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
        },

        'task': function (data){
            console.log('[EventManager] task event');
        }
    },

    init: function (config){
        var host = this;

        host.EventManager = config.eventManager;

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