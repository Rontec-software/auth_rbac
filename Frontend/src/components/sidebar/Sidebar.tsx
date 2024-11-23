import Link from 'next/link';
export const Sidebar = () => {
  return (
    <aside className="w-64  border-r border-gray-600">
      <div className="flex items-center justify-between p-8">
        <div className="h-20 w-20 bg-gray-600 rounded-full"></div>
      </div>
      <nav className="p-4 mt-4">
        <ul className="space-y-4">
          <li>
            <Link href="/user">User</Link>
          </li>
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/user">User</a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
