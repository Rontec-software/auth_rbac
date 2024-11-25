import { ClipboardMinus, Shield, ShieldCheck, User } from 'lucide-react';
import Link from 'next/link';
export const Sidebar = () => {
  return (
    <aside className="w-56 flex flex-col items-start">
      <div className="flex items-center justify-between p-8">
        <div className="h-20 w-20 bg-gray-600 rounded-full"></div>
      </div>
      <nav className="p-4 mt-4">
        <ul className="space-4">
          <li>
            <Link
              className="flex items-center p-3 hover:bg-gray-700 rounded-md transition-all"
              href="/usuario"
            >
              <User className="w-5 h-5 mr-4" /> Usuários
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center p-3 hover:bg-gray-700 rounded-md transition-all"
              href="/perfil-de-acesso"
            >
              <Shield className="w-5 h-5 mr-4" /> Perfil de acesso
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center p-3 hover:bg-gray-700 rounded-md transition-all"
              href="/permissao"
            >
              <ShieldCheck className="w-5 h-5 mr-4" /> Permissões
            </Link>
          </li>
          <li>
            <Link
              className="flex items-center p-3 hover:bg-gray-700 rounded-md transition-all"
              href="/relatorio"
            >
              <ClipboardMinus className="w-5 h-5 mr-4" /> Relatórios
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
