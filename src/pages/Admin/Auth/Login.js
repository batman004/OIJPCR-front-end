import { useFormFields } from './FormHooks'
import { useContext, useState } from 'react'
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
import { useToast } from '../../../components/utils/Toast'

const Login = () => {
  const { token, setToken, setUsername } = useContext(UserContext)
  const { showToast } = useToast()

  const [fields, handleFieldChange] = useFormFields({
    username: '',
    password: '',
  })
  const [error, setError] = useState('')

  const handleSubmit = async (evt) => {
    evt.preventDefault()
    setError('')
    const url = `${config.host}/admin/login`

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

    try {
      const { data } = await axios.post(url, { ...formData }, headerConfig)
      const newToken = data?.token
      if (!newToken) {
        setError('Login did not return a session. Try again.')
        return
      }
      localStorage.setItem('jwt', newToken)
      setToken(newToken)
      setUsername(data.username || '')
      showToast({
        message: data.username
          ? `Logged in successfully. Welcome back, ${data.username}!`
          : 'Logged in successfully.',
      })
    } catch (err) {
      setError(err.response?.data?.message || 'Incorrect username or password')
    }
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
        {error && (
          <p className="mt-6 text-base font-semibold text-red-600" role="alert">
            {error}
          </p>
        )}
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