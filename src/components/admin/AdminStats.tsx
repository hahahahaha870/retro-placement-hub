import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Briefcase, GraduationCap, TrendingUp } from "lucide-react";

interface Stats {
  totalStudents: number;
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
}

export function AdminStats() {
  const [stats, setStats] = useState<Stats>({
    totalStudents: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch students count
      const { count: studentsCount } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true });

      // Fetch jobs count and active jobs
      const { data: jobsData } = await supabase
        .from('jobs')
        .select('status, applications');

      const totalJobs = jobsData?.length || 0;
      const activeJobs = jobsData?.filter(job => job.status === 'active').length || 0;
      const totalApplications = jobsData?.reduce((sum, job) => sum + (job.applications || 0), 0) || 0;

      setStats({
        totalStudents: studentsCount || 0,
        totalJobs,
        activeJobs,
        totalApplications
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Students",
      value: stats.totalStudents,
      description: "Registered students",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Total Jobs",
      value: stats.totalJobs,
      description: "Job listings created",
      icon: Briefcase,
      color: "text-green-600"
    },
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      description: "Currently accepting applications",
      icon: GraduationCap,
      color: "text-purple-600"
    },
    {
      title: "Applications",
      value: stats.totalApplications,
      description: "Total job applications",
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
        <p className="text-muted-foreground">
          Welcome to the admin dashboard. Here's an overview of your placement system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((card) => (
          <Card key={card.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className={`h-4 w-4 ${card.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className="text-xs text-muted-foreground">{card.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">System initialized</p>
                  <p className="text-xs text-muted-foreground">Admin dashboard is ready</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Database connected</p>
                  <p className="text-xs text-muted-foreground">Ready to manage students and jobs</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">Authentication enabled</p>
                  <p className="text-xs text-muted-foreground">Students and admins can sign up</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">👨‍🎓 Student Management</p>
                <p className="text-xs text-muted-foreground">Add and manage student details</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">💼 Job Listings</p>
                <p className="text-xs text-muted-foreground">Create and manage job opportunities</p>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <p className="text-sm font-medium">🗣️ Interviews</p>
                <p className="text-xs text-muted-foreground">Coming Soon - Schedule interviews</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}