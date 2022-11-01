import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext"
import { userLogin } from "../../services/AuthService";
import LoginSchema from "./LoginSchema";
import Input from "../../components/misc/Input";
import "./Login.scss";


function Login() {
  const { state } = useLocation()
  const { login } = useContext(AuthContext)

  const INITIAL_VALUES = {
    email: (state && state.email) || '',
    password: ''
  }
 
  const {
    values, handleChange, handleBlur, handleSubmit, errors,
    isSubmitting, setSubmitting, setFieldError
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onSubmit,
    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
  })
   
  const navigate = useNavigate();
  
  function onSubmit (values) {
      userLogin(values)
        .then(({ accessToken }) => {
          login(accessToken, () => {
            navigate('/profile')
          })
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
    <div className="Login">
      <div className="login-box">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}> 
          <Input className="login-input"
            label="Email"
            placeholder="Introduce your email"
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
              placeholder="Write your password"
              type="password"
              name="password"
              id="password"
              value={values.password}
              onChange={handleChange}
              error={errors.password}
              onBlur={handleBlur}
            />
          <button type="submit" className="btn btn-primary">
            {isSubmitting ? 'Loading' : 'Login'}
          </button>
        </form>
      </div>

    </div>
   );
}

export default Login;