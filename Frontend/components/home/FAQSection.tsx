const faqs = [
  { question: "How accurate is the crop data?", answer: "Our data comes from satellite imagery, local sensors, and historical records for high accuracy." },
  { question: "Can I monitor multiple fields?", answer: "Yes, you can add as many fields as you want and visualize them on the map." },
  { question: "Is the platform free?", answer: "We offer basic free access with paid plans for advanced analytics and insights." },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-blue-700 mb-12 text-center">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="border rounded-lg p-6 hover:shadow-lg transition">
              <h3 className="font-semibold text-blue-700 mb-2">{faq.question}</h3>
              <p className="text-gray-700">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
