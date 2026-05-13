import { useState } from 'react'
import {
  Link,
  useNavigate,
} from 'react-router-dom'

import { Menu, X } from 'lucide-react'

import { supabase } from '../services/supabase'

export default function Navbar() {

  const navigate = useNavigate()

  const [mobileMenu, setMobileMenu] = useState(false)

  async function handleLogout() {

    await supabase.auth.signOut()

    navigate('/login')
  }

  return (
    <nav className="bg-blue-800 text-white shadow-lg">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}

        <div>

          <h1 className="text-2xl font-bold tracking-wide">
            HALCYON ACADEMY
          </h1>

          <p className="text-xs text-blue-200">
            Behavioural De-Escalation Intelligence System
          </p>

        </div>

        {/* DESKTOP MENU */}

        <div className="hidden md:flex items-center gap-6 text-sm md:text-base">

          <Link
            to="/"
            className="hover:text-blue-200 transition"
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="hover:text-blue-200 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/risk"
            className="hover:text-blue-200 transition"
          >
            Risk Assessment
          </Link>

          <Link
            to="/incident"
            className="hover:text-blue-200 transition"
          >
            Incident Reporting
          </Link>

          <Link
            to="/training"
            className="hover:text-blue-200 transition"
          >
            Training
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-xl transition"
          >
            Logout
          </button>

        </div>

        {/* MOBILE BUTTON */}

        <button
          className="md:hidden"
          onClick={() =>
            setMobileMenu(!mobileMenu)
          }
        >

          {mobileMenu ? (
            <X size={28} />
          ) : (
            <Menu size={28} />
          )}

        </button>
      </div>

      {/* MOBILE MENU */}

      {mobileMenu && (

        <div className="md:hidden bg-blue-900 px-6 py-4 space-y-4">

          <Link
            to="/"
            className="block hover:text-blue-200"
            onClick={() => setMobileMenu(false)}
          >
            Home
          </Link>

          <Link
            to="/dashboard"
            className="block hover:text-blue-200"
            onClick={() => setMobileMenu(false)}
          >
            Dashboard
          </Link>

          <Link
            to="/risk"
            className="block hover:text-blue-200"
            onClick={() => setMobileMenu(false)}
          >
            Risk Assessment
          </Link>

          <Link
            to="/incident"
            className="block hover:text-blue-200"
            onClick={() => setMobileMenu(false)}
          >
            Incident Reporting
          </Link>

          <Link
            to="/training"
            className="block hover:text-blue-200"
            onClick={() => setMobileMenu(false)}
          >
            Training
          </Link>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 px-4 py-3 rounded-xl transition"
          >
            Logout
          </button>

        </div>
      )}
    </nav>
  )
}