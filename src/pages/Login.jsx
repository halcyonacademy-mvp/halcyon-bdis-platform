import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

import { supabase } from '../services/supabase'

export default function Login() {

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')

  async function handleLogin(e) {

    e.preventDefault()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {

      setError(error.message)

    } else {

      navigate('/dashboard')
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">

        <div className="bg-white rounded-2xl shadow-xl p-10 w-full max-w-md">

          <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
            BDIS Login
          </h1>

          <form
            onSubmit={handleLogin}
            className="space-y-5"
          >

            <div>

              <label className="block mb-2 font-medium">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="w-full border rounded-xl p-3"
                required
              />

            </div>

            <div>

              <label className="block mb-2 font-medium">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                className="w-full border rounded-xl p-3"
                required
              />

            </div>

            {error && (
              <p className="text-red-600 text-sm">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white py-3 rounded-xl"
            >
              Login
            </button>

          </form>
        </div>
      </div>

      <Footer />
    </>
  )
}