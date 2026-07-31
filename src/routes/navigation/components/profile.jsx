import { useState, useEffect, useRef } from "react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";

export default function Profile() {
  const [userInfo] = useState(GetUserInfo());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  function GetUserInfo() {
    try {
      const localSavedData = localStorage.getItem("zenbase-user-info"); // Fetch info saved by ZenAccount

      if (!localSavedData) {
        throw new Error("No Data Found");
      }

      const localSavedData_parsed = JSON.parse(localSavedData);

      return {
        username: localSavedData_parsed.username,
        initial: getInitial(localSavedData_parsed.username),
        role: localSavedData_parsed.role.charAt(0).toUpperCase() + localSavedData_parsed.role.slice(1)
      }
    }
    catch(error) {
      console.error("An error occured while fetching User Info: ", error);
      return {
        username: "Log in",
        initial: "?",
        role: "Guest"
      }
    }
  }

  function getInitial(username) {
    const splitted = username.split(" ");
    let initial = "";
    splitted.forEach(word => {
      if (word[0]) initial += word[0];
    });
    return initial;
  }

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogout() {
    localStorage.removeItem("zenbase-user-info");
    window.location.href = "https://zenxync.github.io/zenaccount/loginprovider?appOrigin=zenbase";
  }

  // Scalable menu configuration array for easy addition of future menu options
  const menuItems = [
    {
      id: "logout",
      label: "Log Out",
      icon: IoLogOutOutline,
      danger: true,
      onClick: handleLogout
    }
  ];

  function handleProfileClick() {
    // if not logged in redirect to login
    if (userInfo.username === "Log in") {
      window.location.href = "https://zenxync.github.io/zenaccount/loginprovider?appOrigin=zenbase";
      return;
    }
    setIsMenuOpen(prev => !prev);
  }

  return (
    <div ref={menuRef} className="relative w-full">
      {/* Popup Menu */}
      {isMenuOpen && (
        <div className="absolute bottom-full mb-2 left-0 w-full bg-secondary border border-border rounded-2xl p-2 shadow-xl flex flex-col gap-1 z-50">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  setIsMenuOpen(false);
                  item.onClick();
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  item.danger
                    ? "text-danger hover:bg-danger/10"
                    : "text-text-primary hover:bg-primary"
                }`}
              >
                {Icon && <Icon size={18} />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Profile Card */}
      <div 
        role="button"
        onClick={handleProfileClick}
        className="
          w-full h-15 bg-transparent border border-border rounded-2xl flex p-2 pl-2.5 pr-5 items-center justify-between cursor-pointer select-none
        ">
        <div className="flex gap-3 items-center">
          <div className="w-10 h-10 pl-1.5 rounded-full overflow-hidden relative bg-[url(/gradient.png)] bg-cover bg-center flex items-center justify-center">
            <span className="text-lg font-bold">{userInfo.initial}</span>
          </div>
          <div className="flex flex-col">
            <span>{userInfo.username}</span>
            <span className="text-[14px] text-text-secondary">{userInfo.role}</span>
          </div>
        </div>
        <HiOutlineDotsVertical size={20} />
      </div>
    </div>
  );
}