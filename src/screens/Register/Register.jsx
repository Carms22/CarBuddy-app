import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/AuthService';
import Input from '../../components/misc/Input';
import RegisterSchema from './RegisterSchema'

const INITIAL_VALUES = {
  name: '',
  email: '',
  password: ''
}

function Register() {
  const {
    values, handleChange, handleBlur, handleSubmit, errors,
    isSubmitting, setSubmitting, setFieldError
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onSubmit,
    validationSchema: RegisterSchema,
    validateOnBlur: false,
    validateOnChange: false,
  })

  const navigate = useNavigate();

  function onSubmit(values) { 
    createUser(values)
      .then(user => {
        navigate('/login', { state: {
          email: values.email
        } })
      })
      .catch(err => {
        console.log(err.response.data)

        err.response.data &&
          Object.keys(err.response.data.errors)
            .forEach((errorKey) => {
              setFieldError(errorKey, err.response.data.errors[errorKey])
            })
      })
      .finally(() => {
        setSubmitting(false)
      })
  }


  return (
    <div className="container">
      <h1>Register</h1>

      <form onSubmit={handleSubmit}>
        <Input
          label="Name"
          placeholder="Add user name"
          name="name"
          id="name"
          value={values.name}
          onChange={handleChange}
          error={errors.name}
          onBlur={handleBlur} 
        />

        <Input
          label="Email"
          placeholder="Add email"
          type="email"
          name="email"
          id="email"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
          onBlur={handleBlur}
        />

        <Input
          label="Password"
          placeholder="Add password"
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password}
          onBlur={handleBlur}
        />

        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? 'Loading' : 'Submit'}
        </button>
      </form>
    </div>
  )
}

export default Register;