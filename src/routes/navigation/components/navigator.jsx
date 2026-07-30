import { useMatch, useNavigate, useParams } from "react-router-dom"

export default function Navigator({ className, setIsOpened }) {
  const { page } = useParams();
  const navigate = useNavigate();
  const editMatch = useMatch("/application/edit/:app_name");

  function redirect(path) {
    if(setIsOpened) setIsOpened(false);
    navigate(path)
  }

  return (
    <div className={` ${className}
      w-full h-max flex flex-col gap-3
    `}>
      <button
        onClick={() => redirect("/dashboard")}
        className={`
          w-full h-12 rounded-inner ${page === "dashboard" || !page && !editMatch ? "bg-accent/12 text-accent font-bold" : "bg-transparent text-text-secondary"} relative flex items-center p-5 cursor-pointer transition-all duration-300
      `}>
        Dashboard
      </button>
      <button
        onClick={() => redirect("/applications")}
        className={`
          w-full h-12 rounded-inner ${page === "applications" || editMatch ? "bg-accent/12 text-accent font-bold" : "bg-transparent text-text-secondary"} relative flex items-center p-5 cursor-pointer transition-all duration-300
      `}>
        Applications
      </button>
      <button
        onClick={() => redirect("/status")}
        className={`
          w-full h-12 rounded-inner ${page === "status" ? "bg-accent/12 text-accent font-bold" : "bg-transparent text-text-secondary"} relative flex items-center p-5 cursor-pointer transition-all duration-300
      `}>
        Status
      </button>
    </div>
  )
}