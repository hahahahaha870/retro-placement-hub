import { ReactNode } from "react";

interface TerminalWindowProps {
  title: string;
  children: ReactNode;
  className?: string;
}

const TerminalWindow = ({ title, children, className = "" }: TerminalWindowProps) => {
  return (
    <div className={`terminal-border bg-terminal-surface p-6 ${className} crt-flicker`}>
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-terminal-green">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-terminal-red"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-amber"></div>
          <div className="w-3 h-3 rounded-full bg-terminal-green"></div>
        </div>
        <h2 className="text-terminal-green terminal-glow uppercase tracking-wider">
          {title}
        </h2>
        <div className="text-terminal-gray text-sm">
          [{new Date().toLocaleTimeString()}]
        </div>
      </div>
      {children}
    </div>
  );
};

export default TerminalWindow;