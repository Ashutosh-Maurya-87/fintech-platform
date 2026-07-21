import { Outlet, Link, useLocation } from 'react-router-dom';

const DashboardLayout = () => {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'Overview' },
    { path: '/los', label: 'Loan Origination' },
    { path: '/lms', label: 'Loan Management' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-10 text-blue-400">FinTech OS</h1>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path} className={`block p-3 rounded-lg transition ${location.pathname === item.path ? 'bg-blue-600' : 'hover:bg-slate-800'}`}>
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1">
        <header className="bg-white border-b p-6 flex justify-between items-center shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800">Dashboard</h2>
          <div className="bg-slate-100 px-4 py-2 rounded-full text-sm font-medium">Ashutosh Maurya</div>
        </header>
        <div className="p-8"><Outlet /></div>
      </main>
    </div>
  );
};
export default DashboardLayout;