import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class createPost extends Component {
  constructor(){
    super();
    this.state = {
      fireRedirect: false
    }
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
      <div className="newPost">
        <div className="input">
          <form action="/posts" method="post">
            <label>Title: </label>
            <input type="text" id="title" name="title"></input>
            <br/>
            <label>Select a Category: </label>
            <select id="category">
              <option value="Art">Art</option>
              <option value="Business">Business</option>
              <option value="Financial">Financial</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="PersonalCare">Personal Care</option>
            </select>
            <br/>
            <label>Author: </label>
            <input type="text" id="author" name="author"></input>
            <br/>
            <label>Content </label>
            <textarea rows="5" cols="20" id="body"></textarea>
            <br/>
            <button type="button" onClick={(e)=>{this.handleClick(e)}}>Submit</button>
          </form>
        </div>
        <div className="goBack">
          <button><Link to={{pathname: '/'}}>Go back to the post board</Link></button>
        </div>
        {this.state.fireRedirect && (
          <Redirect to={'/'}/>
        )}
      </div>
    )}
}

export default createPost;
