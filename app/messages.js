function getRandomId () {
  return Math.trunc(Math.random() * 2147483648)
}

function getHello (name) {
  const helloMsgs = [
    'Доброго времени суток',
    'Здравия',
    'Приветствуем',
    'Добрый вечер'
  ]

  const helloMsg = helloMsgs[Math.floor(Math.random() * 4)]

  return `${helloMsg} ${name}!
      
      Для того чтобы вступить в наш клан, необходимо выполнить три основных требования:
      
      Первое, и самое очевидное – вступление в группу клана. Подписка на паблик позволит вам быть в курсе всех самых важных новостей, конкурсов и мероприятий.
      
      Второе, и пожалуй, самое главное – общая униформа клана. Имея её, вы получаете возможность посещать все наши мероприятия и тренировки. Это условие обязательно.
      
      Третье – присоединиться в беседу клана. В ней объявляются менее важные новости, однако о них должен знать каждый. К примеру: Смена точки сбора, или внеплановое собрание.`
}

function getUnknown () {
  return 'Не понимаю вас, используйте клавиатуру ниже.'
}

function getLater () {
  return 'Пока недоступно.'
}

function getUniform () {
  return `Благодаря понятным гайдам вы сможете быстро справиться с клановой униформой, особенно если будете копировать скин с компьютера, в двух окнах. Это является наиболее быстрым и рекомендуемым методом. Следите за правильностью формы, в самом конце гайда предоставлен скриншот с результатом, который должен получиться и у вас. Форма более высших рангов выдается администрацией лично, так что, имейте это ввиду.
  
  Форма: https://vk.com/@thepitchblackk-uniform-for-neophyte`
}

function getRules () {
  return `В этом обсуждении расписаны абсолютно все правила, выдвигаемые нами. Три пункта с постановлениями, которые обязан прочитать каждый. Правила чатов, описывающие допускаемые рамки поведения в них. Пункт с правилами клановых собраний, объясняющие нормы построения и прочих вещей. И конечно же, правила для администрации, для того чтобы начинающие модераторы не витали в облаках. Незнание правил не освобождает вас от ответственности, и мы благодарим вас, за вашу заинтересованность!
  
  Правила: https://vk.com/topic-200281615_46687350`
}

function getVkChat () {
  return `Нахождение в беседе является не менее важным требованием, как и наблюдение за группой. В чате вы сможете найти много интересных личностей, а может даже и товарищей. За всеми процессами следит администрация клана, все неадекватные и токсичные участники варнятся и сразу же исключаются. Присутствует анти-рейд система, благодаря ней в конфе очень уютно и спокойно. Надеемся, что вы быстро вольетесь в наш дружный коллектив!
  
  Беседа: https://vk.me/join/3Jtft3OTXzNhw9TAphXIjaX9DNHvjLssJIw=`
}

function getLevelToOther () {
  return 'Открыт раздел с дополнительной информацией!'
}

function getDiscord () {
  return `Используя возможности нашего Discord сервера, намного удобнее и веселее проводить мероприятия под музыку чат-бота, общаться по душам в голосовых и текстовых каналах. Все новости группы полностью дублируется, вы сможете полноценно участвовать в жизни клана, имея только Discord. Присутствует система рангов со своими привилегиями. Для того чтобы получить основные возможности, пройдите верификацию, отправив свою форму в канал отчеты.
  
  Дискорд: https://discord.com/invite/HhWe8HGmQN`
}

function getFriends () {
  return `В этом обсуждении опубликованы действенные союзы нашего клана с другими. Создано оно для специально интересующихся этим людей, лидеров кланов, стай и проектов. Скриншоты, подтверждающие подлинность союза грамотно оформлены, также, записи имеют подробное описание условий. Учтите, удаление записи с обсуждения – равносильно разрыву союза.
  
  Союзы: https://vk.com/topic-200281615_46725747`
}

function getLevelToAlbums () {
  return 'Открыт раздел с альбомами!'
}

function getLevelFromOther () {
  return 'Выход из раздела дополнительной информации!'
}

function getMemes () {
  return `Самый забавный и смешной контент сосредоточен именно в этом альбоме. Множество легендарных и исторических ситуаций были запечатлены и выложены в общий доступ, для того чтобы каждый участник мог прочувствовать эту атмосферу. Если вам свезло застать подобный забавный случай, достаточно это заскринить и опубликовать в альбом. Уверены, вы поднимите настроение многим.
  
  Альбом: https://vk.com/album-200281615_276061996`
}

function getCreation () {
  return `В этот альбом участники загружают свои фан-арты, или же другие виды творчества, посвященные клану. Альбом также публичен, как и все остальные. Это значит, что вы можете загрузить туда собственные рисунки на тему клана. Благо, наш проект наполняют очень много творческих личностей, именно благодаря им этот сборник рисунков выглядит так красиво и гармонично.
  
  Альбом: https://vk.com/album-200281615_275858455`
}

function getHistory () {
  return `Альбом содержит в себе более полутысячи картинок, на которых запечатлены буквально все мероприятия клана, множество походов, тренировок и огромное количество прочих событий. Не даром альбом именован «Историей», скриншоты загружались с первого дня существования нашего с вами проекта, и по сей день. Помимо прочего, любой участник клана имеет полное право загружать собственные скриншоты, внося свою лепту в альбом.
  
  Альбом: https://vk.com/album-200281615_275702793`
}

function getLevelFromAlbums () {
  return 'Выход из раздела с альбомами!'
}

const guestMessages = {
  getRandomId,
  getHello,
  getUnknown,
  getLater,
  getUniform,
  getRules,
  getVkChat,
  getLevelToOther,
  getDiscord,
  getFriends,
  getLevelToAlbums,
  getLevelFromOther,
  getMemes,
  getCreation,
  getHistory,
  getLevelFromAlbums
}

function getGroupJoin (id, name, count) {
  return `@id${id}(${name}) joins to group - ${count} all.`
}

function getGroupLeave (id, name, count) {
  return `@id${id}(${name}) leaves from group - ${count} all.`
}

function getCommentAction (id, name, eventType, groupId, targetId, itemId, isOnAComment = false) {
  const eventTranslations = Object.freeze({
    NEW: 'add',
    EDIT: 'edit',
    RESTORE: 'restore',
    DELETE: 'delete'
  })

  const eventTypeTranslateMap = Object.freeze({
    wall_reply_new: eventTranslations.NEW,
    wall_reply_edit: eventTranslations.EDIT,
    wall_reply_restore: eventTranslations.RESTORE,
    wall_reply_delete: eventTranslations.DELETE,
    photo_comment_new: eventTranslations.NEW,
    photo_comment_edit: eventTranslations.EDIT,
    photo_comment_restore: eventTranslations.RESTORE,
    photo_comment_delete: eventTranslations.DELETE
  })

  const actionName = eventTypeTranslateMap[eventType]
  const targetName = eventType.split('_')[0]
  const targetNameTranslate = targetName === 'wall' ? 'post' : targetName
  const onACommentStr = isOnAComment ? 'on a comment ' : ''

  const pathMap = Object.freeze({
    wall: `vk.com/wall-${groupId}_${targetId}?w=wall-${groupId}_${targetId}_r${itemId}`,
    photo: `vk.com/photo-${groupId}_${targetId}`,
    video: `vk.com/video-${groupId}_${targetId}`
  })

  const path = pathMap[targetName]

  return `@id${id}(${name}) ${actionName} a \
comment ${onACommentStr}below the ${targetNameTranslate}.\n${path}`
}

function getLikeAction (id, name, eventType, itemType, groupId, postId, itemId) {
  const eventTypeTranslateMap = {
    like_add: 'added',
    like_remove: 'removed'
  }

  const pathMap = {
    post: `wall-${groupId}_${itemId}`,
    photo: `photo-${groupId}_${itemId}`,
    comment: `wall-${groupId}_${postId}?w=wall-${groupId}_${postId}_r${itemId}`,
    topic_comment: `topic-${groupId}_${postId}?post=${itemId}`
  }

  const path = pathMap[itemType]
  const actionText = eventTypeTranslateMap[eventType]

  itemType = itemType.replace(/_/g, ' ')

  return `@id${id}(${name}) ${actionText} like for ${itemType}.\nvk.com/${path}`
}

function getPhotoNew (initiatorName, groupId, photoId, text, previewUrl) {
  return `${initiatorName} added the photo vk.com/photo-${groupId}_${photoId}
  
  ${text}`
}

function getBoardPostAction (eventType, groupId, topicId, commentId, initiatorName, shortText) {
  const path = `vk.com/topic-${groupId}_${topicId}?post=${commentId}`

  if (eventType === 'board_post_delete') {
    return `Delete board post ${path}`
  }

  const actionMap = Object.freeze({
    board_post_new: 'add',
    board_post_edit: 'edit',
    board_post_restore: 'restore'
  })

  const actionName = actionMap[eventType]

  return `${initiatorName} ${actionName} the board post ${path}
  
  Text: ${shortText}`
}

const eventMessages = {
  getGroupJoin,
  getGroupLeave,
  getCommentAction,
  getLikeAction,
  getPhotoNew,
  getBoardPostAction
}

module.exports = {
  ...guestMessages,
  ...eventMessages
}
