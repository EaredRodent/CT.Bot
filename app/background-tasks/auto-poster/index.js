const axios = require('axios').create()
const axiosDiscord = require('axios').create()
const env = require('./../../../env.js')
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')

const MONDAY = 1; const TUESDAY = 2; const WEDNESDAY = 3; const THURSDAY = 4; const FRIDAY = 5; const SATURDAY = 6; const SUNDAY = 0
const eventDays = [TUESDAY, THURSDAY, WEDNESDAY, SATURDAY, SUNDAY]
const photoMap = Object.freeze({
  [TUESDAY]: '1.jpg',
  [THURSDAY]: '1.jpg',
  [WEDNESDAY]: '1.jpg',
  [SATURDAY]: '2.jpg',
  [SUNDAY]: '2.jpg'
})

eventDays.sort((a, b) => a - b)

axios.defaults.baseURL = 'https://api.vk.com/method/'
axios.defaults.params = {
  access_token: env.UTILS_ACCESS_TOKEN,
  v: env.VERSION
}

function getWallUploadServer () {
  return axios.get('photos.getWallUploadServer', {
    params: {
      group_id: env.GROUP_ID
    }
  })
}

function uploadPhoto (uploadUrl, fileReadStream) {
  const formData = FormData()
  formData.append('photo', fileReadStream)
  return axios.post(uploadUrl, formData, { headers: formData.getHeaders() })
}

function saveWallPhoto (photo, server, hash) {
  return axios.get('photos.saveWallPhoto', {
    params: {
      group_id: env.GROUP_ID,
      photo,
      server,
      hash
    }
  })
}

function wallPost (photoAttachment) {
  const formData = FormData()
  formData.append('owner_id', `-${env.GROUP_ID}`)
  formData.append('from_group', 1)
  formData.append('attachments', photoAttachment)
  return axios.post('wall.post', formData, { headers: formData.getHeaders() })
}

function wallPostDiscord(photoAttachment) {
  return axiosDiscord.post(env.DISCORD_WEBHOOK, {
    content: '@everyone',
    embeds: [
      {
        title: '',
        color: 0,
        description: '',
        timestamp: '',
        author: {
          url: '',
          icon_url: ''
        },
        image: {
          url: photoAttachment
        },
        thumbnail: {},
        footer: {
          text: ''
        },
        fields: []
      }
    ]
  })
}

function getNextEventDayTs () {
  const ctx = getNextEventDayTs
  const DAY_TS_ADDITION = 1000 * 3600 * 24

  ctx.nextTs = ctx.nextTs ?? Date.now()

  let returnTs

  while (true) {
    const locDate = new Date(ctx.nextTs)
    returnTs = ctx.nextTs
    ctx.nextTs += DAY_TS_ADDITION

    if (eventDays.includes(locDate.getDay())) {
      break
    }
  }

  const trimTime = new Date(returnTs)
  trimTime.setHours(5, 56, 0, 0)

  return Date.parse(trimTime.toISOString())
}

function getPhotoByTs (ts) {
  return fs.createReadStream(path.join(__dirname, photoMap[new Date(ts).getDay()]))
}

module.exports = async function autoPoster () {
  const { data: { response: { upload_url } } } = await getWallUploadServer()

  ;(function nextPost () {
    const ts = getNextEventDayTs()
    const sleep = ts - Date.now()

    setTimeout(async () => {
      const fileReadStream = getPhotoByTs(ts)

      const { data: { photo, server, hash } } = await uploadPhoto(upload_url, fileReadStream)
      const { data: { response: [{ id, owner_id, sizes }] } } = await saveWallPhoto(photo, server, hash)
      const photoAttachment = `photo${owner_id}_${id}`
      const { data: wallPostResult } = await wallPost(photoAttachment)
      console.log(wallPostResult)
      const lastPhotoFrom = sizes[sizes.length - 1].url
      const { data: wallPostDiscordResult } = await wallPostDiscord(lastPhotoFrom)
      console.log(wallPostDiscordResult)
      nextPost()
    }, sleep)
  })()
}
