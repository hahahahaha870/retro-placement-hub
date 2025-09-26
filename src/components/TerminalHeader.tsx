import { useState, useEffect } from "react";

const TerminalHeader = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const asciiLogo = `
╔═══════════════════════════════════════════════════════════════════════════════╗
║  ██████╗ ██╗      █████╗  ██████╗███████╗███╗   ███╗███████╗███╗   ██╗████████╗ ║
║  ██╔══██╗██║     ██╔══██╗██╔════╝██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝ ║
║  ██████╔╝██║     ███████║██║     █████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║    ║
║  ██╔═══╝ ██║     ██╔══██║██║     ██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║    ║
║  ██║     ███████╗██║  ██║╚██████╗███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║    ║
║  ╚═╝     ╚══════╝╚═╝  ╚═╝ ╚═════╝╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝    ║
║                           CENTRALIZED PLACEMENT CELL v2.0                       ║
╚═══════════════════════════════════════════════════════════════════════════════╝`;

  return (
    <div className="terminal-border p-4 mb-6">
      <div className="ascii-art text-xs">{asciiLogo}</div>
      <div className="flex justify-between items-center mt-4 text-terminal-green">
        <div className="terminal-glow">
          SYSTEM STATUS: <span className="text-terminal-amber">ONLINE</span>
        </div>
        <div className="terminal-glow">
          {currentTime.toLocaleString()} | USER: ADMIN
        </div>
      </div>
      <div className="w-full h-px bg-terminal-green mt-2 animate-pulse"></div>
    </div>
  );
};

export default TerminalHeader;