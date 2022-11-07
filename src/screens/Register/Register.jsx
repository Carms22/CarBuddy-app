import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { createUser } from '../../services/AuthService';
import Input from '../../components/misc/Input';
import RegisterSchema from './RegisterSchema';
import '../../styles/partials/screens/Login.scss'

const INITIAL_VALUES = {
  name: '',
  email: '',
  password: '',
  image: ''
}

function Register() {
  const navigate = useNavigate();
  const {
    values, handleChange, handleBlur, handleSubmit, errors,
    isSubmitting, setSubmitting, setFieldError, setFieldValue
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onSubmit,
    validationSchema: RegisterSchema,
    validateOnBlur: false,
    validateOnChange: false,
  })


  function onSubmit(values) { 
    const formData = new FormData()

    for (let value in values) {
      formData.append(value, values[value])
    }
    createUser(formData)
      .then(user => {
        navigate('/login', { state: {
          email: values.email
        } })
      })
      .catch(err => {
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
    <div className="container Login">
      <div className="start-div">
        <div className="login-box">
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
              value={values.email.toLowerCase()}
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

            <Input
              label="File"
              placeholder="Add file"
              type="file"
              name="image"
              id="file"
              onChange={(e) => setFieldValue('image', e.target.files[0])}
              error={errors.image}
              onBlur={handleBlur}
            />

            <button type="submit" className="button" disabled={isSubmitting}>
              {isSubmitting ? 'Loading' : 'Submit'}
            </button>
          </form>
      </div>
      </div>
    </div>
  )
}

export default Register;