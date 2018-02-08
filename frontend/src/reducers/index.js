import {
  ADD_POST,
  ADD_POST_SUCCESS,
  EDIT_POST,
  EDIT_POST_SUCCESS,
  DELETE_POST,
  DELETE_POST_SUCCESS,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE,
  UPVOTE_SUCCESS,
  DOWNVOTE,
  DOWNVOTE_SUCCESS,
  FETCH_POST_SUCCESS,
  FETCH_POST_REQUEST,
  LOAD,
  SIGNAL_ID
} from '../actions'
import { combineReducers } from 'redux';

var initialBoardState = []

function posts(state = initialBoardState, action){
  const { post, posts } = action

  switch (action.type){
    case FETCH_POST_REQUEST:
      return state

    case FETCH_POST_SUCCESS:
      var returnState = state;
      for (var k=0; k<returnState.length; k++){
        if (returnState[k].deleted){
          returnState.splice(k,1)
        }
      }
      for (var i=0; i<posts.length; i++){
        for (var j=0; j<returnState.length;j++){
          if (posts[i].id === returnState[j].id && (!posts[i].deleted)){
            posts.splice(i,1)
          }
        }
      }
      returnState = returnState.concat(posts)
      return returnState;

    case ADD_POST:
      var addState = state
      addState.push(post)
      return addState

    case ADD_POST_SUCCESS:
      return state

    case EDIT_POST:
      var newArray2 = state.filter((p)=>{return p.id !== post.id})
      newArray2.push(post)
      return newArray2

    case EDIT_POST_SUCCESS:
      return state

    case DELETE_POST:
      var postCopy = post
      postCopy.deleted = !postCopy.deleted
      const newState3 = state.filter((p)=>{return p.id !== post.id})
      newState3.push(postCopy)
      return newState3

    case DELETE_POST_SUCCESS:
      return state

    case UPVOTE:
      var postCopy2 = post
      postCopy2.voteScore += 1
      const newState4 = state.filter((p)=>{return p.id !== post.id})
      newState4.push(postCopy2)
      return newState4

    case UPVOTE_SUCCESS:
      return state

    case DOWNVOTE:
      var postCopy3 = post
      postCopy3.voteScore -= 1
      const newState5 = state.filter((p)=>{return p.id !== post.id})
      newState5.push(postCopy3)
      return newState5

    case DOWNVOTE_SUCCESS:
      return state

    case LOAD:
      return {
        data: action.data
      }

    default:
      return state
  }
}

function comments(state = {}, action){
  switch(action.type){
    case ADD_COMMENT:
      return state
    case DELETE_COMMENT:
      return state
    case EDIT_COMMENT:
      return state
    default:
      return state
  }
}

function index(state = -1, action){
  const { id } = action
  switch (action.type){
    case SIGNAL_ID:
      return id
    default:
      return state
  }
}

export default combineReducers({
  posts,
  comments,
  index,
});
