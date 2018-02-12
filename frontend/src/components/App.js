import React, { Component } from 'react';
import './App.css';
import List from './List'
import {Route} from 'react-router-dom';
import createPost from './createPost';
import editPost from './editPost';
import PostDetailView from './PostDetailView';
import categoryView from './categoryView';
import createComment from './createComment';
import editComment from './editComment';

class App extends Component {
  render() {
    return (
      <div className="app">
      <Route exact path='/' component={List}/>
      <Route exact path='/new/post/create' component={createPost}/>
      <Route exact path='/:category/:id' component={PostDetailView}/>
      <Route exact path='/edit/post/:id' component={editPost}/>
      <Route exact path='/:category' component={categoryView}/>
      <Route exact path='/new/comment/create' component={createComment}/>
      <Route exact path='/edit/comments/:id' component={editComment}/>
      </div>
    );
  }
}


export default App
