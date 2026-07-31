import { useParams, useMatch } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

// --- Components ---
import Navside from "./navigation/navside";
import TopBar from "./navigation/topbar";

// --- Pages ---
import Dashboard from "./dashboard/dashboard";
import Applications from "./applications/applications";
import AddApp from "./applications/addApp";
import EditApp from "./applications/editApp";
import ZenEngineAlert from "../zenengine/alerts";
import Status from "./status/status";


export default function Base() {
  const { page } = useParams();
  const editMatch = useMatch("/application/edit/:app_name");
  const editAppName = editMatch?.params?.app_name ?? null;
  const devtools_FETCHAPI = true;
  const allowAPIFetch = false;
  const [AppData, setAppData] = useState({});
  const [availabilityStatus, setAvailabilityStatus] = useState("not_available");
  const [originAvailabilityStatus, setOriginAvailabilityStatus] = useState("not_available");
  const skipNextUpload = useRef(false);

  useEffect(() => {
    const localUserInfo = localStorage.getItem("zenbase-user-info");
    if (!localUserInfo) {
      window.location.href = "https://zenxync.github.io/zenaccount/loginprovider?appOrigin=zenbase";
    }

    if(!devtools_FETCHAPI) {
      return;
    }

    async function validateUserInfo() {
      try {
        const res = await fetch(import.meta.env.VITE_JSONBIN_USERINFO_URL, {
          "method": "GET",
          "headers": {
            "X-Master-Key": import.meta.env.VITE_JSONBIN_MASTER_KEY
          }
        });
        const data = await res.json();
        const findUser = data.record.users.find(user => user.username.toLowerCase() === JSON.parse(localUserInfo).username.toLowerCase());
        console.log('DB Fetched: user info');
        if(!findUser) {
          return window.location.href = "https://zenxync.github.io/zenaccount/loginprovider?appOrigin=zenbase";
        }

        // Compare local-saved info and server-saved info
        if(JSON.parse(localUserInfo).password_hashed !== findUser.password_hashed) {
          return window.location.href = "https://zenxync.github.io/zenaccount/loginprovider?appOrigin=zenbase";
        }

        allowAPIFetch = true;
      } catch (error) {
        console.error("Error fetching user info from JSONBin:", error);
        allowAPIFetch = false;
      }
    }
    validateUserInfo();
  }, [])

  useEffect(() => {
    async function fetchApps() {
      try {
        const res = await fetch(import.meta.env.VITE_JSONBIN_URL, {
          "method": "GET",
          "headers": {
            "X-Master-Key": import.meta.env.VITE_JSONBIN_MASTER_KEY
          }
        });
        const data = await res.json();
        console.log('DB Fetched: apps');
        skipNextUpload.current = true;
        setAppData(data.record);
      } catch (error) {
        console.error("Error fetching apps from JSONBin:", error);
      }
    }

    async function fetchAvailability() {
      try {
        const res = await fetch(import.meta.env.VITE_JSONBIN_AVAILABILITY_URL, {
          "method": "GET",
          "headers": {
            "X-Master-Key": import.meta.env.VITE_JSONBIN_MASTER_KEY
          }
        });
        const data = await res.json();
        console.log('DB Fetched: availability');
        setAvailabilityStatus(data.record.availability);
        setOriginAvailabilityStatus(data.record.availability);
      } catch (error) {
        console.error("Error fetching availability from JSONBin:", error);
      }
    }
    
    if(devtools_FETCHAPI && allowAPIFetch) {
      fetchApps();
      fetchAvailability();
    }
    else {
      setAppData({
        "zencore": {
          "app_name": "ZenCore",
          "app_url": "https://zenxync.github.io/zencore",
          "app_icon_url": "https://raw.githubusercontent.com/ZenxyNC/zendocs/refs/heads/main/public/resources/AppIcon/zencore.png",
          "release_date": {
            "day": "6",
            "month": "6",
            "year": "2025"
          },
          "last_updated": {
            "day": "26",
            "month": "6",
            "year": "2026"
          },
          "current_version": "2.3.1",
          "status": "online",
          "description": "Productivity suite for ZenApps",
          "changelogs": [
            {
              "version": "2.3.1",
              "date": {
                "day": "26",
                "month": "6",
                "year": "2026"
              },
              "changes":[
                "changes-1",
                "changes-2",
                "changes-3",
                "changes-4",
                "changes-5"
              ]
            }
          ]
        }
      
      });
      setAvailabilityStatus("not_available");
      setOriginAvailabilityStatus("not_available");
    }
  }, []);

  // Listens to AppData changes
  useEffect(() => {
    if (devtools_FETCHAPI && allowAPIFetch && Object.keys(AppData).length > 0) {
      if (skipNextUpload.current) {
        skipNextUpload.current = false;
        return;
      }

      async function uploadApps() {
        try {
          const res = await fetch(import.meta.env.VITE_JSONBIN_URL, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key": import.meta.env.VITE_JSONBIN_MASTER_KEY
            },
            body: JSON.stringify(AppData),
          });

          if (res.ok) {
            console.log("Successfully uploaded changes to JSONBin.");
          } else {
            console.error("Failed to upload changes to JSONBin:", res.statusText);
          }
        } catch (error) {
          console.error("Error uploading to JSONBin:", error);
        }
      }

      uploadApps();
    }
  }, [AppData]);

  // Listens to availabilityStatus changes
  useEffect(() => {

    if (devtools_FETCHAPI && allowAPIFetch && availabilityStatus !== originAvailabilityStatus) {
      async function uploadAvailability() {
        try {
          const res = await fetch(import.meta.env.VITE_JSONBIN_AVAILABILITY_URL, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "X-Master-Key": import.meta.env.VITE_JSONBIN_MASTER_KEY
            },
            body: JSON.stringify({ availability: availabilityStatus }),
          });

          if (res.ok) {
            console.log("Successfully uploaded changes to JSONBin.");
          } else {
            console.error("Failed to upload changes to JSONBin:", res.statusText);
          }
        } catch (error) {
          console.error("Error uploading to JSONBin:", error);
        }
      }

      uploadAvailability();
    }
  }, [availabilityStatus])

  const [AlertStructure, setAlertStructure] = useState({
    isOpened: false,
    type: "success",
    title: "Operation Success",
    message: "The operation has been completed successfully.",
    placeholder: "Enter text...",
    actionOk: () => {
      console.log("Ok");
    },
    actionCancel: () => {
      console.log("Cancel");
    }
  });

  function openAlert({
    type, 
    title, 
    message, 
    placeholder = "Enter text...", 
    actionOk = () => {}, 
    actionCancel = () => {}
  } = {}) {
    setAlertStructure(prev => ({
      ...prev,
      type,
      title,
      message,
      placeholder,
      actionOk,
      actionCancel,
      isOpened: true,
    }))
  }

  function getPageComponent() {
    if (editAppName) {
      return <EditApp appName={editAppName} AppData={AppData} setAppData={setAppData} openAlert={openAlert}/>;
    }
    switch(page) {
      case "dashboard":
        return <Dashboard AppData={AppData} setAppData={setAppData} availabilityStatus={availabilityStatus} setAvailabilityStatus={setAvailabilityStatus} />;
      case "applications":
        return <Applications AppData={AppData} setAppData={setAppData} />;
      case "status":
        return <Status AppData={AppData} />;
      default:
        return <Dashboard AppData={AppData} setAppData={setAppData} availabilityStatus={availabilityStatus} setAvailabilityStatus={setAvailabilityStatus} />;
    }
  }

  return(
    <>
      <Navside />
      <TopBar />
      <AddApp 
        AppData={AppData} 
        setAppData={setAppData} 
        openAlert={openAlert}
      />
      <ZenEngineAlert
        AlertStructure={AlertStructure}
        setAlertStructure={setAlertStructure}
      >
        {AlertStructure.message}
      </ZenEngineAlert>
      <main
        className="
          w-screen h-max mt-18 p-6 pt-0
          lg:m-0 lg:w-[calc(100%-270px)] lg:px-20 lg:pt-6 lg:ml-67.5
          xl:px-50
        ">
        {getPageComponent()}
      </main>
    </>
  )
}