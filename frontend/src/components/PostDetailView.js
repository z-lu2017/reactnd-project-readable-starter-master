import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {deletePosts, upvotePost, downvotePost, signalID,  fetchSinglePost } from '../actions/postReducers';
import {fetchComments} from '../actions/commentReducers'
import { Redirect } from 'react-router';
import Comment from './comment';

class PostDetailView extends Component {
  constructor(){
    super();
    this.state = {
      fireRedirect: false
    }
  }

  componentDidMount(){
    var id =this.props.match.params.id;
    this.props.boundFetchSinglePost(id);
    this.props.boundFetchComments(id);
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

  isEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
  }

  render() {
    console.log("what is detaillviwee",this.props)
    if (this.isEmpty(this.props.posts.reducers.singlePost)){
      return (<div className="404">
        <h2>OOPS! There is no post here :(</h2>
          <h3>Please use the link below to get back to main page</h3>
          <Link to={{pathname: `/`}}><button>Back to post wall</button></Link>
      </div>)
    }
    var obj = this.props.posts.reducers.singlePost;
    var date = new Date(obj.timestamp).toString();
    var comments = this.props.posts.reducers.comments
    return (
      <div className="post">
        <div className="info">
          <h2>{obj.title}</h2>
          <h3>created by {obj.author} on {date}. Category: {obj.category}</h3>
          <h3>Number of comments: {obj.commentCount}</h3>
        </div>
        <div className="body">
          <p>{obj.body}</p>
        </div>
        <div className="edit">
          <Link to={`/edit/post/${obj.id}`}><button onClick={()=>{this.handleClickEdit(obj.id)}}>Edit</button></Link>
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
        <div className="comments">
          <ol className="posts">
          {
            comments.length>0 ?
            comments.map( function(c) {
              if (!c.deleted){
                return (<li key={c.id}>
                  <Comment comment={c} parentId={obj.id}/>
                </li>)
              }
            }
            )
            :<h3>No one has posted any comment yet :( </h3>
          }
          </ol>
          <div className="newComment">
            <button><Link to={{pathname: '/new/comment/create', query:{id: obj.id, category: obj.category}}}>Add a comment</Link></button>
          </div>
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

function mapStateToProps(posts, comments, singlePost){
  return {
    posts: posts,
    comments: comments,
    singlePost: singlePost
  }
}

function mapDispatchToProps (dispatch) {
  return {
    boundSignalID: (id) => dispatch(signalID(id)),
    boundDeletePosts: (post) => dispatch(deletePosts(post)),
    boundUpVote: (post) => dispatch(upvotePost(post)),
    boundDownVote: (post) => dispatch(downvotePost(post)),
    boundFetchComments: (id) => dispatch(fetchComments(id)),
    boundFetchSinglePost: (id) => dispatch(fetchSinglePost(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView)
