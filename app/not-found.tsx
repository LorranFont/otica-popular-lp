import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <div className="text-8xl font-black text-otica-roxo/20 mb-4">404</div>
          <h1 className="text-3xl font-black text-slate-900 mb-2">
            Página não encontrada
          </h1>
          <p className="text-slate-600">
            A página que você está procurando não existe ou foi movida.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-otica-roxo text-white font-bold py-3 px-6 rounded-lg hover:bg-otica-roxo/90 transition-colors"
          >
            <Home size={18} />
            Voltar ao início
          </Link>

          <div className="flex gap-3">
            <Link
              href="/product"
              className="flex-1 bg-slate-100 text-slate-700 font-medium py-3 px-4 rounded-lg hover:bg-slate-200 transition-colors text-center"
            >
              Ver produtos
            </Link>
            <Link
              href="/#unidades"
              className="flex-1 bg-slate-100 text-slate-700 font-medium py-3 px-4 rounded-lg hover:bg-slate-200 transition-colors text-center"
            >
              Nossas lojas
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-slate-200">
          <p className="text-sm text-slate-500 mb-4">
            Precisa de ajuda? Entre em contato:
          </p>
          <div className="flex justify-center gap-4 text-sm">
            <a
              href="tel:+5586999391222"
              className="text-otica-roxo hover:underline font-medium"
            >
              (86) 9939-1222
            </a>
            <span className="text-slate-300">|</span>
            <a
              href="mailto:otica.pi@gmail.com"
              className="text-otica-roxo hover:underline font-medium"
            >
              otica.pi@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
