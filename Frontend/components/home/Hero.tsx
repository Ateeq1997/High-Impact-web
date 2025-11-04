const Hero = () => {
  return (
    <section className="relative h-[80vh] flex items-center">
      {/* Background video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
        src="/videos/video.mp4"
      />

      {/* Light color overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-white/40"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start gap-6">
        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-bold text-blue-700">
          Welcome to HighImpact Solutions
        </h1>

        {/* Paragraph */}
        <p className="text-gray-700 text-lg max-w-xl">
          Build, manage, and monitor your agricultural projects with interactive maps and smart insights.
        </p>

        {/* Button */}
        <a
          href="/signup"
          className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
        >
          Get Started
        </a>
      </div>
    </section>
  );
};

export default Hero;
