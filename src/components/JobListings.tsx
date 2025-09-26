import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import TerminalWindow from "./TerminalWindow";

interface Job {
  id: string;
  company: string;
  title: string;
  location: string;
  salary: string;
  skills: string[];
  posted: string;
  applications: number;
  status: "active" | "closing" | "closed";
}

const JobListings = () => {
  const [jobs] = useState<Job[]>([
    {
      id: "JOB001",
      company: "TECHCORP.SYS",
      title: "SOFTWARE ENGINEER",
      location: "BANGALORE",
      salary: "8-12 LPA",
      skills: ["JAVA", "SPRING", "MYSQL"],
      posted: "2024-01-15",
      applications: 47,
      status: "active"
    },
    {
      id: "JOB002", 
      company: "DATAFLOW.INC",
      title: "DATA SCIENTIST",
      location: "HYDERABAD",
      salary: "12-18 LPA",
      skills: ["PYTHON", "ML", "TENSORFLOW"],
      posted: "2024-01-14",
      applications: 23,
      status: "active"
    },
    {
      id: "JOB003",
      company: "CLOUDNET.CO",
      title: "DEVOPS ENGINEER",
      location: "PUNE",
      salary: "10-15 LPA",
      skills: ["AWS", "DOCKER", "KUBERNETES"],
      posted: "2024-01-13",
      applications: 31,
      status: "closing"
    },
    {
      id: "JOB004",
      company: "FRONTEND.LABS",
      title: "REACT DEVELOPER",
      location: "MUMBAI",
      salary: "6-10 LPA",
      skills: ["REACT", "TYPESCRIPT", "NEXT.JS"],
      posted: "2024-01-12",
      applications: 89,
      status: "active"
    }
  ]);

  const [selectedJob, setSelectedJob] = useState<string | null>(null);

  const handleApply = (jobId: string) => {
    alert(`APPLICATION SUBMITTED FOR JOB ${jobId}`);
    console.log(`Applied to job: ${jobId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active": return "text-terminal-green";
      case "closing": return "text-terminal-amber";
      case "closed": return "text-terminal-red";
      default: return "text-terminal-gray";
    }
  };

  return (
    <TerminalWindow title="JOB OPPORTUNITIES DATABASE">
      <div className="space-y-6">
        <div className="text-terminal-amber terminal-glow">
          {'>'} ACTIVE JOB LISTINGS: {jobs.filter(j => j.status === "active").length}
          <br />
          {'>'} TOTAL OPPORTUNITIES: {jobs.length}
          <br />
          {'>'} LAST UPDATED: {new Date().toLocaleString()}
        </div>

        <div className="space-y-4">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`p-4 border-2 transition-all duration-300 ${
                selectedJob === job.id
                  ? "border-terminal-amber bg-terminal-surface"
                  : "border-terminal-green bg-terminal-bg hover:border-terminal-amber"
              }`}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="text-terminal-green terminal-glow text-lg font-bold">
                    {job.title}
                  </h3>
                  <p className="text-terminal-cyan">{job.company}</p>
                </div>
                <div className="text-right">
                  <div className={`${getStatusColor(job.status)} terminal-glow uppercase text-sm`}>
                    {job.status}
                  </div>
                  <div className="text-terminal-gray text-sm">
                    ID: {job.id}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                <div>
                  <span className="text-terminal-gray">LOCATION:</span>
                  <br />
                  <span className="text-terminal-white">{job.location}</span>
                </div>
                <div>
                  <span className="text-terminal-gray">SALARY:</span>
                  <br />
                  <span className="text-terminal-white">{job.salary}</span>
                </div>
                <div>
                  <span className="text-terminal-gray">POSTED:</span>
                  <br />
                  <span className="text-terminal-white">{job.posted}</span>
                </div>
                <div>
                  <span className="text-terminal-gray">APPLICATIONS:</span>
                  <br />
                  <span className="text-terminal-white">{job.applications}</span>
                </div>
              </div>

              <div className="mb-4">
                <span className="text-terminal-gray text-sm">REQUIRED SKILLS:</span>
                <div className="flex gap-2 mt-2 flex-wrap">
                  {job.skills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-terminal-green text-terminal-bg hover:bg-terminal-amber"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                  className="terminal-button"
                >
                  {selectedJob === job.id ? "[COLLAPSE]" : "[VIEW DETAILS]"}
                </Button>
                {job.status === "active" && (
                  <Button
                    onClick={() => handleApply(job.id)}
                    className="terminal-button text-terminal-amber border-terminal-amber hover:bg-terminal-amber hover:text-terminal-bg"
                  >
                    [APPLY NOW]
                  </Button>
                )}
              </div>

              {selectedJob === job.id && (
                <div className="mt-4 p-4 bg-terminal-bg border border-terminal-amber">
                  <div className="text-terminal-amber terminal-glow mb-2">
                    JOB DESCRIPTION:
                  </div>
                  <div className="text-terminal-white text-sm space-y-2">
                    <p>We are seeking a talented {job.title.toLowerCase()} to join our growing team.</p>
                    <p>Requirements: {job.skills.join(", ")} with 2+ years experience.</p>
                    <p>Benefits: Health insurance, flexible hours, remote work options.</p>
                    <p>Contact: hr@{job.company.toLowerCase().replace(/[^a-z]/g, "")}.com</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-terminal-gray text-sm">
          {'>'} Use [APPLY NOW] to submit your application
          <br />
          {'>'} Interview notifications will be sent via email
          <br />
          {'>'} Company portals: company.placementcell.com (DNS-mapped subdomains)
        </div>
      </div>
    </TerminalWindow>
  );
};

export default JobListings;