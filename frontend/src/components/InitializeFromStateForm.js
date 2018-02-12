import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { load as loadAccount } from '../actions'
import './InitializeFromStateForm.css'

let InitializeFromStateForm = props => {
  const { handleSubmit, load, pristine, reset, submitting } = props
  return (
    <form onSubmit={handleSubmit}>
        <div className="input">
          <label htmlFor="Title">Title</label>
          <Field name="title" component="input" type="text"  id="title"/>
        </div>
        <div className="input">
          <label htmlFor="Author">Author</label>
          <Field name="author" component="input" type="text" id="author"/>
        </div>
        <div className="input">
          <label htmlFor="Body">Content</label>
          <Field name="body" component="input" type="text" id="body"/>
        </div>
        <div className="select input">
            <label className="Category">Cateogry</label>
            <div className="dropdown">
              <Field name="category" component="select" id="category">
                <option></option>
                <option value="react">React</option>
                <option value="redux">Redux</option>
                <option value="udacity">Udacity</option>
              </Field>
            </div>
          </div>
        <button type="submit" className="btn">Submit</button>
      </form>
  )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'initializeFromState' // a unique identifier for this form
})(InitializeFromStateForm)

function mapStateToProps(posts){
  return {
    posts: posts,
    initialValues: posts.reducers.posts.filter(function(p){return p.id === posts.reducers.index})[0]
  }
}

export default connect(mapStateToProps)(InitializeFromStateForm)
