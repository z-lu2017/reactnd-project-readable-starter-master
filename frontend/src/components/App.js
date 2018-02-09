import React, { Component } from 'react';
import './App.css';
import List from './List'
import {Route} from 'react-router-dom';
import createPost from './createPost';
import editPost from './editPost';
import PostDetailView from './PostDetailView';
import categoryView from './categoryView';

class App extends Component {
  render() {
    return (
      <div className="app">
      <Route exact path='/' component={List}/>
      <Route exact path='/new/post/create' component={createPost}/>
      <Route exact path='/:category/:id' component={PostDetailView}/>
      <Route exact path='/edit' component={editPost}/>
      <Route exact path='/views/posts/:category' component={categoryView}/>
      </div>
    );
  }
}


export default App
