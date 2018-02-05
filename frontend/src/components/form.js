import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { Link } from 'react-router-dom';

let NewForm = props => {
  const { handleSubmit } = props
  return <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="Title">Title</label>
        <Field name="title" component="input" type="text" required="required" />
      </div>
      <div>
        <label htmlFor="Author">Author</label>
        <Field name="author" component="input" type="text" required="required" />
      </div>
      <div>
        <label htmlFor="Content">Content</label>
        <Field name="content" component="input" type="text" required="required" />
      </div>
      <div>
          <label>Cateogry</label>
          <div>
            <Field name="category" component="select" required="required">
              <option></option>
              <option value="react">React</option>
              <option value="redux">Redux</option>
              <option value="udacity">Udacity</option>
            </Field>
          </div>
        </div>
      <button type="submit">Submit</button>
    </form>
}

NewForm = reduxForm({
  form: 'createPost'
})(NewForm)

export default NewForm
