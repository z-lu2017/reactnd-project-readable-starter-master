import fetch from 'cross-fetch'

export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const DELETE_POST = "DELETE_POST"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const UPVOTE = "UPVOTE"
export const DOWNVOTE = "DOWNVOTE"
export const FETCH_POST_REQUEST = "FETCH_POST_REQUEST"
export const FETCH_POST_SUCCESS = "FETCH_POST_SUCCESS"
export const LOAD = "LOAD"
export const SIGNAL_ID = "SIGNAL_ID"

export function addPost (post){
  return {
    type: ADD_POST,
    post
  }
}

export function editPost(post){
  return {
    type: EDIT_POST,
    post
  }
}

export function deletePost(post){
  return {
    type: DELETE_POST,
    post
  }
}

export function addComment({comment}){
  return {
    type: ADD_COMMENT,
    comment
  }
}

export function editComment({comment}){
  return {
    type: EDIT_COMMENT,
    comment
  }
}

export function deleteComment({comment}){
  return {
    type: DELETE_COMMENT,
    comment
  }
}

export function upvote(post){
  return {
    type: UPVOTE,
    post
  }
}

export function downvote(post){
  return {
    type: DOWNVOTE,
    post
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
