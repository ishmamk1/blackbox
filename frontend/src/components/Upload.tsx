import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from '../store/appContext';

const Upload: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const { state, actions } = useContext(AppContext);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
    }
  };

  const handleUpload = async () => {
    if (!files || files.length === 0) {
      return alert("Please select at least one file.");
    }

    setUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("username", state.username || "");
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    // Optionally, append a username if needed
    // formData.append("username", username);

    try {
      const response = await axios.post("//127.0.0.1:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage("Upload successful!");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Upload Files</h2>

      <input type="file" multiple onChange={handleFileChange} />
      <br /><br />

      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;
