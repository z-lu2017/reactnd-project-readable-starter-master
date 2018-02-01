import React, { Component } from 'react';
import { Redirect } from 'react-router';
import NewForm from './form';

class createPost extends Component {
  constructor(){
    super();
    this.state = {
      fireRedirect: false
    }
  }

  submit(values){
    var that = this;
    var title = values.title;
    var author = values.author;
    var category = values.category;
    var body = values.content;
    var id = that.guid();
    var voteScore = 1;
    var deleted = false;
    var timeStamp = Date.now();
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
        <NewForm onSubmit={this.submit.bind(this)} />
        {this.state.fireRedirect && (
          <Redirect to={'/'}/>
        )}
      </div>
    )}
}

export default createPost;
