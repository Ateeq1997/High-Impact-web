import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend } from "recharts";

const lineData = [
  { month: "Jan", NDVI: 45 },
  { month: "Feb", NDVI: 60 },
  { month: "Mar", NDVI: 75 },
  { month: "Apr", NDVI: 80 },
];

const barData = [
  { crop: "Wheat", area: 120 },
  { crop: "Rice", area: 90 },
  { crop: "Sugarcane", area: 60 },
  { crop: "Corn", area: 80 },
];

const ChartsSection = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <div>
        <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">NDVI Trends</h3>
        <LineChart width={400} height={300} data={lineData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="NDVI" stroke="#1D4ED8" strokeWidth={2} />
        </LineChart>
      </div>

      <div>
        <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">Crop Area Distribution</h3>
        <BarChart width={400} height={300} data={barData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="crop" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="area" fill="#1D4ED8" />
        </BarChart>
      </div>
    </div>
  );
};

export default ChartsSection;
