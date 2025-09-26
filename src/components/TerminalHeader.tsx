import { useState, useEffect } from "react";

const WindowsHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="win95-window mb-4">
      <div className="win95-titlebar">
        <div className="flex items-center gap-2">
          <span>📋</span>
          <span>Placement Cell System - Version 2.0</span>
        </div>
        <div className="flex gap-1">
          <button className="w-4 h-4 bg-win95-gray border border-win95-dark-gray text-xs">_</button>
          <button className="w-4 h-4 bg-win95-gray border border-win95-dark-gray text-xs">□</button>
          <button className="w-4 h-4 bg-win95-red border border-win95-dark-gray text-xs">×</button>
        </div>
      </div>
      <div className="p-4 bg-win95-light-gray">
        <div className="flex justify-between items-center text-win95-black text-sm">
          <div>
            System Status: <span className="font-bold text-win95-blue">Online</span>
          </div>
          <div>
            {currentTime.toLocaleString()} | User: Administrator
          </div>
        </div>
        <div className="mt-2 h-px bg-win95-dark-gray"></div>
      </div>
    </div>
  );
};

export default WindowsHeader;