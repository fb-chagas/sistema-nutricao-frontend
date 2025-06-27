import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  FilePlus,
  Calendar,
  BarChart4,
  Settings,
  LogOut,
} from 'lucide-react';

interface SidebarProps {
  collapsed: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ collapsed, toggleSidebar }: SidebarProps) {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/' },
    { name: 'Cadastro NFe', icon: <FileText size={20} />, path: '/cadastro-nfe' },
    { name: 'Contratos', icon: <FilePlus size={20} />, path: '/contratos' },
    { name: 'Controle Mensal', icon: <Calendar size={20} />, path: '/controle-mensal' },
    { name: 'Fechamento', icon: <BarChart4 size={20} />, path: '/fechamento' },
  ];

  return (
    <aside
      className={`bg-slate-800 text-white h-screen transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } fixed left-0 top-0 z-10`}
    >
      <div className="flex items-center justify-between p-4 border-b border-slate-700">
        {!collapsed && <h1 className="text-xl font-bold">Nutrição FSG</h1>}
        <button
          onClick={toggleSidebar}
          className="p-1 rounded-full hover:bg-slate-700"
        >
          {collapsed ? '→' : '←'}
        </button>
      </div>

      <nav className="mt-6">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className="mb-2">
              <Link
                to={item.path}
                className="flex items-center px-4 py-3 hover:bg-slate-700 transition-colors"
              >
                <span className="mr-3">{item.icon}</span>
                {!collapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full border-t border-slate-700 p-4">
        <div className="flex items-center">
          <button className="flex items-center hover:bg-slate-700 p-2 rounded w-full">
            <Settings size={20} className="mr-3" />
            {!collapsed && <span>Configurações</span>}
          </button>
        </div>
        <div className="flex items-center mt-2">
          <button className="flex items-center hover:bg-slate-700 p-2 rounded w-full text-red-400">
            <LogOut size={20} className="mr-3" />
            {!collapsed && <span>Sair</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

