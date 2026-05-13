import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function RiskAssessment() {
  const indicators = [
    {
      name: 'Raised Voice',
      score: 1,
    },
    {
      name: 'Pacing / Agitation',
      score: 2,
    },
    {
      name: 'Threatening Language',
      score: 3,
    },
    {
      name: 'Clenched Fists',
      score: 2,
    },
    {
      name: 'Invading Personal Space',
      score: 3,
    },
    {
      name: 'Physical Intimidation',
      score: 4,
    },
    {
      name: 'Confusion / Distress',
      score: 2,
    },
    {
      name: 'Refusal to Cooperate',
      score: 2,
    },
  ]

  const [selectedIndicators, setSelectedIndicators] = useState([])

  const [riskLevel, setRiskLevel] = useState('')
  const [guidance, setGuidance] = useState('')
  const [totalScore, setTotalScore] = useState(0)

function toggleIndicator(indicator) {

  const exists = selectedIndicators.find(
    (i) => i.name === indicator.name
  )

  if (exists) {

    setSelectedIndicators(
      selectedIndicators.filter(
        (i) => i.name !== indicator.name
      )
    )

  } else {

    setSelectedIndicators([
      ...selectedIndicators,
      indicator,
    ])
  }
}

function calculateRisk() {

  const score = selectedIndicators.reduce(
    (sum, item) => sum + item.score,
    0
  )

  setTotalScore(score)

  // ADVANCED LOGIC FLAGS

  const hasThreateningLanguage =
    selectedIndicators.some(
      (i) => i.name === 'Threatening Language'
    )

  const hasPhysicalIntimidation =
    selectedIndicators.some(
      (i) => i.name === 'Physical Intimidation'
    )

  const hasPersonalSpaceViolation =
    selectedIndicators.some(
      (i) => i.name === 'Invading Personal Space'
    )

  const highRiskCombination =
    hasThreateningLanguage &&
    hasPhysicalIntimidation

  const escalationCluster =
    hasPersonalSpaceViolation &&
    hasPhysicalIntimidation

  // DECISION ENGINE

  if (
    score <= 3 &&
    !highRiskCombination
  ) {

    setRiskLevel('Low')

    setGuidance(
      'Continue calm communication, active listening, and routine behavioural observation.'
    )

  } else if (
    score <= 6 &&
    !escalationCluster
  ) {

    setRiskLevel('Moderate')

    setGuidance(
      'Apply structured verbal de-escalation techniques and increase situational awareness.'
    )

  } else if (
    score <= 10 ||
    highRiskCombination
  ) {

    setRiskLevel('High')

    setGuidance(
      'Escalate to senior staff or security support. Reduce environmental triggers and maintain safe positioning.'
    )

  } else {

    setRiskLevel('Critical')

    setGuidance(
      'Immediate coordinated response recommended. Prioritise staff/public safety and activate emergency escalation procedures.'
    )
  }
}

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Behavioural Escalation Index (BEI)
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* LEFT PANEL */}

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Behavioural Indicators
            </h2>

            <p className="text-gray-600 mb-6">
              Select observed behavioural indicators to calculate escalation risk.
            </p>

            <div className="space-y-4">
              {indicators.map((indicator, index) => (
                <label
                  key={index}
                  className={`
                    flex items-center justify-between border rounded-xl p-4 cursor-pointer transition
                    ${
                        selectedIndicators.find((i) => i.name === indicator.name)
                        ? 'border-blue-700 bg-blue-50'
                        : 'hover:bg-gray-50'
                    }
                    `}
                >
                  <div className="flex items-center gap-4">
                    <input
                        type="checkbox"
                        checked={
                            !!selectedIndicators.find(
                                (i) => i.name === indicator.name )}
                        onChange={() => toggleIndicator(indicator)}
                        className="w-5 h-5 accent-blue-700 cursor-pointer"
                    />

                    <span className="font-medium">
                      {indicator.name}
                    </span>
                  </div>

                  <span className="text-sm text-gray-500">
                    Score: {indicator.score}
                  </span>
                </label>
              ))}
            </div>

            <button
              onClick={calculateRisk}
              className="mt-8 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl"
            >
              Calculate Risk Level
            </button>
          </div>

          {/* RIGHT PANEL */}

          <div className="bg-white rounded-2xl shadow p-8">
            <h2 className="text-2xl font-semibold mb-6">
              Escalation Assessment
            </h2>

            <div className="space-y-6">

              <div className="border rounded-2xl p-6">
                <h3 className="text-gray-500 mb-2">
                  Total Behaviour Score
                </h3>

                <p className="text-5xl font-bold text-blue-700">
                  {totalScore}
                </p>
              </div>

              <div className="border rounded-2xl p-6">
                <h3 className="text-gray-500 mb-2">
                  Risk Level
                </h3>

                <div
                  className={`
                    inline-block px-5 py-2 rounded-full text-white font-semibold
                    ${
                      riskLevel === 'Low'
                        ? 'bg-green-600'
                        : ''
                    }
                    ${
                      riskLevel === 'Moderate'
                        ? 'bg-yellow-500'
                        : ''
                    }
                    ${
                      riskLevel === 'High'
                        ? 'bg-orange-500'
                        : ''
                    }
                    ${
                      riskLevel === 'Critical'
                        ? 'bg-red-600'
                        : ''
                    }
                  `}
                >
                  {riskLevel || 'Not Assessed'}
                </div>
              </div>

              <div className="border rounded-2xl p-6">
                <h3 className="text-gray-500 mb-3">
                  Structured Response Guidance
                </h3>

                <div className="border rounded-2xl p-6 bg-red-50">

                <h3 className="font-semibold text-red-700 mb-3">
                    AI-Assisted Operational Recommendation
                </h3>

                <ul className="space-y-2 text-sm text-red-700">

                    {riskLevel === 'Low' && (
                    <>
                        <li>• Maintain calm communication</li>
                        <li>• Continue behavioural observation</li>
                    </>
                    )}

                    {riskLevel === 'Moderate' && (
                    <>
                        <li>• Use structured verbal de-escalation</li>
                        <li>• Reduce environmental stressors</li>
                        <li>• Increase staff awareness</li>
                    </>
                    )}

                    {riskLevel === 'High' && (
                    <>
                        <li>• Notify senior/security support</li>
                        <li>• Maintain safe distancing</li>
                        <li>• Prepare escalation response</li>
                    </>
                    )}

                    {riskLevel === 'Critical' && (
                    <>
                        <li>• Immediate emergency escalation</li>
                        <li>• Prioritise safety protocols</li>
                        <li>• Coordinate multi-staff response</li>
                    </>
                    )}

                </ul>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  {guidance ||
                    'Assessment guidance will appear after risk calculation.'}
                </p>
              </div>

              <div className="border rounded-2xl p-6 bg-blue-50">
                <h3 className="font-semibold text-blue-800 mb-2">
                  Operational Notes
                </h3>

                <p className="text-sm text-blue-700">
                  This prototype demonstrates structured behavioural escalation scoring using observable indicators and guided response logic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}