"use client";

import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>

        <h1 className="text-2xl font-bold text-slate-900 mb-2">
          Ops! Algo deu errado
        </h1>

        <p className="text-slate-600 mb-6">
          Encontramos um problema inesperado. Nossa equipe foi notificada e está
          trabalhando para resolver.
        </p>

        <div className="space-y-3">
          <button
            onClick={reset}
            className="w-full bg-otica-roxo text-white font-bold py-3 px-6 rounded-lg hover:bg-otica-roxo/90 transition-colors flex items-center justify-center gap-2"
          >
            <RefreshCw size={18} />
            Tentar novamente
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="w-full bg-slate-100 text-slate-700 font-medium py-3 px-6 rounded-lg hover:bg-slate-200 transition-colors"
          >
            Voltar ao início
          </button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm text-slate-500 hover:text-slate-700">
              Detalhes do erro (desenvolvimento)
            </summary>
            <pre className="mt-2 text-xs bg-slate-100 p-3 rounded overflow-auto text-red-600">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
