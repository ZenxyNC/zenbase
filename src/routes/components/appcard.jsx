import { useNavigate } from "react-router-dom";
import { IoWarning } from "react-icons/io5";
import { useState } from "react";

export default function AppCard({
  appName,
  appIconUrl,
  appUrl,
  status,
  lastUpdated,
  currentVersion
}) {
  const navigate = useNavigate();
  const [hasIconError, setHasIconError] = useState(false);

  function getClassByStatus(status) {
    switch (status) {
      case "online":
        return "bg-accent/12 text-accent";
      case "dev":
        return "bg-warning/12 text-warning";
      case "error":
        return "bg-danger/12 text-danger";
      case "offline":
        return "bg-text-primary/12 text-text-secondary";
      default:
        return "bg-text-primary/12 text-text-secondary";
    }
  }

  function OpenEditPage(e) {
    e.stopPropagation();
    navigate(`/application/edit/${appName.toLowerCase()}`);
  }

  function getMonthName(monthStr) {
    const MONTH_NAMES = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const mNum = parseInt(monthStr, 10);
    return !isNaN(mNum) && mNum >= 1 && mNum <= 12 ? MONTH_NAMES[mNum - 1] : monthStr;
  }

  return (
    <div className="
      h-max bg-secondary border border-border rounded-outer p-5 cursor-pointer
    "
    onClick={(e) => OpenEditPage(e)}
    >
      <div className="flex justify-between">
        {appIconUrl && !hasIconError ? (
          <img 
            src={appIconUrl}
            alt={appName}
            className="w-14 h-14 aspect-square rounded-xl border border-border"
            onError={() => setHasIconError(true)}
          />
        ) : (
          <div
            className="w-14 h-14 flex items-center justify-center rounded-xl border border-border"
          >
            <IoWarning className="text-danger" size={24} />
          </div>
        )}

        <div className={`w-max h-max px-3 py-1 rounded-full ${getClassByStatus(status)} text-sm font-semibold`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </div>
      </div>
      <div className="mt-3">
        <span className="font-bold text-text-primary text-[20px]">{appName}</span><br/>
        <a 
        onClick={() => window.open(appUrl, "_blank")}
        className="
          text-sm truncate block text-text-secondary cursor-pointer transition-all ease-in-out duration-200
          hover:text-text-primary hover:underline hover:decoration-dashed hover:underline-offset-4 hover:decoration-text-primary
        ">{appUrl}</a>
      </div>
      <div className="w-full h-px bg-border rounded-full mt-3"></div>
      <div className="mt-3 flex items-center justify-between">
        <div
          className="w-max h-max px-3 py-1 bg-primary border border-border rounded-full text-sm font-semibold"
        >v{currentVersion}</div>
        <span className="text-sm font-medium text-text-secondary">{getMonthName(lastUpdated.month)} {lastUpdated.day}, {lastUpdated.year}</span>
      </div>
    </div>
  )
}