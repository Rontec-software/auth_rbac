import { ReactNode } from "react"

export interface DropdownMenuItem {
  label: string
  href: string
  content?: ReactNode
  icon: ReactNode
}

export interface SecondaryMenu {
  [key: string]: DropdownMenuItem[]
}
