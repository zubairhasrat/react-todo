import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const AddNewTodoForm = ({ onAddTodo, customError }) => {
  const formik = useFormik({
    validateOnChange: false,
    validateOnBlur: false,
    initialValues: {
      todo: '',
    },
    validationSchema: Yup
      .object()
      .shape({
        todo: Yup.string()
          .min(3, 'Todo text is too short.')
          .max(20, 'Todo text is too long.')
          .required('Todo text is required.')
        }
      ),
    onSubmit: (values, { resetForm }) => {
      onAddTodo(values.todo);

      resetForm();
    },
  })

  const errorKeys = Object.keys(formik.errors);

  const aFormikError = errorKeys.length > 0 ? formik.errors[errorKeys[0]] : null;

  const error = customError || aFormikError

  return (
    <>
    <form onSubmit={formik.handleSubmit}>
      <input
        id="todo"
        name="todo"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.todo}
        autoComplete="off"
        placeholder="What needs to be done?"
      />
      <button type="submit">Add</button>
    </form>
    {error && <span>{error}</span>}
    </>
  )
};

export default React.memo(AddNewTodoForm);