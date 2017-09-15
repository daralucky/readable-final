import React from 'react'
import { Field, reduxForm } from 'redux-form'
import { MyInputGroup, MyTextAreaGroup, MySelectGroup, MySubmitButtonGroup } from '../utils/MyUIComponents'

const required = value => (value ? undefined : 'Required')
const maxLength = max => value =>
  value && value.length > max ? `Must be ${max} characters or less` : undefined
const maxLength15 = maxLength(15)
const maxLength70 = maxLength(70)

export const minLength = min => value =>
  value && value.length < min ? `Must be ${min} characters or more` : undefined
export const minLength2 = minLength(2)
export const minLength5 = minLength(5)

const alphaNumeric = value =>
  value && /[^a-zA-Z0-9 ]/i.test(value)
    ? 'Only alphanumeric characters'
    : undefined

const AddNewPostForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props

  const myOptions = [
    { value: '1', text: 'My Text 01' },
    { value: '2', text: 'My Text 03' },
    { value: '3', text: 'My Text 03' },
  ]

  return (
    <form onSubmit={handleSubmit} className="form-horizontal">

      <Field
        isHorizontal={true}
        name="title"
        type="text"
        component={MyInputGroup}
        label="Title"
        validate={[required, maxLength70, minLength2]}
        warn={alphaNumeric}
      />

      <Field
        isHorizontal={true}
        name="body"
        component={MyTextAreaGroup}
        row='5'
        label="Body"
        validate={[required, minLength5]}
      />

      <Field
        isHorizontal={true}
        name="author"
        type="text"
        component={MyInputGroup}
        label="Author"
        validate={[required, maxLength15, minLength2]}
        warn={alphaNumeric}
      />

      <Field
        isHorizontal={true}
        name="category"
        component={MySelectGroup}
        options={myOptions}
        label="Category"
        validate={[required]}
      />

      <MySubmitButtonGroup submitting={submitting} pristine={pristine} reset={reset} />

    </form>
  )
}

export default reduxForm({
  form: 'addNewPost' // a unique identifier for this form
})(AddNewPostForm)
