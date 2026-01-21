import { MessageCircle, MapPin, Glasses, Sun, BookOpen } from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white font-sans">
      
      {/* 1. Header */}
      <header className="bg-purple-800 text-white p-4 flex justify-between items-center shadow-md">
        <div className="font-bold text-xl">ÓTICA <span className="text-yellow-400">POPULAR</span></div>
        <button className="bg-green-500 p-2 rounded-full hover:bg-green-600 transition-all">
          <MessageCircle size={24} />
        </button>
      </header>

      {/* 2. Banner Principal (Hero) */}
      <section className="relative h-[400px] bg-gray-200 flex items-center overflow-hidden">
        {/* Imagens de fundo*/}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/80 to-transparent z-10" />
        <div className="relative z-20 px-8 text-white max-w-lg">
          <h2 className="text-4xl font-extrabold leading-tight mb-4">
            Modelos exclusivos para todos os estilos.
          </h2>
          <p className="text-lg mb-6 opacity-90">18 anos cuidando da sua visão em Parnaíba.</p>
          <button className="bg-yellow-400 text-purple-900 font-bold px-8 py-3 rounded-full shadow-lg hover:bg-yellow-500 transition-all">
            COMPRE AGORA
          </button>
        </div>
      </section>

      {/* 3. Categorias Rápidas */}
      <section className="py-12 px-6 flex justify-around text-center border-b">
        <div className="flex flex-col items-center gap-2 group cursor-pointer">
          <div className="p-4 bg-gray-100 rounded-full group-hover:bg-purple-100 transition-colors">
            <Glasses className="text-purple-800" size={32} />
          </div>
          <span className="text-sm font-bold text-gray-700">Armações</span>
        </div>
        <div className="flex flex-col items-center gap-2 group cursor-pointer">
          <div className="p-4 bg-gray-100 rounded-full group-hover:bg-purple-100 transition-colors">
            <Sun className="text-purple-800" size={32} />
          </div>
          <span className="text-sm font-bold text-gray-700">Óculos de Sol</span>
        </div>
        <div className="flex flex-col items-center gap-2 group cursor-pointer">
          <div className="p-4 bg-gray-100 rounded-full group-hover:bg-purple-100 transition-colors">
            <BookOpen className="text-purple-800" size={32} />
          </div>
          <span className="text-sm font-bold text-gray-700">Lentes</span>
        </div>
      </section>

      {/* 4. Nossas Unidades (Parnaíba) */}
      <section className="py-12 px-6 bg-gray-50">
        <h3 className="text-2xl font-bold text-purple-900 text-center mb-8">Encontre uma Ótica Popular</h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <p className="font-bold text-purple-800 flex items-center gap-2">
                <MapPin size={16} /> Unidade Centro
              </p>
              <p className="text-sm text-gray-500">Parnaíba - PI</p>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
              <MessageCircle size={16} /> WhatsApp
            </button>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
            <div>
              <p className="font-bold text-purple-800 flex items-center gap-2">
                <MapPin size={16} /> Unidade Loja 02
              </p>
              <p className="text-sm text-gray-500">Parnaíba - PI</p>
            </div>
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
              <MessageCircle size={16} /> WhatsApp
            </button>
          </div>

        </div>
      </section>

      <footer className="bg-purple-900 text-white py-8 text-center text-xs opacity-75">
        Ótica Popular © Parnaíba-PI | Sua visão é a nossa missão
      </footer>
    </main>
  );
}