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
  LOAD,
  SIGNAL_ID,
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
  EDIT_COMMENT_SUCCESS,
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
      for (var l=0; l<posts.length; l++){
        if (posts[l].deleted){
          posts.splice(l,1)
        }
      }

      returnState = returnState.concat(posts)
      for (var m=0; m<returnState.length; m++){
        for (var n=0; n<returnState.length; n++){
          if (returnState[m].id === returnState[n].id && m !== n){
            returnState.splice(n,1)
          }
        }
      }
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
      for (var a=0; a<newArray2.length; a++){
        for (var b=0; b<newArray2.length; b++){
          if (newArray2[a].id === newArray2[b].id && a !== b){
            newArray2.splice(b,1)
          }
        }
      }
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

var initialComments = []

function comments(state = initialComments, action){
  const { comments, comment } = action

  switch(action.type){
    case FETCH_POST_COMMENT:
      return state

    case FETCH_COMMENT_SUCCESS:
      var returnState = state;
      for (var q=0; q<returnState.length; q++){
        if (returnState[q].deleted || returnState[q].parentDeleted){
          returnState.splice(q,1)
        }
      }
      for (var w=0; w<comments.length; w++){
        if (comments[w].deleted || comments[w].parentDeleted){
          comments.splice(w,1)
        }
      }

      returnState = returnState.concat(comments)
      for (var e=0; e<returnState.length; e++){
        for (var r=0; r<returnState.length; r++){
          if (returnState[e].id === returnState[r].id && e !== r){
            returnState.splice(r,1)
          }
        }
      }
      return returnState;

    case UPVOTECOMMENT:
      var commentCopy = comment
      commentCopy.voteScore += 1
      const commentState = state.filter((c)=>{return c.id !== comment.id})
      commentState.push(commentCopy)
      return commentState

    case UPVOTECOMMENTSUCCESS:
      return state

    case DOWNVOTECOMMENT:
      var commentCopy2 = comment
      commentCopy2.voteScore -= 1
      const commentState2 = state.filter((c)=>{return c.id !== comment.id})
      commentState2.push(commentCopy2)
      return commentState2

    case DOWNVOTECOMMENTSUCCESS:
      return state

    case ADD_COMMENT:
      var addStateComment = state
      addStateComment.push(comment)
      return addStateComment

    case ADD_COMMENT_SUCCESS:
      return state

    case DELETE_COMMENT:
      var commentCopy = comment
      commentCopy.deleted = !commentCopy.deleted
      const newStateComment3 = state.filter((c)=>{return c.id !== comment.id})
      newStateComment3.push(commentCopy)
      return newStateComment3

    case DELETE_COMMENT_SUCCESS:
      return state

    case EDIT_COMMENT:
      var newArrayComment2 = state.filter((c)=>{return c.id !== comment.id})
      newArrayComment2.push(comment)
      for (var o=0; o<newArrayComment2.length; o++){
        for (var p=0; p<newArrayComment2.length; p++){
          if (newArrayComment2[o].id === newArrayComment2[p].id && o !== p){
            newArrayComment2.splice(p,1)
          }
        }
      }
      return newArrayComment2

    case EDIT_COMMENT_SUCCESS:
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
