const messages = require('./../messages.js')
const _sendMessage = require('./../helpers/sendMessage.js')
const usersGet = require('./../helpers/usersGet.js')

module.exports = async function messageNew (update, usersInfo) {
  const message = update.object.message

  if (message.peer_id !== message.from_id) {
    return
  }

  console.log('start newMessage()')
  console.log('update:')
  console.log(update)

  function sendMessage (sendText, keyCode) {
    return _sendMessage(message.from_id, sendText, keyCode)
  }

  if (!usersInfo[message.from_id]) {
    const profile = await usersGet(message.from_id)

    // const name = profile.first_name + ' ' + profile.last_name

    const sendText = messages.getHello(profile.first_name)
    await sendMessage(sendText, 'KEY_LEVEL_START')

    usersInfo[message.from_id] = {}
  } else {
    if (message.payload) {
      const payload = JSON.parse(message.payload)
      const action = payload.action

      console.log('before action "' + action + '"')

      switch (action) {
        case 'KEY_UNIFORM': {
          const sendText = messages.getUniform()
          await sendMessage(sendText, 'KEY_LEVEL_START')

          break
        }
        case 'KEY_RULES': {
          const sendText = messages.getRules()
          await sendMessage(sendText, 'KEY_LEVEL_START')

          break
        }
        case 'KEY_VK_CHAT': {
          const sendText = messages.getVkChat()
          await sendMessage(sendText, 'KEY_LEVEL_START')

          break
        }
        case 'KEY_LEVEL_TO_OTHER': {
          const sendText = messages.getLevelToOther()
          await sendMessage(sendText, 'KEY_LEVEL_OTHER')

          break
        }
        // ====================================================================
        case 'KEY_DISCORD': {
          const sendText = messages.getDiscord()
          await sendMessage(sendText, 'KEY_LEVEL_OTHER')

          break
        }
        case 'KEY_FRIENDS': {
          const sendText = messages.getFriends()
          await sendMessage(sendText, 'KEY_LEVEL_OTHER')

          break
        }
        case 'KEY_LEVEL_TO_ALBUMS': {
          const sendText = messages.getLevelToAlbums()
          await sendMessage(sendText, 'KEY_LEVEL_ALBUMS')

          break
        }
        case 'KEY_LEVEL_FROM_OTHER': {
          const sendText = messages.getLevelFromOther()
          await sendMessage(sendText, 'KEY_LEVEL_START')

          break
        }
        // ====================================================================
        case 'KEY_MEMES': {
          const sendText = messages.getMemes()
          await sendMessage(sendText, 'KEY_LEVEL_ALBUMS')

          break
        }
        case 'KEY_CREATION': {
          const sendText = messages.getCreation()
          await sendMessage(sendText, 'KEY_LEVEL_ALBUMS')

          break
        }
        case 'KEY_HISTORY': {
          const sendText = messages.getHistory()
          await sendMessage(sendText, 'KEY_LEVEL_ALBUMS')

          break
        }
        case 'KEY_LEVEL_FROM_ALBUMS': {
          const sendText = messages.getLevelFromAlbums()
          await sendMessage(sendText, 'KEY_LEVEL_OTHER')

          break
        }
      }

      console.log('action done')
    } else if (message.text[0] === '/') {
      // const fromId = message.from_id
      //
      // const draftCommand = message.text
      // const tokens = draftCommand.split(/\s+/)
      //
      // if(tokens.length < 3) {
      //   const sendText = messages.getLevelFromAlbums()
      //   await sendMessage(sendText, 'KEY_LEVEL_OTHER')
      // }

    } else {
      // const sendText = messages.getUnknown()
      // await sendMessage(sendText, 'KEY_LEVEL_START')
    }
  }

  console.log('exit newMessage()')
}
