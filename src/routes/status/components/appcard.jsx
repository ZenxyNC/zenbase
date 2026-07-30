import { IoChevronForward } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function AppCard({ AppName, AppURL }) {
  const navigate = useNavigate();
  function OpenEditPage(e) {
    e.stopPropagation();
    navigate(`/application/edit/${AppName.toLowerCase()}`);
  }
  return (
    <div 
    onClick={(e) => OpenEditPage(e)}
    className="min-w-full md:min-w-0 md:w-full h-max bg-primary border border-border rounded-inner flex items-center justify-between p-4 py-2">
      <div className="flex flex-col gap-1 overflow-hidden">
        <div className="text-text-primary text-xl font-bold">{AppName}</div>
        <div className="text-text-secondary max-w-40 wrap-break-word">{AppURL}</div>
      </div>
      <div>
        <IoChevronForward className="text-text-secondary text-lg"/>
      </div>
    </div>
  )
}