import { FC } from 'react'
import { useRouter } from 'next/navigation'

interface SecondaryMenuProps {
  items: { label: string; href: string }[]
}

const SecondaryMenu: FC<SecondaryMenuProps> = ({ items }) => {
  const router = useRouter()

  return (
    <div className="flex flex-col space-y-2">
      {items.map((item, index) => (
        <button
          key={index}
          className="px-4 py-2 text-left text-gray-200 bg-gray-700 rounded-md hover:bg-gray-600"
          onClick={() => router.push(item.href)}
        >
          {item.label}
        </button>
      ))}
    </div>
  )
}

export default SecondaryMenu
