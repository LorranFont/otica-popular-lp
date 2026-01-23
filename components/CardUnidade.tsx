import { MapPin, MessageCircle } from "lucide-react";

interface CardUnidadeProps {
  nome: string;
  endereco: string;
  bairro: string;
  linkWhats: string;
}

export default function CardUnidade({ nome, endereco, bairro, linkWhats }: CardUnidadeProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:border-otica-roxo/30 transition-all group">
      <div>
        <p className="font-bold text-otica-roxo flex items-center gap-2 text-lg">
          <MapPin size={18} className="text-otica-roxo" /> {nome}
        </p>
        <p className="text-sm text-slate-500 mt-1">{endereco}</p>
        <p className="text-xs text-slate-400 font-bold uppercase mt-1">{bairro} - Parnaíba</p>
      </div>
      <a 
        href={linkWhats}
        target="_blank"
        className="bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 transition-all shadow-md group-hover:scale-110"
      >
        <img src="/produtos/logo_whats.png" alt="Logo do WhatsApp" className="w-8 h-8" />
      </a>
    </div>
  );
}