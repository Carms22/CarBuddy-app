import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../../contexts/AuthContext"
import { userLogin } from "../../services/AuthService";
import LoginSchema from "./LoginSchema";
import Input from "../../components/misc/Input";


function Login() {

  const { state } = useLocation()
  const { login } = useContext(AuthContext)

  const INITIAL_VALUES = {
    email: (state && state.email) || '',
    password: ''
  }

  const {
    values, handleChange, handleBlur, handleSubmit, errors,
    isSubmitting, setSubmitting, resetForm
  } = useFormik({
    initialValues: INITIAL_VALUES,
    onSubmit: onSubmit,
    validationSchema: LoginSchema,
    validateOnBlur: false,
    validateOnChange: false,
  })
  const navigate = useNavigate();
  
  function onSubmit(values) {
    console.log("estoy en onSubmit");
    userLogin(values)
      .then( ({accessToken}) => {
        console.log("estoy en then userLogin");
        login(accessToken)
        setSubmitting(false)
        resetForm()
        navigate('/profile')
      })
      // .catch(err => {
      //   console.log(err.response.data)

      //   err.response.data &&
      //     Object.keys(err.response.data.errors)
      //       .forEach((errorKey) => {
      //         setFieldError(errorKey, err.response.data.errors[errorKey])
      //       })
      // })
      // .finally(() => {
      //   setSubmitting(false)
      // })

    console.log(values);
  }

  return ( 
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit} >
      <Input
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
   );
}

export default Login;