import { useState } from "react";
import WindowsHeader from "./TerminalHeader";
import WindowsDialog from "./TerminalWindow";
import StudentRegistration from "./StudentRegistration";
import ResumeUpload from "./ResumeUpload";
import JobListings from "./JobListings";

type ActiveModule = "home" | "register" | "resume" | "jobs" | "interviews";

const MainDashboard = () => {
  const [activeModule, setActiveModule] = useState<ActiveModule>("home");

  const menuItems = [
    { id: "home" as ActiveModule, label: "MAIN_MENU", icon: "◊" },
    { id: "register" as ActiveModule, label: "STUDENT_REG", icon: "►" },
    { id: "resume" as ActiveModule, label: "RESUME_SCAN", icon: "◘" },
    { id: "jobs" as ActiveModule, label: "JOB_LISTINGS", icon: "♦" },
    { id: "interviews" as ActiveModule, label: "INTERVIEWS", icon: "♠" },
  ];

  const renderActiveModule = () => {
    switch (activeModule) {
      case "register":
        return <StudentRegistration />;
      case "resume":
        return <ResumeUpload />;
      case "jobs":
        return <JobListings />;
      case "interviews":
        return <InterviewModule />;
      default:
        return <HomeModule />;
    }
  };

  return (
    <div className="min-h-screen win95-desktop p-4">
      <div className="max-w-7xl mx-auto">
        <WindowsHeader />
        
        {/* Navigation Menu */}
        <div className="win95-panel p-2 mb-4">
          <div className="flex flex-wrap gap-2">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveModule(item.id)}
                className={`win95-button px-4 py-2 ${
                  activeModule === item.id
                    ? "border-inset bg-win95-light-gray"
                    : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{item.icon}</span>
                  <span className="text-xs">{item.label}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Active Module Content */}
        {renderActiveModule()}
      </div>
    </div>
  );
};

const HomeModule = () => {
  const systemStats = {
    studentsRegistered: 1247,
    jobsPosted: 89,
    placementsCompleted: 156,
    companiesActive: 23
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <WindowsDialog title="System Overview" icon="📊">
        <div className="space-y-4">
          <div className="text-win95-black font-bold">
            Placement Cell Statistics
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="win95-panel-inset text-center p-3">
              <div className="text-2xl font-bold text-win95-blue">
                {systemStats.studentsRegistered}
              </div>
              <div className="text-win95-dark-gray text-xs">Students Registered</div>
            </div>
            <div className="win95-panel-inset text-center p-3">
              <div className="text-2xl font-bold text-win95-blue">
                {systemStats.jobsPosted}
              </div>
              <div className="text-win95-dark-gray text-xs">Jobs Posted</div>
            </div>
            <div className="win95-panel-inset text-center p-3">
              <div className="text-2xl font-bold text-win95-teal">
                {systemStats.placementsCompleted}
              </div>
              <div className="text-win95-dark-gray text-xs">Placements Done</div>
            </div>
            <div className="win95-panel-inset text-center p-3">
              <div className="text-2xl font-bold text-win95-navy">
                {systemStats.companiesActive}
              </div>
              <div className="text-win95-dark-gray text-xs">Active Companies</div>
            </div>
          </div>
        </div>
      </WindowsDialog>

      <WindowsDialog title="Activity Log" icon="📝">
        <div className="win95-listview p-2 h-40 overflow-y-auto">
          <div className="space-y-1 text-xs">
            <div className="text-win95-black">
              12:45:23 - Student CS21B045 uploaded resume
            </div>
            <div className="text-win95-black">
              12:44:15 - TechCorp posted new job: Senior Developer
            </div>
            <div className="text-win95-black">
              12:43:02 - Interview scheduled: Student EE21B032 @ DataFlow Inc
            </div>
            <div className="text-win95-black">
              12:41:55 - Placement confirmed: CS21B028 @ CloudNet Co
            </div>
            <div className="text-win95-black">
              12:40:31 - Resume screening completed: ME21B019
            </div>
            <div className="text-win95-black">
              12:39:12 - System backup completed successfully
            </div>
          </div>
        </div>
      </WindowsDialog>
    </div>
  );
};

const InterviewModule = () => {
  return (
    <WindowsDialog title="Interview Scheduling System" icon="📅">
      <div className="space-y-4">
        <div className="text-win95-black">
          Interview Management Module
        </div>
        <div className="win95-panel-inset p-4 text-center">
          <div className="text-win95-blue font-bold text-lg mb-4">
            Interview Scheduler v2.0
          </div>
          <div className="text-win95-dark-gray text-sm">
            Features in development:
            <br />• Automated interview scheduling
            <br />• Company HR portal integration
            <br />• Student notification system
            <br />• Calendar synchronization
          </div>
          <div className="mt-4">
            <button className="win95-button">Coming Soon</button>
          </div>
        </div>
      </div>
    </WindowsDialog>
  );
};

export default MainDashboard;