import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE,
  DOWNVOTE,
  FETCH_POST_REQUEST,
  FETCH_POST_SUCCESS
} from '../actions'

var initialBoardState = []

function postBoard(state = initialBoardState, action){
  const { post, pre, posts } = action

  switch (action.type){
    case FETCH_POST_SUCCESS:
      var returnState = state;
      returnState = returnState.concat(posts.filter(function (p) {
        return returnState.indexOf(p) < 0 })
      )
      return returnState;
    case ADD_POST:
      var newAddState = state
      newAddState.push(post)
      return newAddState
    case EDIT_POST:
      const newArray = state.posts.filter((p)=>{p !== pre})
      var newState2 = Object.assign({}, state)
      newState2.posts = newArray
      newState2.posts.push(post)
      return newState2
    case DELETE_POST:
      const newArray3 = state.posts.filter((p)=>{p !== post})
      var newState3 = Object.assign({}, state)
      newState3.posts = newArray
      return newState3
    default:
      return state
  }
}



export default postBoard
