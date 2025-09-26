import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import TerminalWindow from "./TerminalWindow";

const StudentRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    skills: "",
    department: "",
    year: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate registration process
    setTimeout(() => {
      console.log("Student registered:", formData);
      alert("REGISTRATION SUCCESSFUL - STUDENT PROFILE CREATED");
      setIsSubmitting(false);
      setFormData({
        name: "",
        email: "",
        rollNumber: "",
        skills: "",
        department: "",
        year: ""
      });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <TerminalWindow title="STUDENT REGISTRATION PORTAL">
      <div className="space-y-4">
        <div className="text-terminal-amber terminal-glow mb-6">
          {'>'} INITIALIZING STUDENT REGISTRATION PROTOCOL...
          <br />
          {'>'} PLEASE ENTER YOUR CREDENTIALS BELOW
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-terminal-green terminal-glow uppercase tracking-wide">
                Full Name
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-terminal-bg border-terminal-green text-terminal-green terminal-glow"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-terminal-green terminal-glow uppercase tracking-wide">
                Roll Number
              </Label>
              <Input
                value={formData.rollNumber}
                onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                className="bg-terminal-bg border-terminal-green text-terminal-green terminal-glow"
                placeholder="e.g., CS21B001"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-terminal-green terminal-glow uppercase tracking-wide">
                Email Address
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-terminal-bg border-terminal-green text-terminal-green terminal-glow"
                placeholder="student@college.edu"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-terminal-green terminal-glow uppercase tracking-wide">
                Department
              </Label>
              <Input
                value={formData.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
                className="bg-terminal-bg border-terminal-green text-terminal-green terminal-glow"
                placeholder="Computer Science"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="text-terminal-green terminal-glow uppercase tracking-wide">
                Academic Year
              </Label>
              <Input
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                className="bg-terminal-bg border-terminal-green text-terminal-green terminal-glow"
                placeholder="Final Year"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-terminal-green terminal-glow uppercase tracking-wide">
              Technical Skills
            </Label>
            <Textarea
              value={formData.skills}
              onChange={(e) => handleInputChange("skills", e.target.value)}
              className="bg-terminal-bg border-terminal-green text-terminal-green terminal-glow min-h-24"
              placeholder="JavaScript, Python, React, Node.js, MongoDB..."
              required
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full terminal-button text-lg py-3"
          >
            {isSubmitting ? "PROCESSING..." : "[REGISTER STUDENT]"}
          </Button>
        </form>

        <div className="text-terminal-gray text-sm mt-6">
          {'>'} Registration will create your student profile in the central database
          <br />
          {'>'} You will receive email notifications for job opportunities
        </div>
      </div>
    </TerminalWindow>
  );
};

export default StudentRegistration;