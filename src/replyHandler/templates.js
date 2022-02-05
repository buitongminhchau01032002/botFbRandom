const BOT = 'Mitoo'

const mainMenu = () => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": `Mình là ${BOT}`,
                        "subtitle": `Bạn có thể trò chuyện với ${BOT} bằng một số lựa chọn bên dưới`,
                        "image_url": "https://picsum.photos/id/102/300/400",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": `${BOT} là ai?`,
                                "payload": "ABOUT",
                            },
                            {
                                "type": "postback",
                                "title": "Bắt đầu ngay",
                                "payload": "START",
                            },
                            {
                                "type": "postback",
                                "title": "Góp ý cho Mitoo",
                                "payload": "FEED_BACK",
                            }
                        ],
                    }

                ]
            }
        }
    }
}

const start = () => {
    return {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [
                    {
                        "title": "Tung đồng xu",
                        "subtitle": `${BOT} sẽ giúp bạn tung một đồng xu xem nó là mặt sấp hay ngửa nhé!`,
                        "image_url": "https://i.ibb.co/WtVGNcW/coin-toss.png",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Tung đồng xu",
                                "payload": "COIN_START",
                            }
                        ]
                    },
                    {
                        "title": "Tung xúc xắc",
                        "subtitle": `${BOT} sẽ giúp bạn quay một con xúc xắc`,
                        "image_url": "https://i.ibb.co/RDtHyb8/3d-render-falling-casino-dice-icon-illustration-design-460848-1142.jpg",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Tung xúc xắc",
                                "payload": "DICE_START",
                            }
                        ]
                    },
                    {
                        "title": "Quay lại",
                        "subtitle": "Quay lại màn hình chính",
                        "image_url": "https://picsum.photos/id/102/300/400",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Quay lại",
                                "payload": "MAIN_MENU",
                            }
                        ]
                    }

                ]
            }
        }
    }
}

function contiCoin() {
    return {
        "text": "Bạn có muốn tiếp tục tung đồng xu không?",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Tiếp tục",
                "payload": "COIN_START",
                "image_url": "http://example.com/img/red.png"
            },
            {
                "content_type": "text",
                "title": "Quay lại",
                "payload": "START",
                "image_url": "http://example.com/img/green.png"
            }
        ]
    }
}

function contiDice (quantity) {
    return {
        "text": `Bạn có muốn tiếp tục ${quantity} xúc xắc không?`,
        "quick_replies": [
            {
                "content_type": "text",
                "title": "Tiếp tục",
                "payload": `DICE_${quantity}`,
                "image_url": "http://example.com/img/red.png"
            },
            {
                "content_type": "text",
                "title": "Quay lại",
                "payload": "START",
                "image_url": "http://example.com/img/green.png"
            }
        ]
    }
}

function diceNum() {
    return {
        "text": "Bạn cần tung bao nhiêu viên xúc xắc nà!",
        "quick_replies": [
            {
                "content_type": "text",
                "title": "1 viên",
                "payload": "DICE_1",
            }
        ]
    }
}

function imgDice(num) {
    const listLink = [
        'https://i.ibb.co/YyQ7sw9/dice1.png',
        'https://i.ibb.co/P9crvqJ/dice2.png',
        'https://i.ibb.co/7275g69/dice3.png',
        'https://i.ibb.co/RjCwK6J/dice4.png',
        'https://i.ibb.co/9nnwmHD/dice5.png',
        'https://i.ibb.co/PjxzcL0/dice6.png'
    ]
    return {
        "attachment": {
            "type": "image",
            "payload": {
                "url": `${listLink[num - 1]}`
            }
        }
    }
}

module.exports = {
    mainMenu,
    start,
    contiCoin,
    diceNum,
    imgDice,
    contiDice
}