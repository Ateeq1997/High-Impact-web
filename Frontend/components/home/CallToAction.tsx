interface CTAProps {
  heading: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const CallToAction: React.FC<CTAProps> = ({ heading, description, buttonText, buttonLink }) => {
  return (
    <section className="bg-blue-700 py-20 text-white text-center">
      <h2 className="text-3xl font-bold mb-4">{heading}</h2>
      <p className="mb-6 max-w-2xl mx-auto">{description}</p>
      <a
        href={buttonLink}
        className="px-8 py-3 bg-white text-blue-700 font-semibold rounded hover:bg-gray-100 transition"
      >
        {buttonText}
      </a>
    </section>
  );
};

export default CallToAction;
