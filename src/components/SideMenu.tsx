'use client'
import { useRouter } from 'next/navigation'
import { BiRightArrowAlt as Arrow } from 'react-icons/bi'
import { FiFile as FileIcon } from 'react-icons/fi'
import { Icon } from './ui/Icon'

interface MenuProps {
  folder: string
  roots: string[]
}

const SideMenu = ({ folder, roots }: MenuProps) => {

    const root = roots.map((item) => item.slice(0, -3))
    const name = folder[0].toUpperCase() + folder.slice(1);

    const router = useRouter()

  return (
    <div className="flex flex-col sticky top-0 py-4 items-center justify-start w-full px-3">
      <h1 className="text-4xl font-bold mb-4"> {name}: </h1>
      <div>
        <ul>
          {
            root.map((item, i) => (
              <li key={i} className={`my-3 hover:scale-110 hover:underline hover:cursor-pointer py-3`}>
                <div onClick={() => router.push(`/${item}`)} >
                  <div className={`flex items-center space-x-4`}>
                    <div className="flex-shrink-0">
                      <Icon icon={FileIcon} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item ? getName(item) : ''}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold ">
                      <Icon icon={Arrow} />
                    </div>
                  </div>
                </div>
              </li>
            ))
          }
        </ul>
      </div>

    </div>
  )
}

const getName = (item: string) => {
  const newItem = item.substring(item.lastIndexOf("/") + 1)
  return newItem.split('_').join(" ")
}


export default SideMenu