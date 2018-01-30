import React, { Component } from 'react';

class Post extends Component {
  handleEdit(){

  }

  handleDelete(){

  }

  handleUpvote(){

  }

  handleDownvote(){

  }

  render() {
    if(this.props.timeStamp){var date = new Date(this.props.timeStamp).toString()}
    return (
      <div className="post">
        <div className="info">
          <h2>{this.props.title}</h2>
          <h3>created by {this.props.author} on {date}. Category: {this.props.cateogry}</h3>
        </div>
        <div className="content">
          <p> {this.props.body}</p>
        </div>
        <div className="edit">
          <button>Edit</button>
          <button>Delete</button>
        </div>
        <div className="vote">
          {
            this.props.voteScore>0 ?
            <h3>So far {this.props.voteScore} people have upvoted this post!</h3>
            :<h3>So far {-this.props.voteScore} people have downvoted this post!</h3>
          }
          <button>Upvote</button>
          <button>Downvote</button>
        </div>
      </div>
    )}
}

export default Post
