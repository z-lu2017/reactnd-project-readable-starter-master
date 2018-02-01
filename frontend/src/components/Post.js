import React, { Component } from 'react';
import {deletePost, upvote, downvote } from '../actions';
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';


class Post extends Component {
  constructor(){
    super();
    this.state = {
      fireRedirect: false
    }
  }


  handleDelete(post){
    var that = this;
    fetch('http://localhost:3001/posts/'+post.id, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'whatever-you-want'
      }
    }).then(function(resp){
      that.props.boundDeletePost(post)
    }).catch(function(error) {
        console.log("error", error);
    });
  }

  handleUpvote(post){
    var that = this;
    fetch('http://localhost:3001/posts/'+ post.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'whatever-you-want'
      },
      body:JSON.stringify({
        option: 'upVote'
      })
    }).then(function(resp){
        that.props.boundUpVote(post)
    }).catch(function(error) {
        console.log("error", error);
    });
  }

  handleDownvote(post){
    var that = this;
    fetch('http://localhost:3001/posts/'+ post.id, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'whatever-you-want'
      },
      body:JSON.stringify({
        option: 'downVote'
      })
    }).then(function(resp){
        that.props.boundDownVote(post)
    }).catch(function(error) {
        console.log("error", error);
    });
  }

  detailView(post){

  }

  render() {
    if(this.props.timeStamp){var date = new Date(this.props.timeStamp).toString()}
    return (
      <div className="post">
        <div className="info">
          <h2>{this.props.title}</h2>
          <h3>created by {this.props.author} on {date}. Category: {this.props.cateogry}</h3>
          <h3>Number of comments</h3>
        </div>
        <div className="edit">
          <button onClick={()=>{this.detailView(this.props.post)}}>View Detail</button>
          <Link to={`/edit/${this.props.post.id}`}><button>Edit</button></Link>
          <button onClick={()=>{this.handleDelete(this.props.post)}}>Delete</button>
        </div>
        <div className="vote">
          {
            this.props.voteScore>0 ?
            <h3>So far {this.props.voteScore} people have upvoted this post!</h3>
            :<h3>So far {-this.props.voteScore} people have downvoted this post!</h3>
          }
          <button onClick={()=>{this.handleUpvote(this.props.post)}}>Upvote</button>
          <button onClick={()=>{this.handleDownvote(this.props.post)}}>Downvote</button>
        </div>
        {this.state.fireRedirect && (
          <Redirect to={'/edit'}/>
        )}
      </div>
    )}
}

function mapStateToProps(posts){
  return {
    posts: posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    boundDeletePost: (post) => dispatch(deletePost(post)),
    boundUpVote: (post) => dispatch(upvote(post)),
    boundDownVote: (post) => dispatch(downvote(post))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)
