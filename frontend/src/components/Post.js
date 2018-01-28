import React, { Component } from 'react';

class Post extends Component {
  render() {
    return (
      <div className="post">
        <div className="info">
          <h2>{this.props.title}</h2>
          {/* <h3>created by {this.props.author} on {this.props.timeStamp}. Category: {this.props.cateogry}</h3> */}
        </div>
        <div className="content">
          {/* <p> {this.props.body}</p> */}
        </div>
        <div className="vote">
          {/* <h3>So far {this.props.voteScore} people have upvoted this post!</h3> */}
        </div>
      </div>
    )}
}

export default Post
