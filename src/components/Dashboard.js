import React from 'react';
import { Formik } from 'formik';

export default function Dashboard(props) {
return(
    <div className="Register">
        <h1>Add a new product</h1>
    <Formik
      initialValues={{ url: '' }}
      validate={values => {
        const errors = {};
        if (!values.url ) {
          errors.url = 'Required';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form className="form" onSubmit={handleSubmit}>
            <span>{errors.url && touched.url && errors.url}</span>
          <input
            placeholder={"Product URL"}
            type="url"
            name="url"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.url}
          />
          
          
          <button type="submit" disabled={isSubmitting}>
            Add
          </button>
        </form>
      )}
    </Formik>
  </div>
)
}