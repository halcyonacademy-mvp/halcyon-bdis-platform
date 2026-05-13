export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          
          <div>
            <h2 className="text-xl font-bold">
              HALCYON ACADEMY
            </h2>

            <p className="text-blue-200 text-sm mt-2 max-w-md">
              Behavioural De-Escalation Intelligence System designed to support safer frontline environments through structured behavioural assessment, training, incident reporting, and analytics.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-2">
              MVP Prototype
            </h3>

            <p className="text-sm text-blue-200">
              React + Tailwind Prototype
            </p>

            <p className="text-sm text-blue-200">
              Demonstration Platform
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}