export default function Availability({ availabilityStatus, setAvailabilityStatus }) {
  function updateAvailability(newStatus) {
    if(newStatus === availabilityStatus) return;
    else setAvailabilityStatus(newStatus);
  }

  return (
    <section className="flex flex-col w-full">
      <h2 className="ml-3 mb-2">Availability</h2>
      <div className="
        w-full flex flex-col justify-between flex-1 bg-secondary rounded-outer border border-border p-5
      ">
        <div
          className="
            w-full h-max flex flex-col gap-4 items-center justify-center
            md:flex-row md:h-30
            lg:flex-col lg:h-max
            2xl:flex-row 2xl:h-30
          ">
          <div
            role="button"
            onClick={() => updateAvailability("available")}
            className={`
              w-full h-25 p-3 border-2 ${availabilityStatus === "available" ? "border-accent bg-accent/12" : "border-border bg-text-primary/1"} rounded-inner flex flex-col overflow-hidden cursor-pointer transition-all duration-325
              md:h-full lg:h-25 2xl:h-full
            `}>
            <div id="status-tag" className="w-2 h-2 bg-accent rounded-full blue-shadow" />
            <span id="status-text" className="text-accent text-[20px] font-bold mt-2">Available</span>
            <p className="text-sm text-text-secondary">Open for work and projects.</p>          
          </div>

          <div
            role="button"
            onClick={() => updateAvailability("busy")}
            className={`
              w-full h-full p-3 border-2 ${availabilityStatus === "busy" ? "border-warning bg-warning/12" : "border-border bg-text-primary/1"} rounded-inner flex flex-col overflow-hidden cursor-pointer transition-all duration-325
              md:h-full lg:h-25 2xl:h-full
            `}>
            <div id="status-tag" className="w-2 h-2 bg-warning rounded-full yellow-shadow" />
            <span id="status-text" className="text-warning text-[20px] font-bold mt-2">Busy</span>
            <p className="text-sm text-text-secondary">Limited availability.</p>          
          </div>

          <div
            role="button"
            onClick={() => updateAvailability("not_available")}
            className={`
              w-full h-full p-3 border-2 ${availabilityStatus === "not_available" ? "border-danger bg-danger/12" : "border-border bg-text-primary/1"} rounded-inner flex flex-col overflow-hidden cursor-pointer transition-all duration-325
              md:h-full lg:h-25 2xl:h-full
              
            `}>
            <div id="status-tag" className="w-2 h-2 bg-danger rounded-full red-shadow" />
            <span id="status-text" className="text-danger text-[20px] font-bold mt-2">Not Available</span>
            <p className="text-sm text-text-secondary">Not available for work or projects.</p>          
          </div>
        </div>
        <div>
          <p className="text-sm text-text-secondary">
            Notion API couldn't be fetched. Please manually adjust the availability status.
          </p>
        </div>
      </div>
    </section>
  )
}