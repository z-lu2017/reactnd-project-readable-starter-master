import React from 'react'
import { Field, reduxForm } from 'redux-form'
import './form.css'

let NewForm = props => {
  const { handleSubmit } = props
  return <form onSubmit={handleSubmit}>
      <div className="input">
        <label htmlFor="Title">Title</label>
        <Field name="title" component="input" type="text" required="required" />
      </div>
      <div className="input">
        <label htmlFor="Author">Author</label>
        <Field name="author" component="input" type="text" required="required" />
      </div>
      <div className="input">
        <label htmlFor="Content">Content</label>
        <Field name="content" component="textarea" type="text" required="required" />
      </div>
      <div className="select input">
          <label className="Category">Cateogry</label>
          <div className="dropdown">
            <Field name="category" component="select" required="required">
              <option></option>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </Field>
          </div>
        </div>
      <button type="submit" className="btn">Submit</button>
    </form>
}

NewForm = reduxForm({
  form: 'createPost'
})(NewForm)

export default NewForm
