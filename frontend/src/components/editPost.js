import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
import InitializeFromStateForm from './InitializeFromStateForm';
import {editPosts} from '../actions/postReducers';

class editPost extends Component {
  constructor(){
    super();
    this.state = {
      fireRedirect: false
    }
  }

  handleClick(){
    var that = this;
    var title = document.getElementById('title').value;
    var category = document.getElementById('category').value;
    var body = document.getElementById('body').value;
    var author = document.getElementById('author').value;
    var id = this.props.posts.reducers.index;
    var obj = this.props.posts.reducers.posts.filter(function(p){return p.id === id})[0];
    obj.title = title;
    obj.body = body;
    obj.author = author;
    obj.category = category;
    that.props.boundEditPost(obj)
    that.setState({fireRedirect: true})
  }

  render() {
    var that = this
    return (
      <div>
        <InitializeFromStateForm onSubmit={()=>{that.handleClick()}}/>
        {this.state.fireRedirect && (
          <Redirect to={'/'}/>
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
    boundEditPost: (p) => dispatch(editPosts(p))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(editPost)
