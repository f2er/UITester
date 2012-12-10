/**
 * UITester Client Manager Module
 * @author LongGang <tblonggang@gmail.com>
 * @description supply management for the client connected
 */

var _ = require('underscore'),
    EventManager = require('./event-mgr');

// console.log('frome client-mgr', EventManager);

var ClientPool = {
    init: function (){
        this.summary = { total: 0 };

        // store all clients referrence while the client
        // type is not cared
        this.clients = [];
        
        // store clients referrence by client type
        this.clientsMap = {};

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

        console.log('[ClientPool Message]', clientType, action);
        console.log(host.summary);
        console.log(host.clientsMap);
        
    },

    _getUA: function (uaObj){
        return (uaObj.name + (uaObj.msie ? uaObj.version : ''));
    },

    _setItemFree: function (clientObject){
        clientObject.status = 'free';
    },

    _setItemBusy: function (clientObject){
        clientObject.status = 'busy';
    },

    _checkItemFree: function (clientObject){
        return ('free' === clientObject.status);
    },

    getFreeClient: function (){
        var host = this,
            ret = [];

        _.each(host.clients, function (clientObject){
            if (host._checkItemFree(clientObject)){
                ret.push(clientObject);
            }
        });

        return ret;
    },

    setItem: function (clientObject){
        var host = this;

        // new connected client, it must be free
        host._setItemFree(clientObject);

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

            // console.log('[ClientMgr Event] register client:', clientObject.clientType);

            // broadcast a message, an availabe client
            // is now here, mostly this message is listened
            // by TaskManager
            EventManager.emit('client:available', clientObject);
        },

        // send a msg to client for trace log
        'client:available': function (clientObject){
            console.log('[ClientMgr Event] available client:', clientObject.clientType);

            clientObject.socket.emit('console:available', {
                'msg': 'UITester: An client is available.',
                'available_client': clientObject.clientType,
                'client_summary': ClientPool.getInfo()
            });
        },

        // // I don't care of this event
        // 'client:unavailable': function (clientObject){
        //     console.log('[ClientMgr Events] unavailable client', clientObject.clientType);
        // },

        'client:disconnect': function (clientObject){
            console.log('[ClientMgr Event] client disconnect', clientObject.clientType);

            ClientPool.removeItem(clientObject);
            EventManager.emit('client:available', clientObject);
        },

        'client:task_finish': function (clientObject){
            console.log('[ClientMgr Event] client task finish');

            ClientPool._setItemFree(clientObject);
        },

        'task:data_update': function (){
            console.log('[TaskMgr Event] new data is OK');

            // if TaskManager subscribe this msg, it can
            // get all client infomations
            EventManager.emit('client:check_types', ClientPool.getInfo());

            _.each(ClientPool.getFreeClient(), function (clientObject){
                EventManager.emit('client:available', clientObject);
            });
        },

        'task:start': function (taskObject){
            console.log('[TaskMgr Event] Task is start');

            var taskClientType = taskObject.clientType;

            var clients = ClientPool[taskClientType];

            var idx = 0, len = clients.length;

            for (; idx < len; idx ++){
                if (clients[idx].status === 'free'){
                    break;
                }
            }

            if (idx >= len){
                throw ('task required a invalid client');
            }

            var clientObject = clients[idx];

            var wrapperObject = {
                taskObject: taskObject,
                clientObject: clientObject
            };

            ClientPool._setItemBusy(clientObject);

            EventManager.emit('console:task_start', wrapperObject);
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
