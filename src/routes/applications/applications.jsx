import { Link } from "react-router-dom";
import AppCard from "../components/appcard";
import { IoAddCircle } from "react-icons/io5";

export default function Applications({ AppData }) {

  return (
    <main>
      <h1>Applications</h1>
      <section className="
        w-full h-max mt-2
        lg:mt-3
      ">
        <div className="
          mt-4 grid gap-5 grid-cols-[repeat(auto-fill,minmax(280px,1fr))]
        ">
          {/* Add App */}
          <Link to='#add_app' className="
            h-full bg-transparent border-2 border-dashed border-text-primary/24 box-border rounded-outer p-5 flex items-center justify-center hover:scale-102 hover:border-accent text-text-secondary hover:text-accent transition-all duration-300 cursor-pointer"
          >
            <IoAddCircle className="w-12 h-12 text-inherit transition-all duration-300"/>
          </Link>

          {/* Apps */}
          {
            Object.entries(AppData).map(([key, value]) => (
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
    </main>
  )
}