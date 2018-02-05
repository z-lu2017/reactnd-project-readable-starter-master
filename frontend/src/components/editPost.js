import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
import { load as loadAccount } from '../actions';
import { Field, reduxForm } from 'redux-form';
import InitializeFromStateForm from './InitializeFromStateForm';
import {editPosts} from '../actions';

class editPost extends Component {
  constructor(){
    super();
    this.state = {
      fireRedirect: false,
      data: {}
    }
  }

  handleClick(){
    console.log("inclick")
    var that = this;
    var title = document.getElementById('title').value;
    var category = document.getElementById('category').value;
    var body = document.getElementById('body').value;
    var author = document.getElementById('author').value;
    var voteScore = this.state.data.voteScore;
    var deleted = false;
    var timeStamp = Date.now();
    var id = this.props.match.params.id;
    var obj = this.props.posts.reducers.posts.filter(function(p){return p.id === id})[0];
    obj.title = title;
    obj.body = body;
    obj.author = author;
    obj.category = category;
    that.props.boundEditPost(obj)
    fetch('http://localhost:3001/posts/' + id, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'whatever-you-want'
      },
      body: JSON.stringify({
        title: title,
        category: category,
        id: id,
        timestamp: timeStamp,
        body: body,
        author: author,
        voteScore: voteScore,
        deleted: deleted
      })
    }).then(function(resp){
        that.setState({fireRedirect: true})
    }).catch(function(error) {
        console.log("error", error);
    });
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
