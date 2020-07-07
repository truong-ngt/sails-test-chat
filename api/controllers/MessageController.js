/**
 * MessagesController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

async function saveMessage(req, res) {
    var username = req.body.username;
    var content = req.body.content;
    if (username === '' || content === '') {
      return res.json({
        status: error,
        message: 'thieu truong'
      });
    }
    await Message.create({
      username: username,
      message: content,
    }).exec(function (err, message, wasCreated) {
      if (err) {
        return res.serverError(err);
      };
      if (wasCreated) {
        return res.json({
            message
        });
      }
    });
  }

module.exports = {

    onConnect:async function (req, res) {
        oldMessages = await Message.find();
        // console.log(oldMessages);
        sails.sockets.join(req, 'chat-channel', function(err){
            if(err){
                return res.serverError(err);
            }
        });
        return res.ok({oldMessages});
    },

    sendMessage: async function (req, res) {
        content = req.body.content;
        username = req.body.username;
        oldMessages = await Message.find();
        // console.log(oldMessages);
        saveMessage(req, res);
        sails.sockets.broadcast('chat-channel', 'chat', {content, username, oldMessages});
        return res.ok();
    }

};