import { useState } from "react";
import TerminalHeader from "./TerminalHeader";
import TerminalWindow from "./TerminalWindow";
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
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <TerminalHeader />
        
        {/* Navigation Menu */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveModule(item.id)}
              className={`terminal-button p-4 text-center transition-all duration-300 ${
                activeModule === item.id
                  ? "bg-terminal-green text-terminal-bg border-terminal-green"
                  : ""
              }`}
            >
              <div className="text-2xl mb-2">{item.icon}</div>
              <div className="text-sm">{item.label}</div>
            </button>
          ))}
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TerminalWindow title="SYSTEM OVERVIEW">
        <div className="space-y-4">
          <div className="text-terminal-amber terminal-glow">
            {'>'} PLACEMENT CELL STATISTICS
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 border border-terminal-green">
              <div className="text-3xl text-terminal-green terminal-glow">
                {systemStats.studentsRegistered}
              </div>
              <div className="text-terminal-gray text-sm">STUDENTS REGISTERED</div>
            </div>
            <div className="text-center p-4 border border-terminal-green">
              <div className="text-3xl text-terminal-green terminal-glow">
                {systemStats.jobsPosted}
              </div>
              <div className="text-terminal-gray text-sm">JOBS POSTED</div>
            </div>
            <div className="text-center p-4 border border-terminal-green">
              <div className="text-3xl text-terminal-amber terminal-glow">
                {systemStats.placementsCompleted}
              </div>
              <div className="text-terminal-gray text-sm">PLACEMENTS DONE</div>
            </div>
            <div className="text-center p-4 border border-terminal-green">
              <div className="text-3xl text-terminal-cyan terminal-glow">
                {systemStats.companiesActive}
              </div>
              <div className="text-terminal-gray text-sm">ACTIVE COMPANIES</div>
            </div>
          </div>
        </div>
      </TerminalWindow>

      <TerminalWindow title="RECENT ACTIVITY LOG">
        <div className="space-y-2 text-sm">
          <div className="text-terminal-green">
            [12:45:23] Student CS21B045 uploaded resume
          </div>
          <div className="text-terminal-amber">
            [12:44:15] TECHCORP.SYS posted new job: Senior Developer
          </div>
          <div className="text-terminal-cyan">
            [12:43:02] Interview scheduled: Student EE21B032 @ DATAFLOW.INC
          </div>
          <div className="text-terminal-green">
            [12:41:55] Placement confirmed: CS21B028 @ CLOUDNET.CO
          </div>
          <div className="text-terminal-amber">
            [12:40:31] Resume screening completed: ME21B019
          </div>
          <div className="text-terminal-gray">
            [12:39:12] System backup completed successfully
          </div>
        </div>
      </TerminalWindow>
    </div>
  );
};

const InterviewModule = () => {
  return (
    <TerminalWindow title="INTERVIEW SCHEDULING SYSTEM">
      <div className="space-y-4">
        <div className="text-terminal-amber terminal-glow">
          {'>'} INTERVIEW MANAGEMENT MODULE
          <br />
          {'>'} COMING SOON IN FULL VERSION
        </div>
        <div className="p-6 border border-terminal-green text-center">
          <div className="text-terminal-green terminal-glow text-lg mb-4">
            INTERVIEW SCHEDULER v2.0
          </div>
          <div className="text-terminal-gray">
            Features in development:
            <br />• Automated interview scheduling
            <br />• Company HR portal integration
            <br />• Student notification system
            <br />• Calendar synchronization
          </div>
        </div>
      </div>
    </TerminalWindow>
  );
};

export default MainDashboard;