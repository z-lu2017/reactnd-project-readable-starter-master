import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'
import { load as loadAccount } from '../actions'

let InitializeFromStateForm = props => {
  const { handleSubmit, load, pristine, reset, submitting } = props
  console.log("thisprops", props)
  return (
    <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="Title">Title</label>
          <Field name="title" component="input" type="text" defaultValue={props.data.title} />
        </div>
        <div>
          <label htmlFor="Author">Author</label>
          <Field name="author" component="input" type="text" defaultValue={props.data.author}/>
        </div>
        <div>
          <label htmlFor="Content">Content</label>
          <Field name="content" component="input" type="text" defaultValue={props.data.body}/>
        </div>
        <div>
            <label>Cateogry</label>
            <div>
              <Field name="category" component="select" selected={props.data.cateogry}>
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

// You have to connect() to any reducers that you wish to connect to yourself
InitializeFromStateForm = connect(
  state => ({
    initialValues: state.data // pull initial values from account reducer
  }),
  { load: loadAccount } // bind account loading action creator
)(InitializeFromStateForm)

export default InitializeFromStateForm
