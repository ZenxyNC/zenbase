import { Input, TextArea } from "./inputfield";

const STATUS_OPTIONS = [
  {
    key: "online",
    label: "Online",
    description: "Ready for public use",
    color: "#007AFF",
    backgroundColor: "rgba(0,122,255,0.12)",
  },
  {
    key: "dev",
    label: "Dev",
    description: "Under development",
    color: "#D8A600",
    backgroundColor: "rgba(216,166,0,0.12)",
  },
  {
    key: "error",
    label: "Error",
    description: "Unusable due to an error",
    color: "#FF393D",
    backgroundColor: "rgba(255,57,61,0.12)",
  },
  {
    key: "offline",
    label: "Offline",
    description: "Not available",
    color: "rgba(245,245,245,0.4)",
    backgroundColor: "rgba(245,245,245,0.12)",
    border: "rgba(245,245,245)",
  },
];

export default function AppDetailsForm({
  AppDetails,
  handleField,
  handleDateChange,
  formatToHtmlDate,
  handleSave,
}) {
  return (
    <div className="
      w-full h-max mt-4 p-5 pt-4 rounded-outer bg-secondary border border-border
      lg:p-6 lg:pt-4
    ">
      <h2>App Details</h2>

      <form className="mt-3 flex flex-col gap-3" onSubmit={handleSave}>

        {/* Row 1 — App Name | Current Version */}
        <div className="flex flex-col gap-3 lg:flex-row">
          <Input
            label="App Name"
            id="app_name"
            name="app_name"
            type="text"
            placeholder="Zen..."
            value={AppDetails.app_name || ""}
            onChange={(e) => handleField("app_name", e.target.value)}
            required={true}
          />
          <Input
            label="Current Version"
            id="current_version"
            name="current_version"
            type="text"
            placeholder="1.0.0"
            value={AppDetails.current_version || ""}
            onChange={(e) => handleField("current_version", e.target.value)}
            required={true}
          />
        </div>

        {/* Row 2 — App URL | App Icon URL | Release Date | Last Updated */}
        <div className="flex flex-col gap-3 lg:flex-row">
          <Input
            label="App URL"
            id="app_url"
            name="app_url"
            type="url"
            placeholder="https://zenxync.github.io/..."
            value={AppDetails.app_url || ""}
            onChange={(e) => handleField("app_url", e.target.value)}
            required={true}
          />
          <Input
            label="App Icon (URL)"
            id="app_icon_url"
            name="app_icon_url"
            type="url"
            placeholder="https://..."
            value={AppDetails.app_icon_url || ""}
            onChange={(e) => handleField("app_icon_url", e.target.value)}
            required={true}
          />
          <Input
            label="Release Date"
            id="release_date"
            name="release_date"
            type="date"
            value={formatToHtmlDate(AppDetails.release_date)}
            onChange={(e) => handleDateChange("release_date", e.target.value)}
            required={true}
          />
          <Input
            label="Last Updated"
            id="last_updated"
            name="last_updated"
            type="date"
            value={formatToHtmlDate(AppDetails.last_updated)}
            onChange={(e) => handleDateChange("last_updated", e.target.value)}
            required={true}
          />
        </div>

        {/* Row 3 — Description | Current Status */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">

          {/* Description — tall textarea */}
          <div className="w-full lg:w-1/2">
            <TextArea
              label="Description"
              id="description"
              name="description"
              placeholder="Enter a short description..."
              value={AppDetails.description || ""}
              onChange={(e) => handleField("description", e.target.value)}
              required={true}
              className="min-h-32 lg:h-full"
            />
          </div>

          {/* Current Status — 2×2 grid of cards */}
          <div className="flex flex-col gap-1 w-full lg:w-1/2">
            <label className="text-text-secondary text-sm">
              Current Status<span className="text-danger">*</span>
            </label>
            <div className="grid grid-cols-2 gap-2 flex-1">
              {STATUS_OPTIONS.map((status) => {
                const isSelected = AppDetails.status === status.key;
                return (
                  <button
                    key={status.key}
                    type="button"
                    onClick={() => handleField("status", status.key)}
                    className={`
                      flex flex-col gap-1 p-3 pt-2 rounded-inner border-2 text-left transition-all duration-200 overflow-hidden
                    `}
                    style={{
                      border: isSelected ? `1px solid ${status.border ? status.border : status.color}` : "1px solid var(--color-border)",
                      backgroundColor: isSelected ? `${status.backgroundColor}` : "rgb(245,245,245,0.01)"
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <span
                        className="w-2 h-2 rounded-full shrink-0"
                        style={{ backgroundColor: status.color, boxShadow: `0px 0px 40px 6px ${status.color}` }}
                      />
                      <span
                        className="font-semibold text-[16px]"
                        style={{ color: status.color }}
                      >
                        {status.label}
                      </span>
                    </div>
                    <span className="text-text-secondary text-sm leading-tight">
                      {status.description}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Row 4 — Actions */}
        <div className="flex flex-col-reverse gap-2 mt-2 lg:flex-row">
          <button
            type="submit"
            className="w-full h-10 px-6 bg-accent rounded-inner font-bold text-text-primary lg:w-max"
          >
            Save Changes
          </button>
          <button
            type="button"
            className="w-full h-10 px-4 bg-transparent font-medium text-text-secondary lg:w-max"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}
