const axios = require('axios')
const env = require('./../../env.js')
const fs = require('fs')
const path = require('path')
const FormData = require('form-data')

const MONDAY = 1; const TUESDAY = 2; const WEDNESDAY = 3; const THURSDAY = 4; const FRIDAY = 5; const SATURDAY = 6; const SUNDAY = 0
const eventDays = [TUESDAY, THURSDAY, SATURDAY, SUNDAY]
const photoMap = Object.freeze({
  [TUESDAY]: '1.jpg',
  [THURSDAY]: '1.jpg',
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
      group_id: env.UTILS_GROUP_ID
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
      group_id: env.UTILS_GROUP_ID,
      photo,
      server,
      hash
    }
  })
}

function wallPost (miniTs, photoAttachment) {
  const formData = FormData()
  formData.append('owner_id', `-${env.UTILS_GROUP_ID}`)
  formData.append('from_group', 1)
  formData.append('publish_date', miniTs)
  formData.append('attachments', photoAttachment)
  return axios.post('wall.post', formData, { headers: formData.getHeaders() })
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
  trimTime.setHours(8, 0, 0, 0)

  return Date.parse(trimTime.toISOString())
}

function getPhotoByTs (ts) {
  return fs.createReadStream(photoMap[new Date(ts).getDay()])
}

(async function init () {
  const { data: { response: { upload_url } } } = await getWallUploadServer()

  ;(function nextPost (sleep = 0) {
    setTimeout(async () => {
      const timeStart = Date.now()

      const ts = getNextEventDayTs()
      const fileReadStream = getPhotoByTs(ts)

      const { data: { photo, server, hash } } = await uploadPhoto(upload_url, fileReadStream)
      const { data: { response: [{ id, owner_id }] } } = await saveWallPhoto(photo, server, hash)
      const photoAttachment = `photo${owner_id}_${id}`
      const { data: wallPostResult } = await wallPost(ts / 1000, photoAttachment)
      console.log(wallPostResult)

      const timeDiff = Date.now() - timeStart
      const nextSleep = timeDiff < 1000 ? 1000 - timeDiff : 0
      nextPost(nextSleep)
    }, sleep)
  })()
})()
