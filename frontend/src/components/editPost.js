import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
import { load as loadAccount } from '../actions';
import { Field, reduxForm } from 'redux-form';
import InitializeFromStateForm from './InitializeFromStateForm';

class editPost extends Component {
  constructor(){
    super();
    this.state = {
      fireRedirect: false,
      data: {}
    }
  }

  componentDidMount(){
    var that = this;
    var id = this.props.match.params.id;
    fetch('http://localhost:3001/posts/'+id, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'whatever-you-want'
      }
    }).then(function(resp){
      resp.json().then(function(data){
        that.setState({data: data})
      })
    }).catch(function(error) {
        console.log("error", error);
    });
  }

  handleClick(e){
    e.preventDefault();
    var that = this;
    var title = document.getElementById('title').value;
    var category = document.getElementById('category').value;
    var body = document.getElementById('body').value;
    var author = document.getElementById('author').value;
    var id = this.guid();
    var voteScore = 1;
    var deleted = false;
    var timeStamp = Date.now();
    console.log("when creating post", timeStamp)
    fetch('http://localhost:3001/posts', {
      method: 'POST',
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
        <InitializeFromStateForm onSubmit={that.submit} data={that.state.data}/>
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

export default connect(mapStateToProps)(editPost)
