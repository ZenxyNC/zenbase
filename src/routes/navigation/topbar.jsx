import { useState } from "react"
import { HiOutlineMenuAlt4 } from "react-icons/hi";
import Navigator from "./components/navigator";
import Profile from "./components/profile";
import ZenBase from "../../assets/ZenBase.png"

export default function TopBar() {
  const [isOpened, setIsOpened] = useState(false)
  return (
    <nav 
      className={`
        fixed top-0 left-0 w-full 
        ${isOpened ? "h-dvh" : "h-15"} 
        bg-primary/60 border-b border-border backdrop-blur-3xl overflow-hidden transition-all ease-in-out duration-300
        lg:hidden
    `}>
      <div className="h-15 flex justify-between items-start p-3">
        <a href="/zenbase/dashboard" className="flex items-center gap-3">
          <img src={ZenBase} alt="Logo" className="w-9" />
          <h2 className="font-light">ZenBase</h2>
        </a>
        <button
          onClick={() => setIsOpened(!isOpened)}
          className="p-2 rounded-sm hover:bg-border/40">
          <HiOutlineMenuAlt4 size={20} color="var(--color-text-secondary)" />
        </button>
      </div>
      <div className={`h-[calc(100dvh-60px)] w-full flex-col justify-between p-6 pt-5 ${isOpened ? "flex" : "hidden"}`}>
        <div className="w-full">
          <Navigator setIsOpened={setIsOpened}/>
        </div>
        <div className="relative">
          <Profile />
        </div>
      </div>
    </nav>
  )
}