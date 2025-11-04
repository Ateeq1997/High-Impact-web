interface CardProps {
  title: string;
  description: string;
}

const CardPlaceholder: React.FC<CardProps> = ({ title, description }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-6 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-blue-600 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default CardPlaceholder;
