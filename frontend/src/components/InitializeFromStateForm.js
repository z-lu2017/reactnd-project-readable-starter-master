import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { load as loadAccount } from '../actions'

let InitializeFromStateForm = props => {
  const { handleSubmit, load, pristine, reset, submitting } = props
  console.log("props", props)
  return (
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Title">Title</label>
          <Field name="title" component="input" type="text"  />
        </div>
        <div>
          <label htmlFor="Author">Author</label>
          <Field name="author" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="Body">Content</label>
          <Field name="body" component="input" type="text"/>
        </div>
        <div>
            <label>Cateogry</label>
            <div>
              <Field name="category" component="select" >
                <option></option>
                <option value="react">React</option>
                <option value="redux">Redux</option>
                <option value="udacity">Udacity</option>
              </Field>
            </div>
          </div>
        <button type="submit">Submit</button>
      </form>
  )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
InitializeFromStateForm = reduxForm({
  form: 'initializeFromState' // a unique identifier for this form
})(InitializeFromStateForm)

function mapStateToProps(posts){
  //TODO: GRAB ID OF THE SELECTED OBJECT AND SET INNITIALVALUES TO FILTERED OUT OBJECT
  console.log("state", posts)
  return {
    posts: posts,
    initialValues: posts.reducers.posts[1]
  }
}

export default connect(mapStateToProps)(InitializeFromStateForm)
