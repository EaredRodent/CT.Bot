/**
 * Level start
 */

const KEY_UNIFORM = {
  action: {
    type: 'text',
    label: 'Форма',
    payload: '{"action": "KEY_UNIFORM"}'
  },
  color: 'primary'
}

const KEY_RULES = {
  action: {
    type: 'text',
    label: 'Правила',
    payload: '{"action": "KEY_RULES"}'
  },
  color: 'primary'
}

const KEY_VK_CHAT = {
  action: {
    type: 'text',
    label: 'Беседа',
    payload: '{"action": "KEY_VK_CHAT"}'
  },
  color: 'secondary'
}

const KEY_LEVEL_TO_OTHER = {
  action: {
    type: 'text',
    label: 'Доп. информация',
    payload: '{"action": "KEY_LEVEL_TO_OTHER"}'
  },
  color: 'positive'
}

/**
 * Level other
 */

const KEY_DISCORD = {
  action: {
    type: 'text',
    label: 'Дискорд',
    payload: '{"action": "KEY_DISCORD"}'
  },
  color: 'primary'
}

const KEY_FRIENDS = {
  action: {
    type: 'text',
    label: 'Союзы',
    payload: '{"action": "KEY_FRIENDS"}'
  },
  color: 'primary'
}

const KEY_LEVEL_TO_ALBUMS = {
  action: {
    type: 'text',
    label: 'Альбомы',
    payload: '{"action": "KEY_LEVEL_TO_ALBUMS"}'
  },
  color: 'positive'
}

const KEY_LEVEL_FROM_OTHER = {
  action: {
    type: 'text',
    label: 'Назад',
    payload: '{"action": "KEY_LEVEL_FROM_OTHER"}'
  },
  color: 'secondary'
}

/**
 * Level albums
 */

const KEY_MEMES = {
  action: {
    type: 'text',
    label: 'Мемы',
    payload: '{"action": "KEY_MEMES"}'
  },
  color: 'primary'
}

const KEY_CREATION = {
  action: {
    type: 'text',
    label: 'Творчество',
    payload: '{"action": "KEY_CREATION"}'
  },
  color: 'primary'
}

const KEY_HISTORY = {
  action: {
    type: 'text',
    label: 'История',
    payload: '{"action": "KEY_HISTORY"}'
  },
  color: 'primary'
}

const KEY_LEVEL_FROM_ALBUMS = {
  action: {
    type: 'text',
    label: 'Назад',
    payload: '{"action": "KEY_LEVEL_FROM_ALBUMS"}'
  },
  color: 'secondary'
}

function getKeyBoard (type) {
  let kbResult

  switch (type) {
    case 'KEY_LEVEL_START': {
      const kb = {
        one_time: false,
        buttons: [
          [KEY_UNIFORM, KEY_RULES],
          [KEY_VK_CHAT],
          [KEY_LEVEL_TO_OTHER]
        ],
        inline: false
      }

      kbResult = kb
      break
    }
    case 'KEY_LEVEL_OTHER': {
      const kb = {
        one_time: false,
        buttons: [
          [KEY_DISCORD, KEY_FRIENDS],
          [KEY_LEVEL_TO_ALBUMS],
          [KEY_LEVEL_FROM_OTHER]
        ],
        inline: false
      }

      kbResult = kb
      break
    }
    case 'KEY_LEVEL_ALBUMS': {
      const kb = {
        one_time: false,
        buttons: [
          [KEY_MEMES, KEY_CREATION],
          [KEY_HISTORY],
          [KEY_LEVEL_FROM_ALBUMS]
        ],
        inline: false
      }

      kbResult = kb
      break
    }
  }

  return JSON.stringify(kbResult)
}

module.exports = {
  getKeyBoard
}
