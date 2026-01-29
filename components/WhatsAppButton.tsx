import Image from "next/image";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
}

export default function WhatsAppButton({
  phoneNumber = "5586999999999",
  message = "Olá! Gostaria de saber mais sobre os produtos da Ótica Popular.",
}: WhatsAppButtonProps) {
  const whatsappUrl = `https://wa.me/${phoneNumber}${
    message ? `?text=${encodeURIComponent(message)}` : ""
  }`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-[999] bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-90 flex items-center justify-center group"
      aria-label="Contato via WhatsApp"
    >
      <Image
        src="/produtos/logo_whats.png"
        alt="Logo do WhatsApp"
        width={32}
        height={32}
        className="w-8 h-8"
      />

      {/* Tooltip */}
      <div className="absolute right-full mr-3 bg-slate-900 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Fale conosco no WhatsApp
        <div className="absolute top-1/2 -translate-y-1/2 left-full w-0 h-0 border-l-4 border-l-slate-900 border-y-4 border-y-transparent"></div>
      </div>
    </a>
  );
}
