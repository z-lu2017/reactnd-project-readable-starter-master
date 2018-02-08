import React, { Component } from 'react';
import {connect} from 'react-redux';
import Post from './Post';
import { Link } from 'react-router-dom'
import {fetchPosts} from '../actions';

class List extends Component {

  componentDidMount(){
    this.props.boundFetchPosts()
  }

  sortDate(){

  }

  render() {
    return (
      <div className="listView">
      <div className="list">
        <h2>Posts Board</h2>
        <div className = "sortPanel">
          <button onClick={()=>{this.sortDate()}}>Sort by date</button>
          <button>Sort by vote score</button>
        </div>
        <div className = "categoryView">
          <div className="dropdown">
          <button className="dropbtn">Select Category</button>
          <div id="myDropdown" className="dropdown-content">
            <Link to="/react">Link 1</Link>
            <Link to='/redux'>Link 2</Link>
            {/* <Link to='/'>Link 3</Link> */}
          </div>
        </div>
        </div>
        <div className="postsList">
          <ol className="posts">
          {
            this.props.posts.reducers.posts.length>0 ?
            this.props.posts.reducers.posts.map( function(post) {
              if (!post.deleted){
                return (  <li key={post.id}>
                  <Post post={post}/>
                  </li>)
              }
            }
            )
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
    boundFetchPosts: () => dispatch(fetchPosts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(List)
