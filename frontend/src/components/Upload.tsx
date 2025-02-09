import React, { useState, useContext } from "react";
import axios from "axios";
import { AppContext } from '../store/appContext';

const Upload: React.FC = () => {
  const [files, setFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const { state, actions } = useContext(AppContext);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(event.target.files);
      const previews = Array.from(event.target.files).map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(previews);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <div className="w-full max-w-lg bg-gray-800 p-8 rounded-lg shadow-lg space-y-6">
        <h2 className="text-2xl font-semibold text-gray-100 text-center">Upload Files</h2>

        <div className="space-y-4">
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            className="w-full text-sm text-gray-300 py-2 px-4 border border-gray-600 rounded-md bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Image Preview Section */}
        <div className="space-y-4">
          {imagePreviews.length > 0 && (
            <div>
              <h3 className="text-lg text-gray-100">Uploaded Images Preview</h3>
              <div className="grid grid-cols-3 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img src={preview} alt="Uploaded Preview" className="w-full h-auto rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-300"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>

        {message && (
          <p
            className={`text-center text-lg ${
              message === "Upload successful!" ? "text-green-400" : "text-red-400"
            }`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default Upload;
