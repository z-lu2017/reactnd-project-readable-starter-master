import{
  FETCH_POST_COMMENT,
  FETCH_COMMENT_SUCCESS,
  UPVOTECOMMENT,
  UPVOTECOMMENTSUCCESS,
  DOWNVOTECOMMENT,
  DOWNVOTECOMMENTSUCCESS,
  ADD_COMMENT,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT,
  DELETE_COMMENT_SUCCESS,
  EDIT_COMMENT,
  EDIT_COMMENT_SUCCESS
} from './index'
import fetch from 'cross-fetch'

function fetchPostComment(id){
  return {
    type: FETCH_POST_COMMENT,
    id: id
  }
}

function fetchCommentSuccess(json){
  return {
    type: FETCH_COMMENT_SUCCESS,
    comments: json
  }
}

export function fetchComments(id) {

  return function (dispatch) {
    dispatch(fetchPostComment(id))

    return fetch('http://localhost:3001/posts/'+ id + '/comments', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'whatever-you-want'
      },
    })
      .then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(fetchCommentSuccess(json))
      )
  }
}

function upvoteComment(comment){
  return {
    type: UPVOTECOMMENT,
    comment
  }
}

function upvoteCommentSuccess(json){
  return {
    type: UPVOTECOMMENTSUCCESS,
    comment: json
  }
}

export function upvoteComments(comment) {

  return function (dispatch) {
    dispatch(upvoteComment(comment))
    return fetch('http://localhost:3001/comments/'+ comment.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'whatever-you-want'
      },
      body:JSON.stringify({
        option: 'upVote'
      })
    }).then(function(response){
        response => response.json(),
        error => console.log('An error occurred.', error)
      }).then(json =>
        dispatch(upvoteCommentSuccess(json))
      )
}
}

function downvoteComment(comment){
  return {
    type: DOWNVOTECOMMENT,
    comment
  }
}

function downvoteCommentSuccess(json){
  return {
    type: DOWNVOTECOMMENTSUCCESS,
    comment: json
  }
}

export function downvoteComments(comment) {

  return function (dispatch) {
    dispatch(downvoteComment(comment))
    return fetch('http://localhost:3001/comments/'+ comment.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'whatever-you-want'
      },
      body:JSON.stringify({
        option: 'downVote'
      })
    }).then(function(response){
        response => response.json(),
        error => console.log('An error occurred.', error)
      }).then(json =>
        dispatch(downvoteCommentSuccess(json))
      )
}
}

function addComment(comment){
  return {
    type: ADD_COMMENT,
    comment
  }
}

function addCommentSuccess(json){
  return {
    type: ADD_COMMENT_SUCCESS,
    comment: json
  }
}

export function addComments(comment) {

  return function (dispatch) {
    dispatch(addComment(comment))
    return fetch('http://localhost:3001/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'whatever-you-want'
      },
      body: JSON.stringify({
        id: comment.id,
        timestamp: comment.timestamp,
        body: comment.body,
        author: comment.author,
        voteScore: comment.voteScore,
        deleted: comment.deleted,
        parentId: comment.parentId,
        parentDeleted: comment.parentDeleted
      })
    }).then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(addCommentSuccess(json))
      )
}
}

function deleteComment(comment){
  return {
    type: DELETE_COMMENT,
    comment
  }
}

function deleteCommentSuccess(json){
  return {
    type: DELETE_COMMENT_SUCCESS,
    comment: json
  }
}

export function deleteComments(comment) {

  return function (dispatch) {
    dispatch(deleteComment(comment))
    return fetch('http://localhost:3001/comments/'+comment.id, {
          method: 'DELETE',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'whatever-you-want'
          }
        }).then(function(response){
        response => response.json(),
        error => console.log('An error occurred.', error)
      }).then(json =>
        dispatch(deleteCommentSuccess(json))
      )
}
}

function editComment(comment){
  return {
    type: EDIT_COMMENT,
    comment
  }
}

function editCommentSuccess(json){
  return {
    type: EDIT_COMMENT_SUCCESS,
    comment: json
  }
}

export function editComments(comment) {

  return function (dispatch) {
    dispatch(editComment(comment))
    return   fetch('http://localhost:3001/comments/' + comment.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'whatever-you-want'
        },
        body: JSON.stringify({
          id: comment.id,
          timestamp: comment.timestamp,
          body: comment.body,
          author: comment.author
        })
      }).then(function(response){
        response => response.json(),
        error => console.log('An error occurred.', error)
      }).then(json =>
        dispatch(editCommentSuccess(json))
      )

}
}
