import AppCard from "./components/appcard";
import StatusCard from "./components/statuscard";

export default function Status({ AppData }) {
  const AppList = Object.values(AppData);
  
  return (
    <main>
      <h1>Status</h1>
      <section className="
        w-full mt-2 gap-5 flex overflow-x-auto snap-x snap-mandatory scroll-smooth pb-2
        md:grid md:grid-cols-2 md:overflow-x-visible md:snap-none md:pb-0
        lg:mt-3
        2xl:grid-cols-4
      ">
        <StatusCard>
          <h2 className="text-accent">Online</h2>
          <div className="flex flex-col gap-3 mt-2">
            {AppList.filter(app => app.status === "online").map(app => (
              <AppCard key={app.app_name} AppName={app.app_name} AppURL={app.app_url} />
            ))}
          </div>
        </StatusCard>
        <StatusCard>
          <h2 className="text-warning">Development</h2>
          <div className="flex flex-col gap-3 mt-2">
            {AppList.filter(app => app.status === "dev").map(app => (
              <AppCard key={app.app_name} AppName={app.app_name} AppURL={app.app_url} />
            ))}
          </div>
        </StatusCard>
        <StatusCard>
          <h2 className="text-danger">Error</h2>
          <div className="flex flex-col gap-3 mt-2">
            {AppList.filter(app => app.status === "error").map(app => (
              <AppCard key={app.app_name} AppName={app.app_name} AppURL={app.app_url} />
            ))}
          </div>
        </StatusCard>
        <StatusCard>
          <h2 className="text-text-secondary">Offline</h2>
          <div className="flex flex-col gap-3 mt-2">
            {AppList.filter(app => app.status === "offline").map(app => (
              <AppCard key={app.app_name} AppName={app.app_name} AppURL={app.app_url} />
            ))}
          </div>
        </StatusCard>
      </section>
    </main>
  )
}