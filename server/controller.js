const bcrypt = require('bcryptjs')

const chats = []

module.exports = {
    createMessage: (req, res) => {
        console.log(req.body)
        const {pin, message} = req.body

        for (let i = 0; i < chats.length; i++){
            let exsistingPin = bcrypt.compareSync(pin, chats[i].pinHash)

            if (exsistingPin){
                chats[i].messages.push(message)
                let messagesToReturn = {...chats[i]}
                delete messagesToReturn.pinHash
                res.status(200).send(messagesToReturn)
                return
            }

            
        }

        const salt = bcrypt.genSaltSync(5)

        const pinHash = bcrypt.hashSync(pin, salt)

        // console.log('original pin ' + pin)
        // console.log('salt ' + salt)
        // console.log('pinHash ' + pinHash)

        let msgObj = {
            pinHash,
            messages: [message]
        }

        chats.push(msgObj)

        let messagesToReturn = {...msgObj}
        delete messagesToReturn.pinHash

        console.log(chats)

        res.status(200).send(messagesToReturn)
    }

}