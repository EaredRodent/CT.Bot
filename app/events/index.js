const messageNew = require('./message-new.js')
const groupJoin = require('./group-join.js')
const groupLeave = require('./group-leave.js')
const commentAction = require('./comment-action.js')
const likeAction = require('./like-action.js')
const photoNew = require('./photo_new.js')
const boardPostAction = require('./board-post-action.js')

const events = {
  message_new: messageNew,
  group_join: groupJoin,
  group_leave: groupLeave,
  wall_reply_new: commentAction,
  wall_reply_edit: commentAction,
  wall_reply_restore: commentAction,
  wall_reply_delete: commentAction,
  photo_comment_new: commentAction,
  photo_comment_edit: commentAction,
  photo_comment_restore: commentAction,
  photo_comment_delete: commentAction,
  video_comment_new: commentAction,
  video_comment_edit: commentAction,
  video_comment_restore: commentAction,
  video_comment_delete: commentAction,
  like_add: likeAction,
  like_remove: likeAction,
  photo_new: photoNew,
  board_post_new: boardPostAction,
  board_post_edit: boardPostAction,
  board_post_restore: boardPostAction,
  board_post_delete: boardPostAction
}

module.exports = events
