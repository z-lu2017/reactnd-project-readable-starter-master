import React, { Component } from 'react';
import { Redirect } from 'react-router';
import NewForm from './form';
import {addPosts} from '../actions/postReducers';
import {connect} from 'react-redux';


class createPost extends Component {
  constructor(){
    super();
    this.state = {
      fireRedirect: false
    }
    this.submit = this.submit.bind(this)
  }

  submit(values){
    var title = values.title;
    var author = values.author;
    var category = values.category;
    var body = values.content;
    var id = this.guid();
    var voteScore = 1;
    var deleted = false;
    var timestamp = Date.now();
    this.props.boundAddPosts({
      title: title,
      author: author,
      category: category,
      body: body,
      id: id,
      voteScore: voteScore,
      deleted: deleted,
      timestamp: timestamp,
      commentCount: 0
    })
    this.setState({fireRedirect: true})
  }

  guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  }

  render() {
    return (
      <div>
        <NewForm onSubmit={this.submit} />
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
    boundAddPosts: (p) => dispatch(addPosts(p))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(createPost)
