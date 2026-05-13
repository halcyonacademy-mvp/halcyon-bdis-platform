import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { supabase } from '../services/supabase'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

export default function Dashboard() {

  const [incidents, setIncidents] = useState([])
  const [selectedIncident, setSelectedIncident] = useState(null)

  async function fetchIncidents() {

    const { data, error } = await supabase
      .from('incidents')
      .select('*')
      .order('id', { ascending: false })

    if (error) {
      console.log('Supabase Error:', error)
    } else {
      setIncidents(data)
    }
  }

  useEffect(() => {
    fetchIncidents()
  }, [])

  const totalIncidents = incidents.length

  const criticalIncidents = incidents.filter(
    (i) => i.severity === 'Critical'
  ).length

  const highRiskIncidents = incidents.filter(
    (i) => i.severity === 'High'
  ).length

  // COUNT TRIGGERS

  const triggerCounts = {}

  incidents.forEach((incident) => {

    const trigger = incident.trigger

    if (triggerCounts[trigger]) {
      triggerCounts[trigger]++
    } else {
      triggerCounts[trigger] = 1
    }
  })

  const mostCommonTrigger =
    Object.keys(triggerCounts).length > 0
      ? Object.keys(triggerCounts).reduce((a, b) =>
          triggerCounts[a] > triggerCounts[b]
            ? a
            : b
        )
      : 'No data'

  // PIE CHART DATA

  const severityData = [
    {
      name: 'Low',
      value: incidents.filter(
        (i) => i.severity === 'Low'
      ).length,
    },
    {
      name: 'Moderate',
      value: incidents.filter(
        (i) => i.severity === 'Moderate'
      ).length,
    },
    {
      name: 'High',
      value: incidents.filter(
        (i) => i.severity === 'High'
      ).length,
    },
    {
      name: 'Critical',
      value: incidents.filter(
        (i) => i.severity === 'Critical'
      ).length,
    },
  ]

  const chartColors = [
    '#16a34a',
    '#eab308',
    '#f97316',
    '#dc2626',
  ]

  // BAR CHART DATA

  const recentIncidents = incidents
    .slice(0, 6)
    .reverse()
    .map((incident, index) => ({
      name: `#${index + 1}`,
      severity:
        incident.severity === 'Low'
          ? 1
          : incident.severity === 'Moderate'
          ? 2
          : incident.severity === 'High'
          ? 3
          : 4,
    }))

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Behavioural Intelligence Dashboard
        </h1>

        {/* KPI CARDS */}

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-gray-500 mb-2">
              Total Incidents
            </h2>

            <p className="text-4xl font-bold text-blue-700">
              {totalIncidents}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-gray-500 mb-2">
              High Risk
            </h2>

            <p className="text-4xl font-bold text-orange-600">
              {highRiskIncidents}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-gray-500 mb-2">
              Critical Incidents
            </h2>

            <p className="text-4xl font-bold text-red-600">
              {criticalIncidents}
            </p>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-gray-500 mb-2">
              Common Trigger
            </h2>

            <p className="text-xl font-bold text-gray-800">
              {mostCommonTrigger}
            </p>

          </div>
        </div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">

          {/* BAR CHART */}

          <div className="bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Recent Incident Severity
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <BarChart data={recentIncidents}>

                <XAxis dataKey="name" />

                <YAxis />

                <Tooltip />

                <Bar
                  dataKey="severity"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* PIE CHART */}

          <div className="bg-white rounded-2xl shadow p-8">

            <h2 className="text-2xl font-semibold mb-6">
              Severity Distribution
            </h2>

            <ResponsiveContainer width="100%" height={300}>

              <PieChart>

                <Pie
                  data={severityData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >

                  {severityData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={chartColors[index % chartColors.length]}
                    />

                  ))}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>
        </div>

        {/* RECENT INCIDENTS */}

        <div className="bg-white rounded-2xl shadow p-8">

          <h2 className="text-2xl font-semibold mb-6">
            Recent Incident Activity
          </h2>

          <div className="space-y-4">

            {incidents.slice(0, 5).map((incident) => (

              <div
                key={incident.id}
                onClick={() => setSelectedIncident(incident)}
                className="border rounded-xl p-4 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition"
              >

                <div>

                  <h3 className="font-semibold">
                    {incident.behaviour}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {incident.location}
                    </p>

                    <p className="text-xs text-gray-400 mt-1">
                    {
                        incident.created_at
                        ? new Date(
                            incident.created_at
                            ).toLocaleString()
                        : incident.date
                    }
                    </p>

                </div>

                <span className="text-sm text-gray-600">
                  {incident.severity}
                </span>

              </div>

            ))}

            {incidents.length === 0 && (

              <p className="text-gray-500">
                No incident data available.
              </p>

            )}

          </div>
        </div>
      </div>

            {/* INCIDENT DETAIL MODAL */}

      {selectedIncident && (

        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">

          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-8 relative">

            <button
              onClick={() => setSelectedIncident(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-black text-2xl"
            >
              ×
            </button>

            <h2 className="text-3xl font-bold text-blue-700 mb-6">
              Incident Details
            </h2>

            <div className="space-y-5">

              <div>
                <p className="text-sm text-gray-500">
                  Behaviour Type
                </p>

                <h3 className="text-xl font-semibold">
                  {selectedIncident.behaviour}
                </h3>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Location
                </p>

                <p className="text-lg">
                  {selectedIncident.location}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Trigger
                </p>

                <p className="text-lg">
                  {selectedIncident.trigger}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Severity
                </p>

                <span className="inline-block bg-red-100 text-red-700 px-4 py-2 rounded-full font-medium">
                  {selectedIncident.severity}
                </span>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Incident Notes
                </p>

                <div className="bg-gray-100 rounded-xl p-5 mt-2">
                  <p className="leading-relaxed text-gray-700">
                    {selectedIncident.notes}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Timestamp
                </p>

                <p className="text-lg">
                  {
                    selectedIncident.created_at
                        ? new Date(
                            selectedIncident.created_at
                        ).toLocaleString()
                        : selectedIncident.date
                    }
                </p>
              </div>

            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}