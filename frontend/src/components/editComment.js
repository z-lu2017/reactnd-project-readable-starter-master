import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {connect} from 'react-redux';
import {editComments} from '../actions/commentReducers';

class editComment extends Component {
  constructor(){
    super();
    this.state = {
      fireRedirect: false
    }
  }

  handleSubmit(){
    var that = this;
    var body = document.getElementById('body').value;
    var author = document.getElementById('author').value;
    var id = this.props.match.params.id;
    var comments = this.props.comments.reducers.comments;
    var selected = comments.filter(function(c){return c.id === id})[0]
    selected.body = body;
    selected.id = id;
    selected.author = author;
    that.props.boundEditComment(selected)
    that.setState({fireRedirect: true})
  }

  render() {
    var id = this.props.match.params.id;
    var comments = this.props.comments.reducers.comments;
    var selected = comments.filter(function(c){return c.id === id})[0]
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
            <div>
              <label htmlFor="Author">Author</label>
              <input name="author" component="input" type="text" id="author" defaultValue={selected.author}/>
            </div>
            <div>
              <label htmlFor="Body">Content</label>
              <input name="body" component="input" type="text" id="body" defaultValue={selected.body}/>
            </div>
            <button type="submit">Submit</button>
          </form>
        {this.state.fireRedirect && (
          <Redirect to={`/${this.props.location.query.category}/${this.props.location.query.id}`}/>
        )}
      </div>
    )}
}

function mapStateToProps(comments){
  return {
    comments: comments
  }
}

function mapDispatchToProps (dispatch) {
  return {
    boundEditComment: (c) => dispatch(editComments(c))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(editComment)
