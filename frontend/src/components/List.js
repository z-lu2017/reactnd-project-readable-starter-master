import React, { Component } from 'react';
import {connect} from 'react-redux';
import Post from './Post';
import { Link } from 'react-router-dom'
import {addPost, fetchPosts} from '../actions';

class List extends Component {
  constructor(){
    super();
  }

  componentDidMount(){
    this.props.boundFetchPosts()
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
            this.props.posts.reducers.length>0 ?
            this.props.posts.reducers.map( (post) => (
              <li>
              <Post title={post.title} key={post.title} author={post.author} timeStamp={post.timeStamp} cateogry={post.category} body={post.body} voteScore={post.voteScore}/>
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
    boundFetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
