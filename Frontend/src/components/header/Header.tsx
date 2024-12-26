import { IconSearch, IconUserShield } from '@tabler/icons-react'

export const Header = () => {
  const user = { name: 'Usuário', email: 'email@gmail.com' }
  return (
    <header className="flex items-center justify-between h-16 px-8 mt-2 w-full">
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <link rel="manifest" href="/site.webmanifest" />
      <h1>Administrador</h1>
      <div className="flex items-center space-x-4 p-4">
        <IconSearch />
        <div className="w-1 h-12 bg-gray-300 mx-1"></div>
        <div className="flex flex-row items-center space-x-1">
          <div className="flex justify-center items-center h-10 w-10 bg-gray-600 rounded-full">
            <IconUserShield size={24} />
          </div>
          <div className="flex flex-col">
            <span className="font-bold ">{user.name}</span>
            <span className="opacity-50 text-xs">{user.email}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
