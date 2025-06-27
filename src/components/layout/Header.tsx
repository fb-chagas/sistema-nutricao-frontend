import { Bell, User, Search } from 'lucide-react';

interface HeaderProps {
  collapsed: boolean;
}

export default function Header({ collapsed }: HeaderProps) {
  return (
    <header className={`bg-white border-b border-gray-200 fixed top-0 right-0 z-10 transition-all duration-300 ${
      collapsed ? 'left-16' : 'left-64'
    }`}>
      <div className="h-16 px-4 flex items-center justify-between">
        <div className="flex items-center flex-1">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar..." 
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="relative p-2 rounded-full hover:bg-gray-100">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
              <User size={18} />
            </div>
            <div className="hidden md:block">
              <p className="text-sm font-medium">Administrador</p>
              <p className="text-xs text-gray-500">admin@sistema.com</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
