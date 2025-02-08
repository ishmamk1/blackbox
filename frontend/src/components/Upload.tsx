import React, { useState } from "react";
import axios from "axios";

interface UploadProps {
  uploadUrl: string; // API endpoint to send files
}

const Upload: React.FC<UploadProps> = ({ uploadUrl }) => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [link, setLink] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

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
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    formData.append("link", link); // Send the link with the files

    try {
      const response = await axios.post(uploadUrl, formData, {
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

      <input
        type="text"
        placeholder="Enter a link (optional)"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ width: "300px", padding: "5px" }}
      />
      <br /><br />

      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default Upload;
