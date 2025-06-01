import React, { useState } from "react";
import "../styles/ResumeUpload.css";
import axios from "axios";

function ResumeUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [extractedText, setExtractedText] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus("");
    setExtractedText("");
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus("Please select a file first.");
      return;
    }

    setUploadStatus("Uploading...");

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await axios.post("http://localhost:5000/api/resume/upload", formData);
      setUploadStatus("Upload successful!");
      setExtractedText(response.data.text); // ✅ correctly expecting 'text'
    } catch (error) {
      console.error(error);
      setUploadStatus("Upload failed.");
    }
  };

  const triggerFileSelect = () => {
    document.getElementById("file-upload").click();
  };

  return (
    <div className="resume-container">
      <h1>Upload Your Resume</h1>
      <p>Enhance your job prospects by uploading your professional resume.</p>

      <div className="upload-box" onClick={triggerFileSelect}>
        <input
          type="file"
          id="file-upload"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <label className="upload-label">
          {selectedFile ? selectedFile.name : "Click to Choose a File"}
        </label>
      </div>

      <button className="upload-button" onClick={handleUpload}>
        Upload Resume
      </button>

      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}

      {/* ✅ Structured Info Output */}
      {extractedText && (
        <div className="structured-info">
          <h3>Structured Resume Information</h3>
          <div className="text-box">
            {extractedText}
          </div>
        </div>
      )}

      {/* ✅ Resume Preview */}
      {selectedFile && selectedFile.type === "application/pdf" && (
        <div className="resume-preview">
          <h3>Resume Preview</h3>
          <iframe
            src={URL.createObjectURL(selectedFile)}
            width="100%"
            height="500px"
            title="Resume Preview"
          ></iframe>
        </div>
      )}
    </div>
  );
}

export default ResumeUpload;


