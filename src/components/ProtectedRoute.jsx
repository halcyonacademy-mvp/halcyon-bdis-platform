import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { supabase } from '../services/supabase'

export default function ProtectedRoute({ children }) {

  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {

    supabase.auth.getSession().then(({ data }) => {

      setSession(data.session)
      setLoading(false)

    })

  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace />
  }

  return children
}