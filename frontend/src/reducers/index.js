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
