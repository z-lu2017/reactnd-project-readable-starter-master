import React, { Component } from 'react';
import {deletePosts, upvotePost, downvotePost, signalID } from '../actions';
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
    this.props.boundDeletePosts(post)
  }

  handleUpvote(post){
    this.props.boundUpVote(post)
  }

  handleDownvote(post){
    this.props.boundDownVote(post)
  }

  handleClickEdit(id){
    this.props.boundSignalID(id);
  }

  detailView(post){
    this.setState({fireRedirect: true})
  }

  render() {
    if(this.props.post.timestamp){var date = new Date(this.props.post.timestamp).toString()}
    return (
      <div className="post">
        <div className="info">
          <h2>{this.props.post.title}</h2>
          <h3>created by {this.props.post.author} on {date}. Category: {this.props.post.category}</h3>
          <h3>Number of comments: {this.props.post.commentCount}</h3>
        </div>
        <div className="edit">
          <button onClick={()=>{this.detailView(this.props.post)}}>View Detail</button>
          <Link to={`/edit`} params={{ id: this.props.post.id }}><button onClick={()=>{this.handleClickEdit(this.props.post.id)}}>Edit</button></Link>
          <button onClick={()=>{this.handleDelete(this.props.post)}}>Delete</button>
        </div>
        <div className="vote">
          {
            this.props.post.voteScore>0 ?
            <h3>So far {this.props.post.voteScore} people have upvoted this post!</h3>
            :<h3>So far {-this.props.post.voteScore} people have downvoted this post!</h3>
          }
          <button onClick={()=>{this.handleUpvote(this.props.post)}}>Upvote</button>
          <button onClick={()=>{this.handleDownvote(this.props.post)}}>Downvote</button>
        </div>
        {this.state.fireRedirect && (
          <Redirect to={'/' + this.props.post.category + '/'+this.props.post.id}/>
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
    boundDeletePosts: (post) => dispatch(deletePosts(post)),
    boundUpVote: (post) => dispatch(upvotePost(post)),
    boundDownVote: (post) => dispatch(downvotePost(post)),
    boundSignalID: (id) => dispatch(signalID(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(Post)
