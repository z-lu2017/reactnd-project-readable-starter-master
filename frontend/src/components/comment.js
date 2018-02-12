import React, { Component } from 'react';
import {deleteComments, upvoteComments, downvoteComments} from '../actions';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';


class Comment extends Component {
  handleUpvote(comment){
    this.props.boundUpvoteComment(comment)
  }

  handleDownvote(comment){
    this.props.boundDownvoteComment(comment)
  }

  handleDelete(comment){
    this.props.boundDeleteComments(comment)
  }

  render() {
    var c = this.props.comment
    var id = c.parentId;
    var posts = this.props.comments.reducers.posts
    var parent = posts.filter(function(p){return p.id === id})[0]
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

function mapStateToProps(comments, posts){
  return {
    comments: comments,
    posts: posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    boundDeleteComments: (comment) => dispatch(deleteComments(comment)),
    boundUpvoteComment: (comment) => dispatch(upvoteComments(comment)),
    boundDownvoteComment: (comment) => dispatch(downvoteComments(comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Comment)
