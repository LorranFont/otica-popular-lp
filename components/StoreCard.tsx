import { MapPin, Phone, Clock } from "lucide-react";

interface StoreCardProps {
  name: string;
  address: string;
  neighborhood: string;
  whatsappLink: string;
  phone?: string;
  openingHours?: string;
}

export default function StoreCard({
  name,
  address,
  neighborhood,
  whatsappLink,
  phone,
  openingHours,
}: StoreCardProps) {
  return (
    <div className="font-rubik bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex justify-between items-center hover:border-otica-roxo/30 transition-all group">
      <div className="flex-1">
        <p className="font-bold text-otica-roxo flex items-center gap-2 text-lg mb-2">
          <MapPin size={18} className="text-otica-roxo" /> {name}
        </p>
        <p className="text-sm text-slate-500 mb-1">{address}</p>
        <p className="text-xs text-slate-400 font-bold uppercase mb-2">
          {neighborhood} - Parnaíba
        </p>

        {phone && (
          <p className="text-xs text-slate-500 flex items-center gap-1 mb-1">
            <Phone size={12} /> {phone}
          </p>
        )}

        {openingHours && (
          <p className="text-xs text-slate-500 flex items-center gap-1">
            <Clock size={12} /> {openingHours}
          </p>
        )}
      </div>

      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white p-4 rounded-xl hover:bg-green-600 transition-all shadow-md group-hover:scale-110 flex-shrink-0"
        aria-label={`Contatar ${name} via WhatsApp`}
      >
        <img
          src="/produtos/logo_whats.png"
          alt="Logo do WhatsApp"
          className="w-8 h-8"
        />
      </a>
    </div>
  );
}
