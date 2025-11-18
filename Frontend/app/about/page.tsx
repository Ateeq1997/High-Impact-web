"use client";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white pt-24 px-6 pb-20">
      {/* Top Section */}
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          About Our Platform
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
          A modern, smart, and powerful system designed to simplify farm,
          operator, and land management. Our platform combines data, automation, 
          and intuitive design to help you manage everything in one place.
        </p>
      </div>

      {/* Highlight Boxes */}
      <div className="max-w-5xl mx-auto mt-14 grid md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl shadow bg-gray-50 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Farm Tracking</h3>
          <p className="text-gray-600">Track all farm locations, sizes, and data in real-time.</p>
        </div>

        <div className="p-6 rounded-2xl shadow bg-gray-50 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Operator Management</h3>
          <p className="text-gray-600">View detailed profiles for each operator and their farms.</p>
        </div>

        <div className="p-6 rounded-2xl shadow bg-gray-50 hover:shadow-lg transition">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Data Accuracy</h3>
          <p className="text-gray-600">Eliminate manual errors with automated data structuring.</p>
        </div>
      </div>

      {/* Mission Section */}
      <section className="max-w-5xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Our mission is to revolutionize how farm owners and operators manage 
          their land and workforce. We aim to provide a digital solution that 
          improves efficiency, enhances transparency, and enables smarter decision-making. 
          By focusing on simplicity, usability, and accuracy, our platform empowers 
          users to handle complex farming data with ease.
        </p>
      </section>

      {/* Vision Section */}
      <section className="max-w-5xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Vision</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          To become the leading digital platform for farm and operator management, 
          connecting landowners, workers, and organizations with advanced tools 
          that modernize the agricultural industry. We envision a world where data 
          helps farms grow smarter, not harder — ensuring sustainability and 
          long-term success.
        </p>
      </section>

      {/* Values Section */}
      <section className="max-w-5xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Core Values</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl text-gray-900 mb-2">Transparency</h3>
            <p className="text-gray-600">
              Clear data visibility helps users understand farm operations better.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl text-gray-900 mb-2">Reliability</h3>
            <p className="text-gray-600">
              Our platform ensures accurate, consistent, and dependable information.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl text-gray-900 mb-2">Efficiency</h3>
            <p className="text-gray-600">
              We simplify farm operations so users save time and avoid confusion.
            </p>
          </div>

          <div className="p-6 bg-gray-50 rounded-2xl shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-xl text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">
              Always improving with the latest tools and modern technologies.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="max-w-5xl mx-auto mt-20">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Our Platform?</h2>

        <ul className="space-y-4 text-lg text-gray-700">
          <li>✔️ Modern and intuitive user interface</li>
          <li>✔️ Fully responsive on all devices</li>
          <li>✔️ Smooth navigation with operator & farm links</li>
          <li>✔️ Accurate farm size, location, and data tracking</li>
          <li>✔️ Designed for organizations with multiple operators</li>
          <li>✔️ Works seamlessly for landowners and farm managers</li>
          <li>✔️ Secure and safe data handling</li>
        </ul>
      </section>

      {/* Call to Action */}
      <div className="max-w-5xl mx-auto mt-24 bg-gray-900 text-white p-10 rounded-2xl text-center shadow-lg">
        <h2 className="text-3xl font-bold mb-4">Ready to Experience a Smarter Way to Manage Farms?</h2>
        <p className="text-lg mb-6">
          Explore powerful tools that help you manage farms, operators, workers, 
          and data in one smart, modern platform.
        </p>
        <button className="px-6 py-3 bg-green-500 hover:bg-green-600 transition rounded-xl text-white font-semibold text-lg">
          Get Started
        </button>
      </div>
    </div>
  );
}
