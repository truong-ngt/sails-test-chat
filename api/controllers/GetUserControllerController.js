/**
 * GetUserControllerController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

// var socketIOClient = require('socket.io-client');
// var sailsIOClient = require('sails.io.js');
// var io = require('sails.io.js')( require('socket.io-client') );
// var io = sailsIOClient(socketIOClient);

// io.sails.url = 'http://localhost:1336';
module.exports = {
    // test: async function () {
    //     io.socket.get('/search', function(resData){
    //         return ("ok");
    //     });
    // }
    test : async function(req, res) {
        return req.session.userId;
    }

};

