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
                        "image_url": "https://picsum.photos/id/102/300/400",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Tung đồng xu",
                                "payload": "COIN_START",
                            }
                        ]
                    },
                    {
                        "title": "Quay xúc xắc",
                        "subtitle": `${BOT} sẽ giúp bạn quay một con xúc xắc`,
                        "image_url": "https://i.ibb.co/RDtHyb8/3d-render-falling-casino-dice-icon-illustration-design-460848-1142.jpg",
                        "buttons": [
                            {
                                "type": "postback",
                                "title": "Tung đồng xu",
                                "payload": "COIN_START",
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

module.exports = {
    mainMenu,
    start,
    contiCoin
}