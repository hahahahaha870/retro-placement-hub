import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import WindowsDialog from "./TerminalWindow";

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
      case "active": return "text-win95-blue";
      case "closing": return "text-win95-navy";  
      case "closed": return "text-win95-red";
      default: return "text-win95-dark-gray";
    }
  };

  return (
    <WindowsDialog title="Job Opportunities Database" icon="💼">
      <div className="space-y-4">
        <div className="text-win95-black">
          Active Job Listings: {jobs.filter(j => j.status === "active").length} | Total Opportunities: {jobs.length} | Last Updated: {new Date().toLocaleString()}
        </div>

        <div className="win95-listview p-2 max-h-96 overflow-y-auto">
          {jobs.map((job) => (
            <div
              key={job.id}
              className={`win95-panel m-2 p-3 transition-all duration-300 ${
                selectedJob === job.id
                  ? "bg-win95-light-gray"
                  : ""
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-win95-black font-bold text-sm">
                    {job.title}
                  </h3>
                  <p className="text-win95-blue text-xs">{job.company}</p>
                </div>
                <div className="text-right">
                  <div className={`${getStatusColor(job.status)} text-xs font-bold`}>
                    {job.status.toUpperCase()}
                  </div>
                  <div className="text-win95-dark-gray text-xs">
                    ID: {job.id}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-2 text-xs">
                <div>
                  <span className="text-win95-dark-gray">Location:</span>
                  <br />
                  <span className="text-win95-black">{job.location}</span>
                </div>
                <div>
                  <span className="text-win95-dark-gray">Salary:</span>
                  <br />
                  <span className="text-win95-black">{job.salary}</span>
                </div>
                <div>
                  <span className="text-win95-dark-gray">Posted:</span>
                  <br />
                  <span className="text-win95-black">{job.posted}</span>
                </div>
                <div>
                  <span className="text-win95-dark-gray">Applications:</span>
                  <br />
                  <span className="text-win95-black">{job.applications}</span>
                </div>
              </div>

              <div className="mb-2">
                <span className="text-win95-dark-gray text-xs">Required Skills:</span>
                <div className="flex gap-1 mt-1 flex-wrap">
                  {job.skills.map((skill) => (
                    <Badge
                      key={skill}
                      className="bg-win95-blue text-win95-white text-xs px-2 py-1"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => setSelectedJob(selectedJob === job.id ? null : job.id)}
                  className="win95-button text-xs"
                >
                  {selectedJob === job.id ? "Collapse" : "View Details"}
                </Button>
                {job.status === "active" && (
                  <Button
                    onClick={() => handleApply(job.id)}
                    className="win95-button text-xs"
                  >
                    Apply Now
                  </Button>
                )}
              </div>

              {selectedJob === job.id && (
                <div className="mt-2 win95-panel-inset p-2">
                  <div className="text-win95-black font-bold text-xs mb-1">
                    Job Description:
                  </div>
                  <div className="text-win95-black text-xs space-y-1">
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

        <div className="win95-statusbar text-xs">
          Use "Apply Now" to submit your application. Interview notifications will be sent via email. Company portals: company.placementcell.com (DNS-mapped subdomains)
        </div>
      </div>
    </WindowsDialog>
  );
};

export default JobListings;