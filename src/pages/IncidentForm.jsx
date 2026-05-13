import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase } from '../services/supabase'

export default function IncidentForm() {

  const [location, setLocation] = useState('')
  const [behaviour, setBehaviour] = useState('')
  const [trigger, setTrigger] = useState('')
  const [severity, setSeverity] = useState('Moderate')
  const [notes, setNotes] = useState('')

  const [incidents, setIncidents] = useState([])

  // FETCH INCIDENTS FROM SUPABASE

  async function fetchIncidents() {

    const { data, error } = await supabase
      .from('incidents')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.log(error)
    } else {
      setIncidents(data)
    }
  }

  useEffect(() => {
    fetchIncidents()
  }, [])

  // SUBMIT INCIDENT

  async function handleSubmit(e) {
    e.preventDefault()

    const { error } = await supabase
      .from('incidents')
      .insert([
        {
          location,
          behaviour,
          trigger,
          severity,
          notes,
        },
      ])

    if (error) {
      console.log(error)
      alert('Error saving incident')
    } else {

      alert('Incident saved successfully')

      setLocation('')
      setBehaviour('')
      setTrigger('')
      setSeverity('Moderate')
      setNotes('')

      fetchIncidents()
    }
  }

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-8">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Incident Reporting System
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* FORM SECTION */}

          <div className="bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Log New Incident
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block mb-2 font-medium">
                  Location
                </label>

                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Emergency Department"
                  className="w-full border rounded-xl p-3"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Behaviour Type
                </label>

                <input
                  type="text"
                  value={behaviour}
                  onChange={(e) => setBehaviour(e.target.value)}
                  placeholder="Threatening Language"
                  className="w-full border rounded-xl p-3"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Trigger
                </label>

                <input
                  type="text"
                  value={trigger}
                  onChange={(e) => setTrigger(e.target.value)}
                  placeholder="Long Waiting Time"
                  className="w-full border rounded-xl p-3"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Severity Level
                </label>

                <select
                  value={severity}
                  onChange={(e) => setSeverity(e.target.value)}
                  className="w-full border rounded-xl p-3"
                >
                  <option>Low</option>
                  <option>Moderate</option>
                  <option>High</option>
                  <option>Critical</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  Incident Notes
                </label>

                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Describe what happened..."
                  className="w-full border rounded-xl p-3 h-32"
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl"
              >
                Submit Incident
              </button>

            </form>
          </div>

          {/* INCIDENT HISTORY */}

          <div className="bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Incident History
            </h2>

            <div className="space-y-4 max-h-[700px] overflow-y-auto">

              {incidents.length === 0 && (
                <p className="text-gray-500">
                  No incidents logged yet.
                </p>
              )}

              {incidents.map((incident) => (

                <div
                  key={incident.id}
                  className="border rounded-2xl p-5"
                >

                  <div className="flex justify-between items-start mb-3">

                    <div>

                      <h3 className="font-bold text-lg">
                        {incident.behaviour}
                      </h3>

                      <p className="text-sm text-gray-500">
                        {new Date(
                          incident.created_at
                        ).toLocaleString()}
                      </p>

                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium

                      ${
                        incident.severity === 'Low'
                          ? 'bg-green-100 text-green-700'
                          : ''
                      }

                      ${
                        incident.severity === 'Moderate'
                          ? 'bg-yellow-100 text-yellow-700'
                          : ''
                      }

                      ${
                        incident.severity === 'High'
                          ? 'bg-orange-100 text-orange-700'
                          : ''
                      }

                      ${
                        incident.severity === 'Critical'
                          ? 'bg-red-100 text-red-700'
                          : ''
                      }

                    `}
                    >
                      {incident.severity}
                    </span>

                  </div>

                  <div className="space-y-2 text-sm">

                    <p>
                      <span className="font-semibold">
                        Location:
                      </span>{' '}
                      {incident.location}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Trigger:
                      </span>{' '}
                      {incident.trigger}
                    </p>

                    <p>
                      <span className="font-semibold">
                        Notes:
                      </span>{' '}
                      {incident.notes}
                    </p>

                  </div>
                </div>

              ))}

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}