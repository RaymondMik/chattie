const generateMessage = ({sender, receiver, body} = message) => {
    return {
        sender: sender,
        receiver: receiver,
        body: body,
        createdAt: new Date().getTime()
    };
};

module.exports = {generateMessage};