import { ReactNode } from "react";

interface WindowsDialogProps {
  title: string;
  children: ReactNode;
  className?: string;
  icon?: string;
}

const WindowsDialog = ({ title, children, className = "", icon = "📄" }: WindowsDialogProps) => {
  return (
    <div className={`win95-window ${className}`}>
      <div className="win95-titlebar">
        <div className="flex items-center gap-2">
          <span>{icon}</span>
          <span>{title}</span>
        </div>
        <div className="flex gap-1">
          <button className="w-4 h-4 bg-win95-gray border border-win95-dark-gray text-xs flex items-center justify-center">_</button>
          <button className="w-4 h-4 bg-win95-gray border border-win95-dark-gray text-xs flex items-center justify-center">×</button>
        </div>
      </div>
      <div className="p-4 bg-win95-light-gray">
        {children}
      </div>
    </div>
  );
};

export default WindowsDialog;