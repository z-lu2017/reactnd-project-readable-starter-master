import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE,
  DOWNVOTE,
  FETCH_POST_SUCCESS,
  LOAD,
  SIGNAL_ID
} from '../actions'
import { combineReducers } from 'redux';

var initialBoardState = []

function posts(state = initialBoardState, action){
  const { post, posts } = action

  switch (action.type){
    case FETCH_POST_SUCCESS:
      var returnState = state;
      for (var i=0; i<posts.length;i++){
        for (var j=0; j<returnState.length;j++){
          if (posts[i].id === returnState[j].id){
            posts.splice(i,1)
          }
        }
      }
      returnState = returnState.concat(posts)
      return returnState;

    case ADD_POST:
      var newAddState = state
      newAddState.push(post)
      return newAddState

    case EDIT_POST:
      const newArray = state.posts.filter((p)=>{return p !== post})
      var newState2 = Object.assign({}, state)
      newState2.posts = newArray
      newState2.posts.push(post)
      return newState2

    case DELETE_POST:
      var postCopy = post
      postCopy.deleted = !postCopy.deleted
      const newState3 = state.filter((p)=>{return p.id !== post.id})
      newState3.push(postCopy)
      return newState3

    case UPVOTE:
      var postCopy2 = post
      postCopy2.voteScore += 1
      const newState4 = state.filter((p)=>{return p.id !== post.id})
      newState4.push(postCopy2)
      return newState4

    case DOWNVOTE:
      var postCopy3 = post
      postCopy3.voteScore -= 1
      const newState5 = state.filter((p)=>{return p.id !== post.id})
      newState5.push(postCopy3)
      return newState5

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
  switch (action.type){
    case SIGNAL_ID:
      return state
    default:
      return state
  }
}

export default combineReducers({
  posts,
  comments,
  index,
});
