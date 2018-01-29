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
  const { post, pre } = action

  switch (action.type){
    case FETCH_POST_REQUEST:
      fetch('http://localhost:3001/posts', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'whatever-you-want'
        },
      }).then(function(resp){
          resp.json().then(function(data){
            var returnState = data
            console.log("what is returnstate", returnState)
            return returnState
          })
      }).catch(function(error) {
          console.log("error", error);
      });
    case FETCH_POST_SUCCESS:
      console.log("what is state ?", state)
      return state;
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
