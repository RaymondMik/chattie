const moment = require('moment');

const generateMessage = ({sender, receiver, body} = message) => {
    return {
        sender: sender,
        receiver: receiver,
        body: body,
        createdAt: moment().valueOf()
    };
};

module.exports = {generateMessage};