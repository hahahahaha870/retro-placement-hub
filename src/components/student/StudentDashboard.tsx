import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import WindowsHeader from "@/components/TerminalHeader";
import { StudentJobListings } from "./StudentJobListings";
import { StudentProfile } from "./StudentProfile";

export default function StudentDashboard() {
  const { signOut, profile } = useAuth();
  const [activeModule, setActiveModule] = useState("jobs");

  const menuItems = [
    { id: "jobs", label: "Job Listings", icon: "💼" },
    { id: "profile", label: "My Profile", icon: "👤" },
    { id: "applications", label: "My Applications", icon: "📋" },
    { id: "interviews", label: "Interviews", icon: "🗣️" },
  ];

  const renderActiveModule = () => {
    switch (activeModule) {
      case "jobs":
        return <StudentJobListings />;
      case "profile":
        return <StudentProfile />;
      case "applications":
        return (
          <div className="bg-muted rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h2 className="text-2xl font-bold mb-2">My Applications</h2>
            <p className="text-muted-foreground">Coming Soon!</p>
            <p className="text-sm text-muted-foreground mt-2">
              Track your job applications and their status here.
            </p>
          </div>
        );
      case "interviews":
        return (
          <div className="bg-muted rounded-lg p-8 text-center">
            <div className="text-6xl mb-4">🗣️</div>
            <h2 className="text-2xl font-bold mb-2">Interview Schedule</h2>
            <p className="text-muted-foreground">Coming Soon!</p>
            <p className="text-sm text-muted-foreground mt-2">
              View your scheduled interviews and prepare for them here.
            </p>
          </div>
        );
      default:
        return <StudentJobListings />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      <WindowsHeader />
      
      <div className="flex h-[calc(100vh-40px)]">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-300 shadow-md">
          <div className="p-4">
            <h2 className="text-lg font-bold text-gray-800 mb-4">Student Portal</h2>
            <nav className="space-y-2">
              {menuItems.map((item) => (
                <Button
                  key={item.id}
                  variant={activeModule === item.id ? "default" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => setActiveModule(item.id)}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Button>
              ))}
            </nav>
          </div>
          
          <div className="absolute bottom-4 left-4 right-4">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={signOut}
            >
              Sign Out
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6 overflow-auto">
          {renderActiveModule()}
        </div>
      </div>
    </div>
  );
}