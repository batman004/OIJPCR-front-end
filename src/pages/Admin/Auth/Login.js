import { useFormFields } from './FormHooks'
import { useContext } from 'react'
import axios from 'axios'
import config from '../../../config/config'
import {
  FormContainer,
  FormHeading,
  FormField,
  Form, FormButton,
} from './Form'
import { Link, Redirect } from 'react-router-dom'
import { UserContext } from '../../../UserContext'

const Login = () => {
  const { token, setToken } = useContext(UserContext)

  const [fields, handleFieldChange] = useFormFields({
    username: '',
    password: '',
  })

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    const url = `${config.host}admin/login`

    const formData = {
      username: fields.username,
      password: fields.password,
    }

    const headerConfig = {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(url, { ...formData }, headerConfig)

    const newToken = data?.token
    localStorage.setItem('jwt', newToken)
    setToken(newToken)
  }

  if (token) {
    return <Redirect to="/admin"/>
  }

  return (
    <FormContainer>
      <FormHeading heading="Login"/>
      <Form handleSubmit={handleSubmit}>
        <FormField
          id="username"
          label="Username"
          type="text"
          value={fields.username}
          name="username"
          handleFieldChange={handleFieldChange}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          value={fields.password}
          name="password"
          handleFieldChange={handleFieldChange}
        />
        <FormButton text="Submit"/>

        <div className="mt-12 text-center md:mt-0 md:text-left">
        <Link to="/signup" className="text-indigo-700 underline">
          Not a user? Sign Up here
        </Link>
        </div>
      </Form>
    </FormContainer>
  )
}

export default Login