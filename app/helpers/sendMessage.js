const FormData = require('form-data')
const axios = require('axios')
const env = require('./../../env.js')
const kb = require('./../events/common/keyboard.js')
const messages = require('./../messages.js')

module.exports = async function sendMessage (userId, sendText, keyCode, dontParseLinks = true, attachment = null) {
  const fd = new FormData()

  console.log('dont_parse_links ' + Number(dontParseLinks))

  fd.append('random_id', messages.getRandomId())
  fd.append('user_id', userId)
  fd.append('group_id', env.GROUP_ID)
  fd.append('dont_parse_links', Number(dontParseLinks))
  fd.append('message', sendText)

  if (keyCode) {
    fd.append('keyboard', kb.getKeyBoard(keyCode))
  }

  if (attachment) {
    fd.append('attachment', attachment)
  }

  await axios.post('messages.send', fd, { headers: fd.getHeaders() })
}
