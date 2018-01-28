import React, { Component } from 'react';
import './App.css';
import List from './List'
import {Route} from 'react-router-dom';
import createPost from './createPost';

class App extends Component {
  render() {
    return (
      <div className="app">
      <Route exact path='/' component={List}/>
      <Route path='/new' component={createPost}/>
      </div>
    );
  }
}


export default App
