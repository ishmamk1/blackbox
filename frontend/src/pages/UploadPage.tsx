import React from "react";
import Upload from "../components/Upload";

const UploadPage: React.FC = () => {
  return (
    <div>
      <h1>Upload Page</h1>
      <Upload uploadUrl="http://localhost:5000/upload" />
    </div>
  );
};

export default UploadPage;
