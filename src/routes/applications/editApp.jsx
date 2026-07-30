import { IoChevronForwardOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Snackbar from "../../zenengine/snackbar";
import AppDetailsForm from "./components/AppDetailsForm";
import AddChangelogForm from "./components/AddChangelogForm";
import ChangelogsList from "./components/ChangelogsList";

export default function EditApp({
  appName,
  AppData,
  setAppData,
  openAlert
}) {
  const navigate = useNavigate();
  const [AppDetails, setAppDetails] = useState({});
  const today = new Date();
  const [snackbar, setSnackbar] = useState({
    isOpened: false,
    message: "",
    duration: 3000,
  });
  const [ChangelogDetails, setChangelogDetails] = useState({
    version: "",
    type: "stable",
    beta_stage: "",
    date: {
      month: String(today.getMonth() + 1),
      day: String(today.getDate()),
      year: String(today.getFullYear())
    },
    changes: []
  });

  useEffect(() => {
    if (!AppData || !AppData[appName]) return;
    setAppDetails(AppData[appName]);
  }, [AppData, appName]);

  // ── Shared date helpers ──────────────────────────────────────────────────

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

  function formatChangelogDate(dateVal) {
    if (!dateVal) return "";
    const MONTH_NAMES = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const { day, month, year } = dateVal;
    const mNum = parseInt(month, 10);
    const monthLabel = !isNaN(mNum) && mNum >= 1 && mNum <= 12
      ? MONTH_NAMES[mNum]
      : String(month).slice(0, 3);
    return `${day} ${monthLabel}, ${year}`;
  }

  // ── App Details handlers ─────────────────────────────────────────────────

  function handleField(field, value) {
    setAppDetails((prev) => ({ ...prev, [field]: value }));
  }

  function handleDateChange(field, dateString) {
    if (!dateString) {
      handleField(field, null);
      return;
    }
    const [year, month, day] = dateString.split("-");
    handleField(field, {
      day: String(parseInt(day, 10)),
      month: String(parseInt(month, 10)),
      year: year
    });
  }

  function handleSave(e) {
    e.preventDefault();
    const newKey = AppDetails.app_name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    setAppData((prev) => {
      const updated = { ...prev };
      if (newKey !== appName) {
        delete updated[appName];
      }
      updated[newKey] = AppDetails;
      return updated;
    });
    if (newKey !== appName) {
      navigate(`/application/edit/${newKey}`, { replace: true });
    }
    openSnackbar(`${AppDetails.app_name} updated successfully!`);
  }

  // ── Changelog handlers ───────────────────────────────────────────────────

  function handleDateChange_changelog(dateString) {
    if (!dateString) {
      setChangelogDetails((prev) => ({ ...prev, date: { month: "", day: "", year: "" } }));
      return;
    }
    const [year, month, day] = dateString.split("-");
    setChangelogDetails((prev) => ({
      ...prev,
      date: {
        day: String(parseInt(day, 10)),
        month: String(parseInt(month, 10)),
        year: year
      }
    }));
  }

  function saveChangelog(e) {
    e.preventDefault();
    const { version, type, beta_stage, date, changes } = ChangelogDetails;
    const fullVersion = type === "beta" ? `${version}-beta.${beta_stage || 0}` : version;
    const newEntry = {
      version: fullVersion,
      date,
      changes: changes.map((c) => c.description).filter(Boolean)
    };
    setAppData((prev) => ({
      ...prev,
      [appName]: {
        ...prev[appName],
        changelogs: [...(prev[appName].changelogs || []), newEntry]
      }
    }));
    // Reset form
    const resetDate = new Date();
    setChangelogDetails({
      version: "",
      type: "stable",
      beta_stage: "",
      date: {
        month: String(resetDate.getMonth() + 1),
        day: String(resetDate.getDate()),
        year: String(resetDate.getFullYear())
      },
      changes: []
    });
  }

  function addNewChanges() {
    const newID = ChangelogDetails.changes.length + 1;
    setChangelogDetails((prev) => ({
      ...prev,
      changes: [...prev.changes, { id: newID, description: "" }]
    }));
  }

  function editChanges(id, value) {
    setChangelogDetails((prev) => ({
      ...prev,
      changes: prev.changes.map((change) =>
        change.id === id ? { ...change, description: value } : change
      )
    }));
  }

  function deleteChanges(id) {
    setChangelogDetails((prev) => ({
      ...prev,
      changes: prev.changes.filter((change) => change.id !== id)
    }));
  }

  function getVersionPreview() {
    const { version, type, beta_stage } = ChangelogDetails;
    if (!version) return "";
    return `${version}-beta.${beta_stage ? beta_stage : 0}`;
  }

  // ── App deletion ─────────────────────────────────────────────────────────

  function deleteApp(appName) {
    const filteredAppData = Object.fromEntries(
      Object.entries(AppData).filter(([key]) => key !== appName)
    );
    setAppData(filteredAppData);
    navigate("/applications");
  }

  function HandleDeleteApp(appName) {
    openAlert({
      type: "confirmation",
      title: "Confirm Deletion",
      message: `Are you sure you want to delete ${appName}?`,
      actionOk: () => { deleteApp(appName); }
    });
  }

  // ── Snackbar ─────────────────────────────────────────────────────────────

  function openSnackbar(message) {
    setSnackbar(prev => ({ ...prev, isOpened: true, message }));
  }

  // ── Guard ─────────────────────────────────────────────────────────────────

  if (!AppData || !AppData[appName]) {
    return (
      <div className="flex items-center justify-center w-full h-48 text-text-secondary">
        Loading...
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}
      <header className="flex gap-2 items-end cursor-pointer">
        <h1 onClick={() => navigate("/applications")}>Applications</h1>
        <div className="flex gap-2 items-center mb-2">
          <IoChevronForwardOutline className="text-text-secondary text-lg" />
          <span className="text-text-secondary">{AppDetails.app_name || appName}</span>
        </div>
      </header>

      {/* App Details */}
      <AppDetailsForm
        AppDetails={AppDetails}
        handleField={handleField}
        handleDateChange={handleDateChange}
        formatToHtmlDate={formatToHtmlDate}
        handleSave={handleSave}
      />

      {/* Add Changelogs + Changelogs list */}
      <div className="flex flex-col xl:flex-row gap-5 mt-5">
        <AddChangelogForm
          ChangelogDetails={ChangelogDetails}
          setChangelogDetails={setChangelogDetails}
          formatToHtmlDate={formatToHtmlDate}
          handleDateChange_changelog={handleDateChange_changelog}
          saveChangelog={saveChangelog}
          addNewChanges={addNewChanges}
          editChanges={editChanges}
          deleteChanges={deleteChanges}
          getVersionPreview={getVersionPreview}
        />
        <ChangelogsList
          changelogs={AppData[appName].changelogs || []}
          formatChangelogDate={formatChangelogDate}
        />
      </div>

      {/* Danger Zone */}
      <div className="w-full h-px rounded-full bg-border mt-5"></div>
      <div className="mt-5">
        <h1>Danger Zone</h1>
        <div className="
          w-full h-max mt-4 p-5 pt-4 rounded-outer bg-secondary border border-border
          lg:p-6 lg:pt-4
        ">
          <h2 className="text-danger font-bold">Delete App</h2>
          <p className="text-text-secondary text-sm mt-1">
            Once you delete an app, there is no turning back.
            All of it's data will be permanently removed.
          </p>
          <button
            className="bg-danger text-text-primary font-bold tracking-wide mt-4 px-4 py-2 rounded-inner"
            onClick={() => HandleDeleteApp(AppDetails.app_name)}
          >
            Delete {AppDetails.app_name || appName}
          </button>
        </div>
      </div>

      {/* Snackbar */}
      {snackbar.isOpened &&
        <Snackbar
          message={snackbar.message}
          duration={snackbar.duration}
          onClose={() => setSnackbar(prev => ({ ...prev, isOpened: false }))}
        />
      }
    </>
  );
}