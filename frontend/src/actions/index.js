export const ADD_POST = "ADD_POST"
export const EDIT_POST = "EDIT_POST"
export const ADD_COMMENT = "ADD_COMMENT"
export const EDIT_COMMENT = "EDIT_COMMENT"
export const DELETE_POST = "DELETE_POST"
export const DELETE_COMMENT = "DELETE_COMMENT"
export const UPVOTE = "UPVOTE"
export const DOWNVOTE = "DOWNVOTE"

export function addPost (post){
  return {
    type: ADD_POST,
    post
  }
}

export function editPost({ pre, post}){
  return {
    type: EDIT_POST,
    pre,
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

export function upvote({post}){
  return {
    type: UPVOTE,
    post
  }
}

export function downvote({post}){
  return {
    type: DOWNVOTE,
    post
  }
}
