module.exports = {

    logStart() {
        console.info('Bot started...')
    },

    getChatId(msg) {
        return msg.chat.id
    }
}

