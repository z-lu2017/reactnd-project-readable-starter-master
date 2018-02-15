import fetch from 'cross-fetch'

export const ADD_POST = "ADD_POST"
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS"
export const EDIT_POST = "EDIT_POST"
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS"
export const DELETE_POST = "DELETE_POST"
export const DELETE_POST_SUCCESS = "DELETE_POST_SUCCESS"
export const UPVOTE = "UPVOTE"
export const UPVOTE_SUCCESS = "UPVOTE_SUCCESS"
export const DOWNVOTE = "DOWNVOTE"
export const DOWNVOTE_SUCCESS ="DOWNVOTE_SUCCESS"
export const FETCH_POST_REQUEST = "FETCH_POST_REQUEST"
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS"
export const LOAD = "LOAD"
export const SIGNAL_ID = "SIGNAL_ID"
export const FETCH_POST_COMMENT = "FETCH_POST_COMMENT"
export const FETCH_COMMENT_SUCCESS = "FETCH_COMMENT_SUCCESS"
export const UPVOTECOMMENT = "UPVOTECOMMENT"
export const UPVOTECOMMENTSUCCESS = "UPVOTECOMMENTSUCCESS"
export const DOWNVOTECOMMENT = "DOWNVOTECOMMENT"
export const DOWNVOTECOMMENTSUCCESS = "DOWNVOTECOMMENTSUCCESS"
export const ADD_COMMENT = "ADD_COMMENT"
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const DELETE_COMMENT_SUCCESS = "DELETE_COMMENT_SUCCESS"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const EDIT_COMMENT_SUCCESS = "EDIT_COMMENT_SUCCESS"
export const FETCH_SINGLE_POST_REQUEST = "FETCH_SINGLE_POST_REQUEST"
export const FETCH_SINGLE_POST_SUCCESS = "FETCH_SINGLE_POST_SUCCESS"

function deletePost(post){
  return {
    type: DELETE_POST,
    post
  }
}

function deletePostSuccess(json){
  return {
    type: DELETE_POST_SUCCESS,
    post: json
  }
}

export function deletePosts(post) {

  return function (dispatch) {
    dispatch(deletePost(post))
    return fetch('http://localhost:3001/posts/'+post.id, {
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
        dispatch(deletePostSuccess(json))
      )
}
}

function upvote(post){
  return {
    type: UPVOTE,
    post
  }
}

function upvoteSuccess(json){
  return {
    type: UPVOTE_SUCCESS,
    post: json
  }
}

export function upvotePost(post) {

  return function (dispatch) {
    dispatch(upvote(post))
    return fetch('http://localhost:3001/posts/'+ post.id, {
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
        dispatch(upvoteSuccess(json))
      )
}
}

function downvote(post){
  return {
    type: DOWNVOTE,
    post
  }
}

function downvoteSuccess(json){
  return {
    type: DOWNVOTE_SUCCESS,
    post: json
  }
}

export function downvotePost(post) {

  return function (dispatch) {
    dispatch(downvote(post))
    return fetch('http://localhost:3001/posts/'+ post.id, {
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
        dispatch(downvoteSuccess(json))
      )
}
}

function editPost(post){
  return {
    type: EDIT_POST,
    post
  }
}

function editPostSuccess(json){
  return {
    type: EDIT_POST_SUCCESS,
    post: json
  }
}

export function editPosts(post) {

  return function (dispatch) {
    dispatch(editPost(post))
    return   fetch('http://localhost:3001/posts/' + post.id, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'whatever-you-want'
        },
        body: JSON.stringify({
          title: post.title,
          category: post.category,
          id: post.id,
          timestamp: post.timestamp,
          body: post.body,
          author: post.author,
          voteScore: post.voteScore,
          deleted: post.deleted
        })
      }).then(function(response){
        response => response.json(),
        error => console.log('An error occurred.', error)
      }).then(json =>
        dispatch(editPostSuccess(json))
      )

}
}

function fetchPostRequest(){
  return {
    type: FETCH_POST_REQUEST
  }
}

function fetchPostSuccess(json){
  return {
    type: FETCH_POST_SUCCESS,
    posts: json
  }
}

export function fetchPosts() {

  return function (dispatch) {
    dispatch(fetchPostRequest())

    return fetch('http://localhost:3001/posts', {
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
        dispatch(fetchPostSuccess(json))
      )
  }
}

export function signalID(id){
  return{
    type: SIGNAL_ID,
    id
}
}

function addPost(post){
  return {
    type: ADD_POST,
    post
  }
}

function addPostSuccess(json){
  return {
    type: ADD_POST_SUCCESS,
    post: json
  }
}

export function addPosts(post) {

  return function (dispatch) {
    dispatch(addPost(post))
    return fetch('http://localhost:3001/posts', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'whatever-you-want'
      },
      body: JSON.stringify({
        title: post.title,
        category: post.category,
        id: post.id,
        timestamp: post.timestamp,
        body: post.body,
        author: post.author,
        voteScore: post.voteScore,
        deleted: post.deleted
      })
    }).then(
        response => response.json(),
        error => console.log('An error occurred.', error)
      )
      .then(json =>
        dispatch(addPostSuccess(json))
      )
}
}

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

function fetchSinglePostRequest(){
  return {
    type: FETCH_SINGLE_POST_REQUEST
  }
}

function fetchSinglePostSuccess(json){
  return {
    type: FETCH_SINGLE_POST_SUCCESS,
    post: json
  }
}

export function fetchSinglePost(id) {

  return function (dispatch) {
    dispatch(fetchSinglePostRequest(id))

    return fetch('http://localhost:3001/posts/' + id, {
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
        dispatch(fetchSinglePostSuccess(json))
      )
  }
}
