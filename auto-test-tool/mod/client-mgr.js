/**
 * UITester Client Manager Module
 * @author: LongGang <tblonggang@gmail.com>
 */

var _ = require('underscore'),
    EventManager = require('./event-mgr');

// console.info('frome client-mgr', EventManager);

var ClientPool = {
    init: function (){
        this.summary = { total: 0 };

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
        return this.summary;
    },

    _updateInfo: function (clientObject, action){
        var host = this,
            clientType = clientObject.clientType,
            summary = host.summary;

        if ('add' === action){
            if (!summary[clientType]){
                summary[clientType] = [];
            }

            summary[clientType] ++;
            summary.total ++;
        }

        if ('remove' === action){
            summary[clientType] --;
            summary.total --;

            if (0 === summary[clientType].length){
                delete summary[clientType];
            }
        }

        console.info('[ClientPool Message]', clientType, action);
        console.info(host.summary);
    },

    _getUA: function (uaObj){
        return (uaObj.name + (uaObj.msie ? uaObj.version : ''));
    },

    setItem: function (clientObject){
        var host = this;

        // 压入全局的 clients 数组中
        host.clients.push(clientObject);

        // 推入区分 clients 类型的数组中
        var clientType = host._getUA(clientObject.userAgent.browser);

        // cache clientType
        clientObject.clientType = clientType;

        if (!host.clientsMap[clientType]){
            host.clientsMap[clientType] = [];
        }

        host.clientsMap[clientType].push(clientObject);

        host.clients.push(clientObject);

        host._updateInfo(clientObject, 'add');
    },

    removeItem: function (clientObject){
        var host = this;

        if (!clientObject){
            throw('[Error] Not an available clientObject');
        }

        var clients = host.clients,
            clientsMap = host.clientsMap,
            clientType = clientObject.clientType,

            indexInClients = _.indexOf(clients, clientObject),
            indexInClientsMap = _.indexOf(clientsMap[clientType], clientObject);

        clients.splice(indexInClients, 1);
        clientsMap[clientType].splice(indexInClientsMap, 1);

        if (0 === clientsMap[clientType].length){
            delete clientsMap[clientType];
        }

        host._updateInfo(clientObject, 'remove');
    }
};

var ClientManager = {
    listenEventMap: {
        'client:register': function (clientObject){
            ClientPool.setItem(clientObject);

            // console.info('[ClientMgr Event] register client:', clientObject.clientType);

            // broadcast a message, an availabe client
            // is now here, mostly this message is listened
            // by TaskManager
            EventManager.emit('client:available', clientObject);
        },

        // send a msg to client for trace log
        'client:available': function (clientObject){
            console.info('[ClientMgr Event] available client:', clientObject.clientType);

            clientObject.socket.emit('console:available', {
                'msg': 'UITester: An client is available.',
                'available_client': clientObject.clientType,
                'client_summary': ClientPool.getInfo()
            });
        },

        // // I don't care of this event
        // 'client:unavailable': function (clientObject){
        //     console.info('[ClientMgr Events] unavailable client', clientObject.clientType);
        // },

        'client:disconnect': function (clientObject){
            console.info('[ClientMgr Event] client disconnect', clientObject.clientType);

            ClientPool.removeItem(clientObject);
            EventManager.emit('client:available', clientObject);
        },

        'client:task_finish': function (clientObject){
            console.info('[ClientMgr Event] client task finish');

            var reportData = clientObject.reportData;

            EventManager.emit('task:finish', clientObject);
        },

        'task:data_update': function (clientObject){
            console.info('[TaskMgr Event] new data is OK');
        },

        'task:start': function (clientObject){
            console.info('[TaskMgr Event] Task is start');


        }
    },

    init: function (config){
        var host = this;

        ClientPool.init();

        host.handleEventListener();
    },

    handleEventListener: function (){
        var host = this;

        _.each(host.listenEventMap, function (fn, eventName){
            EventManager.on(eventName, fn);
        });
    }
};

module.exports = ClientManager;
