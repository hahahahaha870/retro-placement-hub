import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefcase, MapPin, DollarSign, Calendar } from "lucide-react";

interface Job {
  id: string;
  company: string;
  title: string;
  description: string;
  location: string;
  salary: string;
  skills: string[];
  requirements: string;
  status: string;
  applications: number;
  created_at: string;
}

export function StudentJobListings() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error: any) {
      toast({
        title: "Error fetching jobs",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApply = (jobId: string) => {
    toast({
      title: "Application Feature",
      description: "Job application functionality is coming soon! This feature will be available in the next update.",
    });
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
      <div>
        <h1 className="text-2xl font-bold">Available Job Opportunities</h1>
        <p className="text-muted-foreground">
          Discover exciting career opportunities from top companies.
        </p>
      </div>

      <div className="grid gap-6">
        {jobs.map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Briefcase className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{job.title}</CardTitle>
                    <CardDescription className="flex items-center gap-4 mt-1">
                      <span className="font-medium text-primary">{job.company}</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </span>
                    </CardDescription>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="default" className="mb-2">Active</Badge>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {new Date(job.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                {job.description}
              </p>
              
              {job.salary && (
                <div className="flex items-center gap-1 mb-4">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-green-600">{job.salary}</span>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4">
                {job.skills.map((skill, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm text-muted-foreground">
                  {job.applications} applications
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedJob(selectedJob?.id === job.id ? null : job)}
                  >
                    {selectedJob?.id === job.id ? 'Hide Details' : 'View Details'}
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleApply(job.id)}
                  >
                    Apply Now
                  </Button>
                </div>
              </div>

              {selectedJob?.id === job.id && (
                <div className="mt-4 pt-4 border-t">
                  <h4 className="font-medium mb-2">Job Requirements:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {job.requirements}
                  </p>
                  <h4 className="font-medium mt-4 mb-2">Detailed Description:</h4>
                  <p className="text-sm text-muted-foreground whitespace-pre-line">
                    {job.description}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="text-center py-12">
          <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No Jobs Available</h3>
          <p className="text-muted-foreground">
            There are currently no active job listings. Please check back later for new opportunities.
          </p>
        </div>
      )}
    </div>
  );
}