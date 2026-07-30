import StatusCard from "./statusCard";

export default function Status({ AppData }) {
  const appsArray = Object.values(AppData || {});

  const AppStatus = {
    online: 0,
    dev: 0,
    error: 0,
    offline: 0,
    total: 0
  };

  // Hitung status secara deklaratif/langsung setiap render
  for (let i = 0; i < appsArray.length; i++) {
    const app = appsArray[i];
    if (app.status === "online") {
      AppStatus.online++;
    } else if (app.status === "dev") {
      AppStatus.dev++;
    } else if (app.status === "error") {
      AppStatus.error++;
    } else if (app.status === "offline") {
      AppStatus.offline++;
    }
    AppStatus.total++;
  }
  
  return (
    <section className="flex flex-col w-full">
      <h2 className="ml-3 mb-2">Status</h2>
      <div className="w-full flex-1 bg-secondary rounded-outer border border-border p-5">
        <div className="
          w-full h-max grid grid-cols-2 gap-4
          md:grid-cols-3
          lg:grid-cols-1
          xl:grid-cols-1
          2xl:grid-cols-3
        ">
          <StatusCard status="online" color="accent" amount={AppStatus.online} />
          <StatusCard status="dev" color="warning" amount={AppStatus.dev} />
          <StatusCard status="error" color="danger" amount={AppStatus.error} />
          <StatusCard status="offline" color="text-secondary" amount={AppStatus.offline} />
          <StatusCard status="Total Apps" color="text-primary" amount={AppStatus.total} className="col-span-2 lg:col-span-1 2xl:col-span-2" />
        </div>
      </div>
    </section>
  )
}