import { useNavigate } from "react-router-dom";
import AppCard from "../components/appcard";
import Availability from "./components/availability";
import Status from "./components/status";


export default function Dashboard({ AppData, setAppData, availabilityStatus, setAvailabilityStatus }) {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Dashboard</h1>
      <section className="
        w-full h-max mt-2
        lg:mt-3
      ">
        <div className="flex items-center justify-between lg:px-3">
          <h2 className="text-text-primary">Applications</h2>
          <a
            onClick={() => navigate("/applications")}
            className="text-text-secondary text-sm cursor-pointer hover:text-text-primary transition-all ease-in-out duration-200"
          >
            View all apps
          </a>
        </div>
        <div className="
          mt-4 grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
        ">
          {
            Object.entries(AppData).slice(0, 4).map(([key, value]) => (
              <AppCard
                key={key}
                appName={value.app_name}
                appIconUrl={value.app_icon_url}
                appUrl={value.app_url}
                status={value.status}
                lastUpdated={value.last_updated}
                currentVersion={value.current_version}
              />
            ))
          }
        </div>
      </section>
      <div
        className="
          w-full h-max min-h-100 mt-8 flex flex-col gap-4
          lg:min-h-[unset] lg:flex-row lg:gap-5 lg:items-stretch
        ">
        <Availability availabilityStatus={availabilityStatus} setAvailabilityStatus={setAvailabilityStatus} />
        <Status AppData={AppData}/>
      </div>
    </main>
  )
}