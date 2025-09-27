import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Phone, GraduationCap, BookOpen, Award } from "lucide-react";

interface StudentData {
  id?: string;
  student_id: string;
  department: string;
  year_of_study: number;
  cgpa: number;
  phone: string;
  skills: string[];
}

export function StudentProfile() {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    student_id: "",
    department: "",
    year_of_study: 1,
    cgpa: 0,
    phone: "",
    skills: "",
  });

  const departments = [
    "Computer Science Engineering",
    "Information Technology",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering"
  ];

  useEffect(() => {
    if (user) {
      fetchStudentData();
    }
  }, [user]);

  const fetchStudentData = async () => {
    try {
      const { data, error } = await supabase
        .from('students')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error && error.code !== 'PGRST116') { // PGRST116 = no rows returned
        throw error;
      }

      if (data) {
        setStudentData(data);
        setFormData({
          student_id: data.student_id,
          department: data.department,
          year_of_study: data.year_of_study,
          cgpa: data.cgpa || 0,
          phone: data.phone || "",
          skills: data.skills.join(', '),
        });
      } else {
        // No student data exists, enable editing mode
        setIsEditing(true);
      }
    } catch (error: any) {
      toast({
        title: "Error fetching profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const skillsArray = formData.skills.split(',').map(s => s.trim()).filter(s => s);
      
      const studentDataToSave = {
        user_id: user?.id,
        student_id: formData.student_id,
        department: formData.department,
        year_of_study: formData.year_of_study,
        cgpa: parseFloat(formData.cgpa.toString()),
        phone: formData.phone,
        skills: skillsArray,
      };

      let error;
      if (studentData) {
        // Update existing record
        const { error: updateError } = await supabase
          .from('students')
          .update(studentDataToSave)
          .eq('id', studentData.id);
        error = updateError;
      } else {
        // Insert new record
        const { error: insertError } = await supabase
          .from('students')
          .insert(studentDataToSave);
        error = insertError;
      }

      if (error) throw error;

      toast({
        title: "Profile updated!",
        description: "Your profile information has been saved successfully.",
      });

      setIsEditing(false);
      fetchStudentData();
    } catch (error: any) {
      toast({
        title: "Error saving profile",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Profile</h1>
        {!isEditing && studentData && (
          <Button onClick={() => setIsEditing(true)}>
            Edit Profile
          </Button>
        )}
      </div>

      {/* Basic Profile Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-medium text-muted-foreground">Full Name</p>
              <p className="text-lg">{profile?.full_name}</p>
            </div>
            <div>
              <p className="font-medium text-muted-foreground">Email</p>
              <p className="text-lg">{profile?.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Academic Profile */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Academic Profile
          </CardTitle>
          <CardDescription>
            {!studentData && !isEditing ? 
              "Complete your academic profile to access all features" :
              "Your academic information and achievements"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {!studentData && !isEditing ? (
            <div className="text-center py-8">
              <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium mb-2">Complete Your Profile</h3>
              <p className="text-muted-foreground mb-4">
                Add your academic details to get personalized job recommendations
              </p>
              <Button onClick={() => setIsEditing(true)}>
                Add Academic Details
              </Button>
            </div>
          ) : isEditing ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="student_id">Student ID</Label>
                  <Input
                    id="student_id"
                    value={formData.student_id}
                    onChange={(e) => setFormData(prev => ({ ...prev, student_id: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select value={formData.department} onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, department: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="year_of_study">Year of Study</Label>
                  <Select value={formData.year_of_study.toString()} onValueChange={(value) => 
                    setFormData(prev => ({ ...prev, year_of_study: parseInt(value) }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1st Year</SelectItem>
                      <SelectItem value="2">2nd Year</SelectItem>
                      <SelectItem value="3">3rd Year</SelectItem>
                      <SelectItem value="4">4th Year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="cgpa">CGPA</Label>
                  <Input
                    id="cgpa"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={formData.cgpa}
                    onChange={(e) => setFormData(prev => ({ ...prev, cgpa: parseFloat(e.target.value) || 0 }))}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+91 9876543210"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="skills">Skills (comma separated)</Label>
                <Input
                  id="skills"
                  value={formData.skills}
                  onChange={(e) => setFormData(prev => ({ ...prev, skills: e.target.value }))}
                  placeholder="e.g., Java, Python, React, Data Structures"
                />
              </div>

              <div className="flex gap-2">
                <Button type="submit" disabled={saving}>
                  {saving ? "Saving..." : "Save Profile"}
                </Button>
                {studentData && (
                  <Button type="button" variant="outline" onClick={() => {
                    setIsEditing(false);
                    // Reset form data
                    setFormData({
                      student_id: studentData.student_id,
                      department: studentData.department,
                      year_of_study: studentData.year_of_study,
                      cgpa: studentData.cgpa || 0,
                      phone: studentData.phone || "",
                      skills: studentData.skills.join(', '),
                    });
                  }}>
                    Cancel
                  </Button>
                )}
              </div>
            </form>
          ) : (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-muted-foreground text-xs">Student ID</p>
                    <p className="text-sm">{studentData?.student_id}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-muted-foreground text-xs">Department</p>
                    <p className="text-sm">{studentData?.department}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-muted-foreground text-xs">Year</p>
                    <p className="text-sm">{studentData?.year_of_study} Year</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-muted-foreground text-xs">CGPA</p>
                    <p className="text-sm">{studentData?.cgpa ? studentData.cgpa.toFixed(2) : 'N/A'}</p>
                  </div>
                </div>
              </div>
              
              {studentData?.phone && (
                <div>
                  <p className="font-medium text-muted-foreground text-xs mb-1">Phone</p>
                  <p className="text-sm">{studentData.phone}</p>
                </div>
              )}
              
              {studentData?.skills && studentData.skills.length > 0 && (
                <div>
                  <p className="font-medium text-muted-foreground text-xs mb-2">Skills</p>
                  <div className="flex flex-wrap gap-2">
                    {studentData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}