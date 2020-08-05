import React from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import UploadContainer from './components/UploadContainer'

function App() {
  return (
    <div className="container" style={{ width: "600px" }}>
      <div className="my-2">
        <h4>Upload multiple Files</h4>
      </div>
      <UploadContainer />
    </div>
  );
}

export default App;
