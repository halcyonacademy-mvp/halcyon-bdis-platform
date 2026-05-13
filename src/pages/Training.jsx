import { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import scenario1 from '../assets/scenario1.png'
import scenario2 from '../assets/scenario2.png'

export default function Training() {
  const scenarios = [
    {
      image: scenario1,
      title: 'Emergency Department Escalation',
      description:
        'A distressed individual becomes verbally aggressive after waiting several hours for treatment.',
      options: [
        {
          text: 'Raise your voice back',
          outcome: 'Poor',
          score: 0,
          feedback:
            'Aggressive mirroring behaviour can intensify escalation and reduce behavioural control.',
        },

        {
          text: 'Use calm verbal de-escalation',
          outcome: 'Excellent',
          score: 10,
          feedback:
            'Calm communication and active listening reduce escalation intensity and improve safety.',
        },

        {
          text: 'Ignore the situation',
          outcome: 'Poor',
          score: 2,
          feedback:
            'Failure to engage early may allow behavioural escalation to worsen.',
        },

        {
          text: 'Immediately call security without engagement',
          outcome: 'Moderate',
          score: 5,
          feedback:
            'Support may be appropriate, but immediate escalation without verbal engagement may increase distress.',
        },
      ],
    },

    {
      image: scenario2,
      title: 'Reception Area Conflict',
      description:
        'A visitor begins pacing aggressively and invading staff personal space after a discharge dispute.',
      options: [
        {
          text: 'Maintain calm distance and set boundaries',
          outcome: 'Excellent',
          score: 10,
          feedback:
            'Maintaining safe boundaries and calm verbal structure supports behavioural stabilisation.',
        },

        {
          text: 'Argue with the visitor',
          outcome: 'Poor',
          score: 0,
          feedback:
            'Confrontational communication increases behavioural escalation risk.',
        },

        {
          text: 'Walk away without explanation',
          outcome: 'Poor',
          score: 3,
          feedback:
            'Abrupt disengagement may increase frustration and unpredictability.',
        },

        {
          text: 'Request additional staff support calmly',
          outcome: 'Good',
          score: 8,
          feedback:
            'Structured support requests improve safety and operational coordination.',
        },
      ],
    },
  ]

  const [currentScenario, setCurrentScenario] = useState(0)

  const [selectedAnswer, setSelectedAnswer] = useState(null)

  const [showFeedback, setShowFeedback] = useState(false)

  function selectAnswer(option) {
    setSelectedAnswer(option)
    setShowFeedback(true)
  }

  function nextScenario() {
    setSelectedAnswer(null)
    setShowFeedback(false)

    if (currentScenario < scenarios.length - 1) {
      setCurrentScenario(currentScenario + 1)
    } else {
      setCurrentScenario(0)
    }
  }

  const scenario = scenarios[currentScenario]

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-50 p-8">
        <h1 className="text-4xl font-bold text-blue-700 mb-8">
          Scenario-Based Behavioural Training
        </h1>

        <div className="max-w-5xl mx-auto">

          {/* SCENARIO CARD */}

          <div className="bg-white rounded-3xl shadow-xl p-10 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-blue-600 font-semibold mb-2">
                  TRAINING SCENARIO
                </p>

                <h2 className="text-3xl font-bold text-gray-800">
                  {scenario.title}
                </h2>
              </div>

              <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                Scenario {currentScenario + 1} / {scenarios.length}
              </div>
            </div>

            <img
            src={scenario.image}
            alt="Scenario"
            className="w-full h-[350px] object-cover rounded-2xl mb-8 shadow"
            />
            <div className="bg-gray-100 rounded-2xl p-6 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {scenario.description}
              </p>
            </div>

            {/* RESPONSE OPTIONS */}

            <div className="space-y-4">
              {scenario.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => selectAnswer(option)}
                  disabled={showFeedback}
                  className={`
                    w-full text-left border rounded-2xl p-5 transition
                    hover:bg-blue-50 hover:border-blue-300

                    ${
                      selectedAnswer === option
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }
                  `}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-800">
                      {option.text}
                    </span>

                    <span className="text-sm text-gray-400">
                      Option {index + 1}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* FEEDBACK PANEL */}

          {showFeedback && selectedAnswer && (
            <div className="bg-white rounded-3xl shadow-xl p-10">
              <h3 className="text-2xl font-bold mb-6">
                Behavioural Guidance Feedback
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                <div className="border rounded-2xl p-6">
                  <p className="text-gray-500 mb-2">
                    Outcome
                  </p>

                  <p
                    className={`
                      text-2xl font-bold

                      ${
                        selectedAnswer.outcome === 'Excellent'
                          ? 'text-green-600'
                          : ''
                      }

                      ${
                        selectedAnswer.outcome === 'Good'
                          ? 'text-blue-600'
                          : ''
                      }

                      ${
                        selectedAnswer.outcome === 'Moderate'
                          ? 'text-yellow-600'
                          : ''
                      }

                      ${
                        selectedAnswer.outcome === 'Poor'
                          ? 'text-red-600'
                          : ''
                      }
                    `}
                  >
                    {selectedAnswer.outcome}
                  </p>
                </div>

                <div className="border rounded-2xl p-6">
                  <p className="text-gray-500 mb-2">
                    Behaviour Score
                  </p>

                  <p className="text-2xl font-bold text-blue-700">
                    {selectedAnswer.score} / 10
                  </p>
                </div>

                <div className="border rounded-2xl p-6">
                  <p className="text-gray-500 mb-2">
                    Recommended Action
                  </p>

                  <p className="text-lg font-semibold text-gray-700">
                    Structured De-escalation
                  </p>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-8">
                <h4 className="font-semibold text-blue-800 mb-3">
                  Operational Feedback
                </h4>

                <p className="text-blue-700 leading-relaxed">
                  {selectedAnswer.feedback}
                </p>
              </div>

              <button
                onClick={nextScenario}
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-3 rounded-2xl"
              >
                Next Scenario
              </button>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  )
}