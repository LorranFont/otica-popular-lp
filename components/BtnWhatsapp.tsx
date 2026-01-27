import Image from "next/image";

export default function BtnWhatsapp() {
  return (
    <a
      href={"https://wa.me/999999999999"}
      target="_blank"
      className="fixed bottom-6 right-6 z-[999] bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-90 flex items-center justify-center"
    >
      <img src="/produtos/logo_whats.png" alt="Logo do WhatsApp" className="w-8 h-8" />
      
      </a>
  );
}
