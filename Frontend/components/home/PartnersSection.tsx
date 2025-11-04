const partners = [
  "/images/partner1.png",
  "/images/partner2.png",
  "/images/partner3.png",
  "/images/partner4.png",
];

const PartnersSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-12">Our Partners</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          {partners.map((logo, index) => (
            <img key={index} src={logo} alt={`Partner ${index + 1}`} className="h-16 object-contain" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
