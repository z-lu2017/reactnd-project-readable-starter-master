import React, { Component } from 'react';
import './App.css';
import List from './List'
import {Route} from 'react-router-dom';
import createPost from './createPost';
import editPost from './editPost';
import Category_List from './Category_List';

class App extends Component {
  render() {
    return (
      <div className="app">
      <Route exact path='/' component={List}/>
      <Route path='/new' component={createPost}/>
      <Route path='/edit/:id' component={editPost}/>
      </div>
    );
  }
}


export default App
