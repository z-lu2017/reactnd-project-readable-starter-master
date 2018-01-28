import {
  ADD_POST,
  EDIT_POST,
  DELETE_POST,
  ADD_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT,
  UPVOTE,
  DOWNVOTE
} from '../actions'

const initialBoardState = []

function postBoard(state = initialBoardState, action){
  const { post, pre } = action

  switch (action.type){
    case ADD_POST:
      console.log("before newstate what is post", post)
      var newAddState = state
      newAddState.push(post)
      console.log("After push", newAddState)
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
