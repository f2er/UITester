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

        // store all clients referrence while the client
        // type is not cared
        this.clients = [];
        
        // store clients referrence by client type
        this.clientsMap = {
            ie6: [],
            ie7: [],
            ie8: [],
            ie9: [],
            ie10: [],
            chrome: [],
            firefox: []
        };

        // for report
        // this.unavailableClients = [];
    },

    getInfo: function (){
        return this.config;
    },

    setItem: function (clientObject){
        var host = this;

        // 压入全局的 clients 数组中
        host.clients.push(clientObject);

        // 推入区分 clients 类型的数组中
        var clientType, ua = clientObject.userAgent.browser;

        clientType = ua.name + (ua.msie ? ua.version : '');
        host.clientsMap[clientType] = clientObject;

        console.info(host.clientsMap);
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
        'client:register': function (clientObject){
            // console.info('[EventMgr]\r\n', data);

            ClientPool.setItem(clientObject);

            // broadcast a message, an availabe client
            // is now here, mostly this message is listened
            // by TaskManager
            ClientManager.EventManager.emit('client:availabe', clientObject);
        },

        'client:availabe': function (clientObject){
            console.info('[ClientMgr Event] available client:', clientObject);
        },

        'client:disconnect': function (clientObject){
            console.info('[ClientMgr Event]test break point of disconnect');
        },

        'client:task_finish': function (clientObject){
            console.info('[ClientMgr Event] client task finish event');
        },

        'task_data_update': function (clientObject){
        },

        'task_start': function (clientObject){
            console.info('[ClientMgr Event] task event');
        }
    },

    init: function (config){
        var host = this;

        ClientPool.init();

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
