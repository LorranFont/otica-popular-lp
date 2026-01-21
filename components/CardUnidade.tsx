import { MapPin, MessageCircle } from "lucide-react";

// Props
interface CardUnidadeProps {
  nome: string;
  cidade: string;
}

export default function CardUnidade({ nome, cidade }: CardUnidadeProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center hover:shadow-md transition-shadow">
      <div>
        <p className="font-bold text-otica-roxo flex items-center gap-2">
          <MapPin size={16} /> {nome}
        </p>
        <p className="text-sm text-gray-500">{cidade}</p>
      </div>
      <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-green-600">
        <MessageCircle size={16} /> WhatsApp
      </button>
    </div>
  );
}