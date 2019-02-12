/**
 * ChatController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
  

  joinChat: async (req, res) => {
    if (!req.isSocket) {
      return res.badRequest();
    }
    console.log(req);

    sails.sockets.join(req, 'message', (err) => {
      if (err) {
        return res.serverError(err);
      }
  
      return res.send(roomId);
    });
    
  },

  sendMessage: async (req, res) => {
    sails.sockets.broadcast('message', 'Hello world!');
    const { message, from, to } = req.body;
    const newMessageToAdd = { message, from, to };
    const sendedMessage = await Chat.create(newMessageToAdd).fetch();
    return res.send(sendedMessage);
  },

  getMessages: async (req, res) => {
    const { from, to } = req.param;
    const messages = await Chat.find({ where: { from, to } })
      .sort('createdAt DESC');
    return res.send(messages);
  },

};

