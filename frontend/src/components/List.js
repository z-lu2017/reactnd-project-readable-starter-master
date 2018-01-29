import React, { Component } from 'react';
import {connect} from 'react-redux';
import Post from './Post';
import { Link } from 'react-router-dom'
import {addPost, fetchPostRequest, fetchPostSuccess} from '../actions';

class List extends Component {
  constructor(){
    super();
  }

  componentWillMount(){
    this.props.boundFetchPostRequest();
    console.log("after fetchpost", this.props)
  }

  componentDidMount(){
    this.props.boundFetchPostSuccess();
    console.log("after fetch success in did mount", this.props)
  }

  render() {
    console.log("what is props", this.props)
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
    boundAddPost: (post) => dispatch(addPost(post)),
    boundFetchPostRequest: ()=> dispatch(fetchPostRequest()),
    boundFetchPostSuccess: ()=> dispatch(fetchPostSuccess())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
