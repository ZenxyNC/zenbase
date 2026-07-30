import { useEffect, useState } from "react";
import { 
  IoCheckmark,
  IoClose,
  IoAlert,
  IoHelp,
  IoInformation,
  IoExtensionPuzzle,
  IoWarning
 } from "react-icons/io5";

export default function ZenEngineAlert({ AlertStructure, setAlertStructure, children }) {
  const [inputValue, setInputValue] = useState("");
  const [primaryColor, setPrimaryColor] = useState("#F5F5F5");
  const [buttonText, setButtonText] = useState({
    primary: "Ok",
    secondary: "Cancel"
  });

  useEffect(() => {
    switch (AlertStructure.type || "information") {
      case "success":
        setPrimaryColor("#007AFF");
        setButtonText({
          primary: "Ok",
          secondary: false
        });
        break;
      case "error":
        setPrimaryColor("#FF393D");
        setButtonText({
          primary: "Ok",
          secondary: "Cancel"
        });
        break;
      case "warning":
        setPrimaryColor("#FFCC00");
        setButtonText({
          primary: "Ok",
          secondary: "Cancel"
        });
        break;
      case "confirmation":
        setPrimaryColor("#FFCC00");
        setButtonText({
          primary: "Yes",
          secondary: "Cancel"
        });
        break;
      case "information":
        setPrimaryColor("#F5F5F5");
        setButtonText({
          primary: "Ok",
          secondary: false
        });
        break;
      case "input":
        setPrimaryColor("#FF393D");
        setButtonText({
          primary: "Ok",
          secondary: "Cancel"
        });
        break;
      default:
        setPrimaryColor("#F5F5F5");
    }
  }, [AlertStructure.type])

  function getIconByType(type) {
    switch (type) {
      case "success":
        return <IoCheckmark size={32} color={primaryColor}/>
      case "error":
        return <IoClose size={32} color={primaryColor}/>
      case "warning":
        return <IoAlert size={32} color={primaryColor}/>
      case "confirmation":
        return <IoHelp size={32} color={primaryColor}/>
      case "information":
        return <IoInformation size={32} color={primaryColor}/>
      case "input":
        return <IoWarning size={32} color={primaryColor}/>
      default:
        return <IoExtensionPuzzle size={32} color={primaryColor}/>
    }
  }

  function HandlePrimaryButton() {
    setAlertStructure((prev) => ({
      ...prev,
      isOpened: false,
    }));
    AlertStructure.actionOk();
  }

  function HandleSecondaryButton() {
    setInputValue("")
    setAlertStructure((prev) => ({
      ...prev,
      isOpened: false,
    }));
    AlertStructure.actionCancel();
  }

  return (
    <>
      <div className="w-dvw h-dvh fixed top-0 left-0 z-9999 flex justify-center items-center bg-[rgba(0,0,0,0.6)] backdrop-blur-lg opacity-100 pointer-events-all transition-[0.2s]" style={{ opacity: AlertStructure.isOpened ? 1 : 0, pointerEvents: AlertStructure.isOpened ? "all" : "none" }}>
        <div
          className="w-[calc(100vw-64px)] max-w-100 h-max min-h-65 p-8 flex flex-col overflow-hidden gap-4 bg-[rgb(15,19,26,0.8)] backdrop-blur-lg border border-[rgb(245,245,245,0.2)] rounded-4xl"
          style={{ borderColor: 
            AlertStructure.type === "success" ? "rgb(0, 122, 255, 0.2)" : 
            AlertStructure.type === "error" ? "rgb(255, 57, 61, 0.2)" : 
            AlertStructure.type === "warning" || AlertStructure.type === "confirmation" ? "rgb(255, 204, 0, 0.2)" : 
            AlertStructure.type === "information" || AlertStructure.type === "input" ? "rgb(245, 245, 245, 0.2)" : 
            "rgb(245, 245, 245, 0.2)" }}
        >
          <div className="flex justify-center items-center gap-5 w-max h-15" >
            <div className="w-15 h-15 flex justify-center items-center rounded-full border border-[rgb(245,245,245,0.2)]"
            style={{ backgroundColor: 
              AlertStructure.type === "success" ? "rgb(0, 122, 255, 0.2)" : 
              AlertStructure.type === "error" ? "rgb(255, 57, 61, 0.2)" : 
              AlertStructure.type === "warning" || AlertStructure.type === "confirmation" ? "rgb(255, 204, 0, 0.2)" : 
              AlertStructure.type === "information" || AlertStructure.type === "input" ? "rgb(245, 245, 245, 0.2)" : 
              "rgb(245, 245, 245, 0.2)",
              borderColor: 
                AlertStructure.type === "success" ? "rgb(0, 122, 255, 0.2)" : 
                AlertStructure.type === "error" ? "rgb(255, 57, 61, 0.2)" : 
                AlertStructure.type === "warning" || AlertStructure.type === "confirmation" ? "rgb(255, 204, 0, 0.2)" : 
                AlertStructure.type === "information" || AlertStructure.type === "input" ? "rgb(245, 245, 245, 0.2)" : 
                "rgb(245, 245, 245, 0.2)" }}
            >
              {getIconByType(AlertStructure.type || "information")}
            </div>
            <h2 className="text-[28px] text-text-primary font-bold">{AlertStructure.title ? AlertStructure.title : AlertStructure.type.replace(/^./, (char) => char.toUpperCase())}</h2>
          </div>
          {
            AlertStructure.type === "input" ? (
              <input 
                type="text"
                name="alert-input"
                placeholder={AlertStructure.placeholder}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full h-11 p-4 rounded-xl border border-[rgb(245,245,245,0.2)] text-text-primary text-[16px]"
              />
            ) : (
              children
            )
          }
          <div className="flex justify-center items-center gap-4 w-full mt-auto">
            <button
              style={{ visibility: buttonText.secondary ? "visible" : "hidden" }}
              onClick={HandleSecondaryButton}
              className="w-[calc(50%-8px)] h-11 rounded-xl bg-[rgb(23,28,35,0.6)] text-text-primary text-[16px] cursor-pointer"
            >
              {buttonText.secondary}
            </button>

            <button 
              style={{ backgroundColor: AlertStructure.type === "confirmation" ? "rgb(255, 204, 0, 0.8)" : "rgb(0, 122, 255, 0.8)" }}
              onClick={HandlePrimaryButton}
              className="w-[calc(50%-8px)] h-11 rounded-xl bg-[rgb(0,122,255,0.8)] text-text-primary text-[16px] cursor-pointer"
            >
              {buttonText.primary}
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
