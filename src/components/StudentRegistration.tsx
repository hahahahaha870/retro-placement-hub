import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import WindowsDialog from "./TerminalWindow";

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
    <WindowsDialog title="Student Registration Portal" icon="👤">
      <div className="space-y-4">
        <div className="text-win95-black mb-4">
          Please enter your registration information below:
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label className="text-win95-black text-sm">
                Full Name:
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="win95-input w-full"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-1">
              <Label className="text-win95-black text-sm">
                Roll Number:
              </Label>
              <Input
                value={formData.rollNumber}
                onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                className="win95-input w-full"
                placeholder="e.g., CS21B001"
                required
              />
            </div>

            <div className="space-y-1">
              <Label className="text-win95-black text-sm">
                Email Address:
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="win95-input w-full"
                placeholder="student@college.edu"
                required
              />
            </div>

            <div className="space-y-1">
              <Label className="text-win95-black text-sm">
                Department:
              </Label>
              <Input
                value={formData.department}
                onChange={(e) => handleInputChange("department", e.target.value)}
                className="win95-input w-full"
                placeholder="Computer Science"
                required
              />
            </div>

            <div className="space-y-1">
              <Label className="text-win95-black text-sm">
                Academic Year:
              </Label>
              <Input
                value={formData.year}
                onChange={(e) => handleInputChange("year", e.target.value)}
                className="win95-input w-full"
                placeholder="Final Year"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-win95-black text-sm">
              Technical Skills:
            </Label>
            <Textarea
              value={formData.skills}
              onChange={(e) => handleInputChange("skills", e.target.value)}
              className="win95-input w-full min-h-20 resize-none"
              placeholder="JavaScript, Python, React, Node.js, MongoDB..."
              required
            />
          </div>

          <div className="flex justify-center gap-2 mt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="win95-button px-6"
            >
              {isSubmitting ? "Processing..." : "Register Student"}
            </Button>
          </div>
        </form>

        <div className="win95-statusbar mt-4">
          Registration will create your student profile in the central database. You will receive email notifications for job opportunities.
        </div>
      </div>
    </WindowsDialog>
  );
};

export default StudentRegistration;