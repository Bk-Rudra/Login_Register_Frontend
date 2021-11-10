import React, { useState } from "react";
import { withRouter } from "react-router";
import AuthService from "../Services/auth.service";
import "./profile.css";
import { Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { Worker } from "@react-pdf-viewer/core";
import { textAlign } from "@mui/system";

// import ReactDOM from "react-dom";
const Profile = (props) => {
  const [currentUser] = useState(AuthService.getCurrentUser());
  const [viewPdf, setViewPdf] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [pdfFileError, setPdfFileError] = useState("");
  const fileType = ["application/pdf"];
  const defaultPluginLayout = defaultLayoutPlugin();

  const handleFileUpload = (e) => {
    e.preventDefault();
    if (pdfFile !== null) {
      setViewPdf(pdfFile);
      console.log(pdfFile.value);
    } else {
      setViewPdf(null);
    }
  };

  const handleFileChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfFile(e.target.result);
          setPdfFileError("");
        };
      } else {
        setPdfFile(null);
        setPdfFileError("Please select valid pdf file...");
      }
    } else {
      console.log("please select your file.");
    }
  };

  // const handleFileUpload = (event) => {
  //   console.log(event.target.files[0].name);
  //   console.log(event.target.files);
  //   console.log(event.target.value);
  // };

  const logout = () => {
    AuthService.logout();
    props.history.push("/");
  };

  return (
    <div>
      <nav>
        <div className="navBar">Collab_Sign</div>
        <ul className="navLink">
          <ul>Whats up... {currentUser.username} </ul>
          <ul>
            <button onClick={logout}>Logout</button>
          </ul>
        </ul>
      </nav>
      <div className="body">
        <h2 className="name">Profile</h2>
        <p>
          <strong>Id: </strong>
          {currentUser.id}
        </p>
        <p>
          <strong>Email: </strong>
          {currentUser.email}
        </p>
      </div>
      <form className="form-group" onSubmit={handleFileUpload}>
        <input
          type="file"
          className="form-control"
          required
          onChange={handleFileChange}
        />
        {pdfFileError && <div className="error-msg"><br/>{pdfFileError}</div>}
        <br />
        <button type="submit" className="btn btn-sucess btn-lg" style={{float: "right"}}>
          Upload
        </button>
      </form>
      <br/>
      <h6 style={{ textAlign: "center" }}>PDF Renderer</h6>
      <div className="pdf-container">
        {viewPdf && (
          <i>
            <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.6.347/build/pdf.worker.min.js">
              <Viewer fileUrl={viewPdf} plugins={[defaultPluginLayout]} />
            </Worker>
          </i>
        )}
        {!viewPdf && <i> No pdf file selected</i>}
      </div>
    </div>
  );
};
export default withRouter(Profile);
