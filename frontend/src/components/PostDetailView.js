import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { signalID } from '../actions';

class PostDetailView extends Component {
  handleClickEdit(id){
    this.props.boundSignalID(id);
  }

  render() {
    var id = this.props.match.params.id;
    var obj = this.props.posts.reducers.posts.filter((p)=>{return p.id === id})[0];
    var date = new Date(obj.timestamp).toString()
    console.log("inside render post detail", obj)
    return (
      <div className="post">
        <div className="info">
          <h2>{obj.title}</h2>
          <h3>created by {obj.author} on {date}. Category: {obj.category}</h3>
          <h3>Number of comments</h3>
        </div>
        <div className="body">
          <p>{obj.body}</p>
        </div>
        <div className="edit">
          {/* <Link to={`/edit/${this.props.post.id}`}><button onClick={()=>{this.handleClickEdit(this.props.post.id)}}>Edit</button></Link>
          <button onClick={()=>{this.handleDelete(this.props.post)}}>Delete</button> */}
        </div>
        <div className="vote">
          {
            obj.voteScore>0 ?
            <h3>So far {obj.voteScore} people have upvoted this post!</h3>
            :<h3>So far {-obj.voteScore} people have downvoted this post!</h3>
          }
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
    boundSignalID: (id) => dispatch(signalID(id))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostDetailView)
