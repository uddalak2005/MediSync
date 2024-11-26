import React, { useState, useEffect } from "react";
import NextAndPrev from "./NextAndPrev.jsx";
import { useNavigate } from "react-router-dom";
import './Attachments.css';
import axios from "axios";

const Attachments = ({ prevPage }) => {
  const [formData, setFormData] = useState(() => {
    // Load from local storage if available
    const savedData = localStorage.getItem("formData");
    return savedData ? JSON.parse(savedData) : {};
  });

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormData(JSON.parse(storedFormData));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
        .post("http://localhost:3000/newAppoinment", formData)
        .then((response) => {
          console.log(response.data);
          setFormData({}); // Clear the formData state
          localStorage.removeItem('formData'); // Clear localStorage
          window.location.href = "/OPDManagement"
        })
        .catch((error) => {
          console.error(error);
        });
  };

  const [files, setFiles] = useState([]);
  const [defaultText, setDefaultText] = useState("No files selected");

  const handleFileChange = (event) => {
    const newFiles = event.target.files;
    setFiles([...files, ...newFiles]);
    setDefaultText("");
  };

  const handleRemoveFile = (index) => {
    const newFiles = files.filter((file, i) => i !== index);
    setFiles(newFiles);
  };

  const renderFiles = () => {
    return files.map((file, index) => (
      <div key={index} className="attachment-card">
        <img src={URL.createObjectURL(file)} alt={file.name} />
        <div>{file.name}</div>
        <button onClick={() => handleRemoveFile(index)}>×</button>
      </div>
    ));
  };

  return (
    <div className="formArea">
      <div className="patientDetailsForAttachments">
        {formData.firstName || formData.middleName || formData.lastName ? (
          <div style={{ fontSize: "18px", fontWeight: "600" }}>
            Patient's Name: {formData.firstName} {formData.middleName}{" "}
            {formData.lastName}
          </div>
        ) : (
          <div style={{ fontSize: "18px", fontWeight: "600" }}>
            Patient's Name: {formData.firstName} {formData.lastName}
          </div>
        )}
        <div style={{ fontSize: "18px", fontWeight: "600" }}>
          Age: {formData.age}
        </div>
        <div style={{ fontSize: "18px", fontWeight: "600" }}>
          Gender: {formData.gender}
        </div>
        <div style={{ fontSize: "18px", fontWeight: "600" }}>
          Blood Group: {formData.bloodGroup}
        </div>
      </div>
      <div style={{ padding: "10px", overflowY: "auto", height: "70vh" }}>
        <div className="attachment-box">
          <div className="attachment-list">
            <div className="attachments">
              {files.length === 0 ? (
                <div className="defaultUpload">Upload attachments Here</div>
              ) : (
                renderFiles()
              )}
            </div>
          </div>
          <input
            type="file"
            multiple
            onChange={handleFileChange}
            id="fileInput"
          />
          <div style={{ display: "flex", justifyContent: "end" }}>
            <label
              htmlFor="fileInput"
              className="custom-upload-button"
              style={{ display: "flex", justifyContent: "center" ,height:'20px'}}
            >
              Upload
            </label>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <NextAndPrev name="Previous" onClick={prevPage} />
          <NextAndPrev name="Submit" onClick={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default Attachments;
