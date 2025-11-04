const NewsletterSection = () => {
  return (
    <section className="py-20 bg-blue-700 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">Subscribe for Updates</h2>
      <p className="mb-6 max-w-2xl mx-auto">Get the latest reports, insights, and updates about agriculture and field analytics in Pakistan.</p>
      <form className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your Email"
          className="px-4 py-3 rounded w-full sm:w-auto flex-1 text-gray-800"
        />
        <button type="submit" className="px-6 py-3 bg-white text-blue-700 font-semibold rounded hover:bg-gray-100 transition">
          Subscribe
        </button>
      </form>
    </section>
  );
};

export default NewsletterSection;
