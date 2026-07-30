import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Input, TextArea } from './components/inputfield';
import { IoCloseOutline } from "react-icons/io5";

export default function AddApp({ AppData, setAppData, openAlert }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [NewApp, setNewApp] = useState({
    app_name: "",
    app_url: "",
    app_icon_url: "",
    release_date: null,
    last_updated: null,
    current_version: "",
    status: "online",
    description: "",
    changelogs: []
  })

  function closeAddApp() {
    setNewApp({
      app_name: "",
      app_url: "",
      app_icon_url: "",
      release_date: null,
      last_updated: null,
      current_version: "",
      status: "online",
      description: "",
      changelogs: []
    })
    navigate(location.pathname);
  }

  function formatToHtmlDate(dateVal) {
    if (!dateVal) return "";
    if (typeof dateVal === "string") {
      if (/^\d{4}-\d{2}-\d{2}$/.test(dateVal)) return dateVal;
      return "";
    }
    const { year, month, day } = dateVal;
    if (!year || !month || !day) return "";
    const monthMap = {
      january: "01", jan: "01", "1": "01", "01": "01",
      february: "02", feb: "02", "2": "02", "02": "02",
      march: "03", mar: "03", "3": "03", "03": "03",
      april: "04", apr: "04", "4": "04", "04": "04",
      may: "05", "5": "05", "05": "05",
      june: "06", jun: "06", "6": "06", "06": "06",
      july: "07", jul: "07", "7": "07", "07": "07",
      august: "08", aug: "08", "8": "08", "08": "08",
      september: "09", sep: "09", "9": "09", "09": "09",
      october: "10", oct: "10", "10": "10",
      november: "11", nov: "11", "11": "11",
      december: "12", dec: "12", "12": "12"
    };
    const mStr = String(month).toLowerCase().trim();
    const mPadded = monthMap[mStr] || String(month).padStart(2, '0');
    const dPadded = String(day).padStart(2, '0');
    return `${year}-${mPadded}-${dPadded}`;
  }

  function handleDateChange(field, dateString) {
    if (!dateString) {
      setNewApp((prev) => ({ ...prev, [field]: null }));
      return;
    }
    const [year, month, day] = dateString.split("-");
    setNewApp((prev) => ({
      ...prev,
      [field]: {
        day: String(parseInt(day, 10)),
        month: String(parseInt(month, 10)),
        year: year
      }
    }));
  }

  function addNewApp(e) {
    e.preventDefault();
    closeAddApp();

    // Check if app already exists
    const apps = Object.values(AppData);
    let appFound = false;
    for (let i = 0; i < apps.length; i++) {
      if (apps[i].app_name.toLowerCase() === NewApp.app_name.toLowerCase()) {
        appFound = true;
        break;
      }
    }

    if(appFound) {
      openAlert({
        type: "error",
        title: "App Already Exists",
        message: `App "${NewApp.app_name}" already exists in the list. Use a different name for the new app.`
      })
      return;
    }

    const appKey = NewApp.app_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setAppData({
      ...AppData,
      [appKey]: NewApp
    });
  }
  
  return(
    <>
      <div className={`
        ${location.hash === "#add_app" ? "opacity-100 backdrop-blur-lg" : "opacity-0 pointer-events-none"}
        fixed top-0 left-0 p-6 w-screen h-screen bg-black/24 z-40 flex items-center justify-center transition-all duration-300 ease-in-out
        md:p-0
      `}>
        <div className={`
          ${location.hash === "#add_app" ? "scale-100 blur-none" : "scale-85 blur-md"}
          w-full max-w-125 h-max p-6 pt-4 bg-secondary border border-border rounded-outer transition-all duration-300 ease-in-out
          lg:w-150 lg:max-w-[unset]
        `}>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg">Add New App</h2>
            <button
              type='button'
              onClick={closeAddApp}
              className="w-max h-max flex items-center justify-center text-text-secondary text-lg cursor-pointer hover:text-text-primary transition-all ease-in-out duration-325"
            >
              <IoCloseOutline size={24}/>
            </button>
          </div>
          <form className='mt-2' onSubmit={(e) => addNewApp(e)}>
            <Input
              label="App Name"
              type="text"
              name="app_name"
              id="app_name"
              placeholder="Zen..."
              required={true}
              value={NewApp.app_name}
              onChange={(e) => setNewApp({...NewApp, app_name: e.target.value})}
            />

            <div className='flex gap-3 mt-2'>
              <Input
                label="App URL"
                type="url"
                name="app_url"
                id="app_url"
                placeholder="https://zenxync.github.io/..."
                required={true}
                value={NewApp.app_url}
                onChange={(e) => setNewApp({...NewApp, app_url: e.target.value})}
              />
              <Input
                label="App Icon URL"
                type="url"
                name="app_icon_url"
                id="app_icon_url"
                placeholder="Enter app icon url"
                required={true}
                value={NewApp.app_icon_url}
                onChange={(e) => setNewApp({...NewApp, app_icon_url: e.target.value})}
              />
            </div>

            <div className='
              mt-2 flex flex-col gap-3
              md:flex-row-reverse md:gap-3 md:items-stretch
            '>
              <div className='
                w-full flex flex-col gap-2
                lg:w-[calc(50%-8px)]
              '>
                <Input
                  label="Current Version"
                  type="text"
                  name="current_version"
                  id="current_version"
                  placeholder="1.0.0"
                  required={true}
                  value={NewApp.current_version}
                  onChange={(e) => setNewApp({...NewApp, current_version: e.target.value})}
                />
                <Input
                  label="Release Date"
                  type="date"
                  name="release_date"
                  id="release_date"
                  placeholder="Enter release date"
                  required={true}
                  value={formatToHtmlDate(NewApp.release_date)}
                  onChange={(e) => handleDateChange("release_date", e.target.value)}
                />
                <Input
                  label="Last Updated"
                  type="date"
                  name="last_updated"
                  id="last_updated"
                  placeholder="Enter last updated date"
                  required={true}
                  value={formatToHtmlDate(NewApp.last_updated)}
                  onChange={(e) => handleDateChange("last_updated", e.target.value)}
                />
              </div>
              <div className="md:flex-1 w-full flex flex-col lg:w-[calc(50%-8px)]">
                <TextArea
                  label="Description"
                  name="description"
                  id="description"
                  placeholder="Enter description"
                  required={true}
                  value={NewApp.description}
                  onChange={(e) => setNewApp({...NewApp, description: e.target.value})}
                />
              </div>
            </div>
            <div className='mt-6 flex justify-end gap-3'>
              <button 
                type='reset'
                onClick={closeAddApp}
                className="w-max h-10 px-4 py-0 bg-transparent font-medium text-text-secondary"
              >
                Cancel
              </button>
              <button 
                type='submit'
                className="w-max h-10 px-4 py-0 bg-accent rounded-inner font-bold text-text-primary"
              >
                Add { NewApp.app_name || "App" }
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}