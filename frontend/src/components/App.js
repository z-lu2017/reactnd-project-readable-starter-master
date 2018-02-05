import React, { Component } from 'react';
import './App.css';
import List from './List'
import {Route} from 'react-router-dom';
import createPost from './createPost';
import editPost from './editPost';
import PostDetailView from './PostDetailView';

class App extends Component {
  render() {
    return (
      <div className="app">
      <Route exact path='/' component={List}/>
      <Route exact path='/new' component={createPost}/>
      <Route path='/:category/:id' component={PostDetailView}/>
      <Route exact path='/:id' component={editPost}/>
      </div>
    );
  }
}


export default App
