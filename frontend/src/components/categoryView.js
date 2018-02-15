import React, { Component } from 'react';
import {connect} from 'react-redux';
import Post from './Post';
import { Link } from 'react-router-dom'
import {fetchPosts} from '../actions/postReducers';

class categoryView extends Component {
  constructor(){
    super();
    this.state = {
      sortFunction: function(a, b){
        var title1 = a.title.toUpperCase()
        var title2 = b.title.toUpperCase()
        if (title1 < title2) {
          return -1;
        }
        if (title1 > title2) {
          return 1;
        }

        return 0;
      }
    }
  }

  componentDidMount(){
    this.props.boundFetchPosts()
  }

  sortDate(){
    this.setState({
      sortFunction: function(a, b){
        return a.timestamp - b.timestamp
      }
    })
  }

  sortScore(){
    this.setState({
      sortFunction: function(a, b){
        return a.voteScore - b.voteScore
      }
    })
  }


  render() {
    var category = this.props.match.params.category
    return (
      <div className="listView">
      <div className="list">
        <h2>Category: {category}</h2>
        <div className = "sortPanel">
          <button onClick={()=>{this.sortDate()}}>Sort by date</button>
          <button onClick={()=>{this.sortScore()}}>Sort by vote score</button>
        </div>
        <div className = "categoryView">
          <div className="dropdown">
            <button className="dropbtn">{category}</button>
            <div className="dropdown-content">
              <Link to='/react'>React</Link>
              <Link to='/redux'>Redux</Link>
              <Link to='/udacity'>Udacity</Link>
            </div>
          </div>
        </div>
        <div className="postsList">
          <ol className="posts">
          {
            this.props.posts.reducers.posts.filter(p => p.category === category).sort(this.state.sortFunction).length>0 ?
            this.props.posts.reducers.posts.filter(p => p.category === category).sort(this.state.sortFunction).map(function(post) {
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
      <div className="back">
        <button><Link to={{pathname: '/'}}>Back to post wall</Link></button>
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

export default connect(mapStateToProps, mapDispatchToProps)(categoryView)
