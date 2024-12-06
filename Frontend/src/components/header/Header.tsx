import { Search } from 'lucide-react';

export const Header = () => {
  const user = { name: 'Usuário', email: 'email@gmail.com' };
  return (
    <header className="flex items-center justify-between h-16 px-8 mt-2 w-full">
      <h1>Administrador</h1>
      <div className="flex items-center space-x-4 p-4">
        <Search />
        <div className="w-1 h-12 bg-gray-300 mx-1"></div>
        <div className="flex flex-row items-center space-x-1">
          <div className="h-10 w-10 bg-gray-600 rounded-full"></div>
          <div className="flex flex-col">
            <span className="font-bold ">{user.name}</span>
            <span className="opacity-50 text-xs">{user.email}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
