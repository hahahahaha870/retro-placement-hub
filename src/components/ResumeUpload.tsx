import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import WindowsDialog from "./TerminalWindow";

const ResumeUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type === "application/pdf") {
        setFile(selectedFile);
        setScanResult(null);
      } else {
        alert("ERROR: ONLY PDF FILES ACCEPTED");
      }
    }
  };

  const simulateHaltingProblemScanner = async () => {
    setIsScanning(true);
    setUploadProgress(0);
    setScanResult(null);

    const scanStages = [
      "INITIATING HALTING PROBLEM SIMULATION...",
      "ANALYZING RESUME STRUCTURE...",
      "CHECKING FOR INFINITE LOOPS IN EXPERIENCE...",
      "VALIDATING TERMINATION CONDITIONS...",
      "DETECTING INCOMPLETE SECTIONS...",
      "RUNNING SEMANTIC ANALYSIS...",
      "FINALIZING SCAN REPORT..."
    ];

    for (let i = 0; i < scanStages.length; i++) {
      console.log(scanStages[i]);
      setUploadProgress((i + 1) * (100 / scanStages.length));
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Simulate scan results
    const issues = [
      "WARNING: Experience section may contain recursive references",
      "ALERT: Skills enumeration lacks termination criteria",
      "INFO: Contact information validation passed",
      "WARNING: Project descriptions show potential incompleteness"
    ];

    const randomIssues = issues.slice(0, Math.floor(Math.random() * issues.length) + 1);
    setScanResult(randomIssues.join("\n"));
    setIsScanning(false);
  };

  const handleUpload = () => {
    if (!file) return;
    simulateHaltingProblemScanner();
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <WindowsDialog title="Resume Upload & Analysis System" icon="📄">
      <div className="space-y-4">
        <div className="text-win95-black">
          Resume Screening Engine v2.1 - Halting Problem Simulation Active
        </div>

        <div className="space-y-3">
          <Button
            onClick={triggerFileSelect}
            className="win95-button w-full py-2"
            disabled={isScanning}
          >
            Select PDF Resume
          </Button>

          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />

          {file && (
            <div className="win95-panel-inset p-3">
              <div className="text-win95-black font-bold text-sm">
                Selected File: {file.name}
              </div>
              <div className="text-win95-dark-gray text-xs">
                Size: {(file.size / 1024).toFixed(2)} KB | Type: {file.type}
              </div>
            </div>
          )}

          {file && !isScanning && !scanResult && (
            <Button
              onClick={handleUpload}
              className="win95-button w-full py-2"
            >
              Initiate Halting Analysis
            </Button>
          )}

          {isScanning && (
            <div className="space-y-3">
              <div className="text-win95-black animate-pulse">
                Scanning in progress... Please wait
              </div>
              <Progress value={uploadProgress} className="w-full" />
              <div className="text-win95-dark-gray text-sm">
                Progress: {uploadProgress.toFixed(0)}%
              </div>
            </div>
          )}

          {scanResult && (
            <div className="space-y-3">
              <div className="text-win95-black font-bold">
                ===== Scan Complete =====
              </div>
              <div className="win95-panel-inset p-3">
                <pre className="text-win95-black text-xs whitespace-pre-wrap">
                  {scanResult}
                </pre>
              </div>
              <div className="flex gap-2">
                <Button className="win95-button flex-1">
                  Accept & Upload
                </Button>
                <Button 
                  onClick={() => {
                    setFile(null);
                    setScanResult(null);
                    setUploadProgress(0);
                  }}
                  className="win95-button flex-1"
                >
                  Reject & Retry
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="win95-statusbar text-xs">
          The Halting Problem Scanner analyzes resume completeness. Infinite loops in experience or incomplete sections are flagged. Only PDFs accepted for security and parsing reliability.
        </div>
      </div>
    </WindowsDialog>
  );
};

export default ResumeUpload;