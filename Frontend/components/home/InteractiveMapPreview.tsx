"use client";

const InteractiveMapPreview = () => {
  return (
    <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg">
      <iframe
        src="https://www.openstreetmap.org/export/embed.html?bbox=60.8721%2C23.885%2C77.8173%2C37.0841&layer=mapnik"
        className="w-full h-full"
        style={{ border: 0 }}
        loading="lazy"
        title="Simple Map"
      ></iframe>
    </div>
  );
};

export default InteractiveMapPreview;
