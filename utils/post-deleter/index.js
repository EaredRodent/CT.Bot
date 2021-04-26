const axios = require('axios')
const env = require('./../../env.js')

const FROM_POST = 91

axios.defaults.baseURL = 'https://api.vk.com/method/'
axios.defaults.params = {
  access_token: env.UTILS_ACCESS_TOKEN,
  v: env.VERSION
}

function wallGet () {
  return axios.get('wall.get', {
    params: {
      owner_id: `-${env.UTILS_GROUP_ID}`,
      offset: FROM_POST,
      count: 100,
      filter: 'postponed'
    }
  })
}

function wallDelete (post_id) {
  return axios.get('wall.delete', {
    params: {
      owner_id: `-${env.UTILS_GROUP_ID}`,
      post_id
    }
  })
}

(async function init () {
  const { data: { response: { posts } } } = await wallGet()

  ;(function nextPost (sleep = 0) {
    setTimeout(async () => {
      const timeStart = Date.now()

      const post = posts.shift()

      if (!post) {
        return
      }

      const { data } = await wallDelete(post.id)
      console.log(data)

      const timeDiff = Date.now() - timeStart
      const nextSleep = timeDiff < 350 ? 350 - timeDiff : 0
      nextPost(nextSleep)
    }, sleep)
  })()
})()
