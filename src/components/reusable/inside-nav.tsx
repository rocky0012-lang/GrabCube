import Image from "next/image"
import { DropdownAccountCardSM } from './account-card'

const InsideNav = () => {
  return (
    <nav className="flex h-screen w-full items-start justify-between px-8 pt-6">
      <Image 
          src="/images/CubeGrab.png"
          alt="onboard-Logo"
          height={78}
          width={78}
          priority
          />
      <DropdownAccountCardSM />
    </nav>
  )
}

export default InsideNav
