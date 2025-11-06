import Header from "@/components/layout/Header";


export default function SupportPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="flex-grow mt-16 p-6">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-700 mb-4">Support Center</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We are here to help! Whether you have a technical issue, need guidance, or want to learn more about our
            agricultural tools, our support team is ready to assist you.
          </p>
        </section>

        {/* Contact Options */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-blue-600">
            <h3 className="text-xl font-semibold mb-2 text-blue-700">📧 Email Support</h3>
            <p className="text-gray-600 mb-3">
              Send us your issue or question anytime. Our team responds within 24 hours.
            </p>
            <p className="font-medium text-blue-600">support@farmassist.com</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-green-600">
            <h3 className="text-xl font-semibold mb-2 text-green-700">📞 Phone Support</h3>
            <p className="text-gray-600 mb-3">
              Need urgent help? Call us during business hours for live assistance.
            </p>
            <p className="font-medium text-green-600">+92 300 1234567</p>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6 text-center border-t-4 border-orange-500">
            <h3 className="text-xl font-semibold mb-2 text-orange-600">💬 Live Chat</h3>
            <p className="text-gray-600 mb-3">
              Chat with our support team directly for quick answers and guidance.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg">
              Start Chat
            </button>
          </div>
        </section>

        {/* Knowledge Base */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            Knowledge Base & Resources
          </h2>
          <p className="text-gray-700 mb-6 max-w-3xl">
            Explore detailed guides, tutorials, and documentation to understand how to use our platform, manage your
            fields, analyze soil health, and interpret farm data more effectively.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Getting Started", desc: "Learn how to set up your account and monitor your first field.", color: "bg-blue-50" },
              { title: "Farm Data Insights", desc: "Understand your field metrics, soil data, and productivity charts.", color: "bg-green-50" },
              { title: "Troubleshooting", desc: "Fix common issues with connectivity, data updates, and sensors.", color: "bg-yellow-50" },
            ].map((item, index) => (
              <div key={index} className={`${item.color} p-5 rounded-lg border border-gray-200 shadow-sm`}>
                <h3 className="font-semibold text-lg mb-2 text-gray-800">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <div className="bg-white shadow-md p-5 rounded-lg">
              <h4 className="font-medium text-gray-800">
                🌾 How can I add a new field to my dashboard?
              </h4>
              <p className="text-gray-600 mt-2">
                Navigate to the “Fields” tab and click “Add New Field.” Enter the location, area size, and crop type.
              </p>
            </div>

            <div className="bg-white shadow-md p-5 rounded-lg">
              <h4 className="font-medium text-gray-800">
                💧 How is soil moisture calculated?
              </h4>
              <p className="text-gray-600 mt-2">
                Our sensors collect real-time soil data, analyzing moisture levels using advanced IoT algorithms.
              </p>
            </div>

            <div className="bg-white shadow-md p-5 rounded-lg">
              <h4 className="font-medium text-gray-800">
                📅 Can I receive weather alerts for my fields?
              </h4>
              <p className="text-gray-600 mt-2">
                Yes, enable “Weather Notifications” in your profile settings to get daily or weekly alerts.
              </p>
            </div>
          </div>
        </section>

        {/* Submit Support Ticket */}
        <section className="mb-20">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Submit a Support Request</h2>
          <p className="text-gray-600 mb-6">
            Can’t find what you’re looking for? Send us your issue, and our technical team will respond soon.
          </p>
          <form className="bg-white shadow-lg p-6 rounded-lg max-w-2xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                placeholder="Full Name"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Email"
                className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <textarea
              placeholder="Describe your issue..."
              className="border border-gray-300 rounded-md p-2 w-full mb-4 h-32 focus:outline-none focus:ring-2 focus:ring-blue-400"
            ></textarea>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md">
              Submit Request
            </button>
          </form>
        </section>
      </main>

    </div>
  );
}
