function debug(obj = {}) {
    return JSON.stringify(obj, null, 4)
}

const TelegramBot = require('node-telegram-bot-api')
const config = require('./config')
const helper = require('./helper')
const functions = require('./functions')
// include("./functions.js");


// Переменные основных кнопок
let btnBuy = 'Buy'


// Переменные контента приветствия
let helloImage = 'src/img/hello.png'


helper.logStart()

const bot = new TelegramBot(config.TOKEN, {
    polling: true
})



bot.on('message', msg => {
    console.info('Working', msg.from.first_name)
})
// /start - command
bot.onText(/\/start/, msg => {
    const hello = msg.from.first_name + `, Hello user`

    bot.sendMessage(helper.getChatId(msg), hello)

    bot.sendPhoto(helper.getChatId(msg), helloImage, {
        reply_markup: {
            resize_keyboard: true,
            keyboard: [
                [btnBuy]
            ]
        }
    })


})


bot.onText(/Buy/, function (msg, match) {
    bot.sendMessage(helper.getChatId(msg), 'some text', {
        reply_markup: {
            inline_keyboard: [
                [
                    {
                        text: 'pay button',
                        callback_data: 'pay_button'
                    }
                ]
            ]
        }
    })

})



bot.on('callback_query', query => {
    const queryData = query.message.chat.id

    if (query.data == 'pay_button') {
        bot.sendMessage(queryData, 'Some text')
        bot.sendInvoice(
            queryData,
            'Вы покупаете: AuDi',
            'Описание: Best car ever',
            'payload',
            '410694247:TEST:4a81dbfe-c719-4750-99e5-2a20365e2045',
            'Some_RANDOM_KEY',
            'UAH',
            [
                {
                    label: 'AuDis',
                    amount: '1000'
                }
            ],
            {
                photo_url: 'https://i.ytimg.com/vi/2cebMGt8R_M/maxresdefault.jpg'
            }
        )
        const error_message = 'Hello'
        // ошибка на 94 строке. Если убрать ф-ю bot.answerPre..., то в консоль выводит сообщение. Значит событие pre_checkout query работает.
        // ошибка в синтаксисе..
        bot.on('pre_checkout_query', bot.answerPreCheckoutQuery(true, error_message('heello')), console.info('Pre-checkout query done'))
        bot.on('successful_payment', () => console.log('Woohoo'))

    }

})
bot.on("polling_error", (err) => console.log('Here error=> ' + err));