import * as Yup from 'yup';
import ERRORS from '../../constants/formErrors';

const LoginSchema = Yup.object().shape({
  name: Yup
    .string()
    .required(ERRORS.ERROR_REQUIRED),
  email: Yup
    .string()
    .email(ERRORS.ERROR_VALID_EMAIL)
    .required(ERRORS.ERROR_REQUIRED)
})

export default LoginSchema;