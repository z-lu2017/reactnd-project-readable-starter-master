import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {deletePosts, upvotePost, downvotePost, signalID } from '../actions';
import { Redirect } from 'react-router';

class PostDetailView extends Component {
  constructor(){
    super();
    this.state = {
      fireRedirect: false
    }
  }

  handleClickEdit(id){
    this.props.boundSignalID(id);
  }

  handleDelete(post){
    this.props.boundDeletePosts(post);
    this.setState({fireRedirect: true})
  }

  handleUpvote(post){
    this.props.boundUpVote(post)
  }

  handleDownvote(post){
    this.props.boundDownVote(post)
  }


  render() {
    var id = this.props.match.params.id;
    var obj = this.props.posts.reducers.posts.filter((p)=>{return p.id === id})[0];
    var date = new Date(obj.timestamp).toString()
    return (
      <div className="post">
        <div className="info">
          <h2>{obj.title}</h2>
          <h3>created by {obj.author} on {date}. Category: {obj.category}</h3>
          <h3>Number of comments</h3>
        </div>
        <div className="body">
          <p>{obj.body}</p>
        </div>
        <div className="edit">
          <Link to={`/edit`}><button onClick={()=>{this.handleClickEdit(obj.id)}}>Edit</button></Link>
          <button onClick={()=>{this.handleDelete(obj)}}>Delete</button>
        </div>
        <div className="vote">
          {
            obj.voteScore>0 ?
            <h3>So far {obj.voteScore} people have upvoted this post!</h3>
            :<h3>So far {-obj.voteScore} people have downvoted this post!</h3>
          }
          <button onClick={()=>{this.handleUpvote(obj)}}>Upvote</button>
          <button onClick={()=>{this.handleDownvote(obj)}}>Downvote</button>
        </div>
        <div className="back">
          <button><Link to={{pathname: '/'}}>Back to post wall</Link></button>
        </div>
        {this.state.fireRedirect && (
          <Redirect to={'/'}/>
        )}
      </div>
    );
  }
}

function mapStateToProps(posts){
  return {
    posts: posts
  }
}

function mapDispatchToProps (dispatch) {
  return {
    boundSignalID: (id) => dispatch(signalID(id)),
    boundDeletePosts: (post) => dispatch(deletePosts(post)),
    boundUpVote: (post) => dispatch(upvotePost(post)),
    boundDownVote: (post) => dispatch(downvotePost(post))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView)
