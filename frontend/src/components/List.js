import React, { Component } from 'react';
import {connect} from 'react-redux';
import Post from './Post';
import { Link } from 'react-router-dom'
import {addPost} from '../actions';

class List extends Component {
  render() {
    return (
      <div className="listView">
      <div className="list">
        <h2>Posts Board</h2>
        <div className="postsList">
          <ol className="posts">
          {
            this.props.posts.length>0 ?
            this.props.posts.map( (post) => (
              <li>
              <Post title={post.title} key={post.title}/>
              </li>
            ))
            :<h3>No one has posted anything yet :( </h3>
          }
          </ol>
        </div>
      </div>
      <div className="newPost">
        <button><Link to={{pathname: '/new'}}>Create a post</Link></button>
        {/* <button className="addPost" onClick={()=>{this.props.boundAddPost({title: "trying first post", author: "zzz"})}}>Add a post</button> */}
      </div>
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
    boundAddPost: (post) => dispatch(addPost(post))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
