import {
  ADD_POST,
  ADD_POST_SUCCESS,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  UPVOTE,
  UPVOTE_SUCCESS,
  DOWNVOTE,
  DOWNVOTE_SUCCESS,
  FETCH_POST_SUCCESS,
  FETCH_POST_REQUEST,
  SIGNAL_ID,
  FETCH_SINGLE_POST_REQUEST,
  FETCH_SINGLE_POST_SUCCESS
} from './index'
import fetch from 'cross-fetch'

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
