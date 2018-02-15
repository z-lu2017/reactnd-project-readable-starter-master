import React, { Component } from 'react';
import { Redirect } from 'react-router';
import {addComments} from '../actions';
import {connect} from 'react-redux';


class createComment extends Component {
  constructor(){
    super();
    this.state = {
      fireRedirect: false
    }
  }

  submit(values){
    var author = document.getElementById('author').value;
    var body = document.getElementById('body').value;
    var id = this.guid();
    var voteScore = 1;
    var deleted = false;
    var parentDeleted = false;
    var timestamp = Date.now();
    this.props.boundAddComment({
      author: author,
      body: body,
      id: id,
      voteScore: voteScore,
      deleted: deleted,
      timestamp: timestamp,
      parentId: this.props.location.query.id,
      parentDeleted: parentDeleted
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
        <form onSubmit={this.submit.bind(this)}>
            <div>
              <label htmlFor="Author">Author</label>
              <input name="author" component="input" type="text" id="author" required />
            </div>
            <div>
              <label htmlFor="Body">Content</label>
              <input name="body" component="input" type="text" id="body" required />
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
    boundAddComment: (comment) => dispatch(addComments(comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(createComment)
