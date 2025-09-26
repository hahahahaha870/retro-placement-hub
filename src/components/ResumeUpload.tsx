import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import TerminalWindow from "./TerminalWindow";

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
    <TerminalWindow title="RESUME UPLOAD & ANALYSIS SYSTEM">
      <div className="space-y-6">
        <div className="text-terminal-amber terminal-glow">
          {'>'} RESUME SCREENING ENGINE v2.1
          <br />
          {'>'} HALTING PROBLEM SIMULATION ACTIVE
        </div>

        <div className="space-y-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            className="hidden"
          />

          <Button
            onClick={triggerFileSelect}
            className="terminal-button w-full py-3"
            disabled={isScanning}
          >
            [SELECT PDF RESUME]
          </Button>

          {file && (
            <div className="p-4 bg-terminal-bg border border-terminal-green">
              <div className="text-terminal-green terminal-glow">
                SELECTED FILE: {file.name}
              </div>
              <div className="text-terminal-gray text-sm">
                SIZE: {(file.size / 1024).toFixed(2)} KB | TYPE: {file.type}
              </div>
            </div>
          )}

          {file && !isScanning && !scanResult && (
            <Button
              onClick={handleUpload}
              className="terminal-button w-full py-3"
            >
              [INITIATE HALTING ANALYSIS]
            </Button>
          )}

          {isScanning && (
            <div className="space-y-4">
              <div className="text-terminal-amber terminal-glow animate-pulse">
                SCANNING IN PROGRESS... PLEASE WAIT
              </div>
              <Progress value={uploadProgress} className="w-full" />
              <div className="text-terminal-gray text-sm">
                Progress: {uploadProgress.toFixed(0)}%
              </div>
            </div>
          )}

          {scanResult && (
            <div className="space-y-4">
              <div className="text-terminal-green terminal-glow">
                ===== SCAN COMPLETE =====
              </div>
              <div className="p-4 bg-terminal-bg border border-terminal-amber">
                <pre className="text-terminal-amber text-sm whitespace-pre-wrap">
                  {scanResult}
                </pre>
              </div>
              <div className="flex gap-4">
                <Button className="terminal-button flex-1">
                  [ACCEPT & UPLOAD]
                </Button>
                <Button 
                  onClick={() => {
                    setFile(null);
                    setScanResult(null);
                    setUploadProgress(0);
                  }}
                  className="terminal-button flex-1 text-terminal-red border-terminal-red hover:bg-terminal-red hover:text-terminal-bg"
                >
                  [REJECT & RETRY]
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="text-terminal-gray text-sm">
          {'>'} The Halting Problem Scanner analyzes resume completeness
          <br />
          {'>'} Infinite loops in experience or incomplete sections are flagged
          <br />
          {'>'} Only PDFs accepted for security and parsing reliability
        </div>
      </div>
    </TerminalWindow>
  );
};

export default ResumeUpload;