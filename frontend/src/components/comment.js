import React, { Component } from 'react';
import {deleteComments, upvoteComments, downvoteComments} from '../actions/commentReducers';
import {fetchSinglePost} from '../actions/postReducers';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';


class Comment extends Component {
  componentDidMount(){
    this.props.boundFetchSinglePost(this.props.comment.parentId)
  }

  handleUpvote(comment){
    this.props.boundUpvoteComment(comment)
  }

  handleDownvote(comment){
    this.props.boundDownvoteComment(comment)
  }

  handleDelete(comment){
    console.log("what is comment selecte", comment)
    this.props.boundDeleteComments(comment)
  }

  render() {
    var c = this.props.comment
    var parent = this.props.comments.reducers.singlePost
    return (
      <div className="comment" >
          <div className="body">
              {c.author} on {new Date(c.timestamp).toString()} said {c.body}
          </div>
          <div className="vote">
            {
              c.voteScore>0 ?
              <h3>So far {c.voteScore} people have upvoted this comment!</h3>
              :<h3>So far {-c.voteScore} people have downvoted this comment!</h3>
            }
            <button onClick={()=>{this.handleUpvote(c)}}>Upvote Comment</button>
            <button onClick={()=>{this.handleDownvote(c)}}>Downvote Comment</button>
          </div>
          <div className="edit">
            <Link to={{pathname: `/edit/comments/${c.id}`, query:{id: parent.id, category: parent.category}}}><button>Edit</button></Link>
            <button onClick={()=>{this.handleDelete(c)}}>Delete Comment</button>
          </div>
      </div>
    )}
}

function mapStateToProps(comments, posts, singlePost){
  return {
    comments: comments,
    posts: posts,
    singlePost: singlePost
  }
}

function mapDispatchToProps (dispatch) {
  return {
    boundDeleteComments: (comment) => dispatch(deleteComments(comment)),
    boundUpvoteComment: (comment) => dispatch(upvoteComments(comment)),
    boundDownvoteComment: (comment) => dispatch(downvoteComments(comment)),
    boundFetchSinglePost: (id) => dispatch(fetchSinglePost(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
