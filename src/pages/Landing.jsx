import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Landing() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-6 py-16">
        <h1 className="text-5xl font-bold text-blue-700 mb-6 text-center">
          Behavioural De-Escalation Intelligence System
        </h1>

        <p className="text-lg text-gray-600 max-w-3xl text-center mb-12">
          A structured behavioural risk assessment and incident intelligence
          platform designed to support safer frontline environments through
          escalation scoring, incident reporting, training, and analytics.
        </p>

        <div className="mb-10">

            <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 text-blue-800 px-6 py-4 rounded-2xl shadow-sm">

                <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>

                <div className="text-left">

                <p className="font-semibold">
                    Pilot Evaluation Access Available
                </p>

                <p className="text-sm text-blue-700">
                    Functional MVP currently available for pilot review and organisational evaluation.
                </p>

                </div>

            </div>
        </div>

        <div className="mt-4 text-center">

            <p className="text-sm text-gray-600">
                Pilot & Evaluation Enquiries
            </p>

            <a
                href="mailto:halcyonacademyofficial@gmail.com"
                className="text-blue-700 font-medium hover:underline"
            >
                halcyonacademyofficial@gmail.com
            </a>

            </div>

        <div className="bg-blue-700 text-white rounded-3xl p-10 mb-12 max-w-6xl w-full shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                
                <div>
                <h2 className="text-5xl font-bold leading-tight mb-6">
                    Smarter Behavioural Risk Intelligence
                </h2>

                <p className="text-blue-100 text-lg leading-relaxed">
                    A structured behavioural intelligence platform designed to support safer healthcare, security, and frontline environments through escalation scoring, incident reporting, analytics, and scenario-based learning.
                </p>
                </div>

                <div className="bg-white rounded-2xl p-8 text-gray-800">
                <h3 className="text-2xl font-bold mb-6">
                    Prototype Features
                </h3>

                <ul className="space-y-4">
                    <li>✅ Behavioural Escalation Index (BEI)</li>
                    <li>✅ Structured Incident Reporting</li>
                    <li>✅ Analytics Dashboard</li>
                    <li>✅ Scenario-Based Training</li>
                    <li>✅ Real-Time Risk Guidance</li>
                </ul>
                </div>
            </div>
            </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl w-full">
          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Behavioural Risk Scoring
            </h2>

            <p className="text-gray-600">
              Assess behavioural escalation indicators and receive structured
              response guidance.
            </p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Incident Reporting
            </h2>

            <p className="text-gray-600">
              Capture behavioural incidents quickly using structured reporting
              workflows.
            </p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Scenario Training
            </h2>

            <p className="text-gray-600">
              Reinforce behavioural response skills through interactive
              training scenarios.
            </p>
          </div>

          <div className="bg-white shadow rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Analytics Dashboard
            </h2>

            <p className="text-gray-600">
              Identify trends, common triggers, peak times, and escalation
              patterns.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}