const stats = [
  { label: "Fields Monitored", value: "1,250+" },
  { label: "Crop Types", value: "45+" },
  { label: "Years of Data", value: "20+" },
  { label: "Farmers Assisted", value: "3,500+" },
];

const Statistics = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {stats.map((stat, index) => (
        <div key={index}>
          <p className="text-3xl font-bold text-blue-700">{stat.value}</p>
          <p className="text-gray-700 mt-2">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default Statistics;
