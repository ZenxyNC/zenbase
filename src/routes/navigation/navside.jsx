import Navigator from "./components/navigator";
import Profile from "./components/profile";

export default function Navside() {

  return (
    <nav
      className="
        hidden w-67.5 h-full bg-primary border-r border-border fixed top-0 left=0 p-6
        lg:block
      "
    >
      <a href="/zenbase/dashboard" className="flex items-center gap-3">
        <img src="/ZenBase.png" alt="Logo" className="w-10" />
        <h2 className="font-light">ZenBase</h2>
      </a>
      <Navigator className="mt-6" />
      <div className="absolute bottom-6 w-[calc(100%-48px)]">
        <Profile />
      </div>
    </nav>
  )
}