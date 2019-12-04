import React, { useState } from "react";
import "./App.css";
import { Upload, message, Button, Icon } from 'antd';



function App() {
  const [page, setPage] = useState("");

  function handleToUpload() {
    setPage("upload");
  }

  function handleToBrowse() {
    setPage("browse");
  }

  return (
    <div className="App">

      {page === "" && (
        <div className="Question" >
          <h1>Welcome to Picpic</h1>
          <p>Now you'd like to:</p>
          <div className="Choice">
           <button className = "button" onClick={handleToUpload}>Upload Pics</button>
           <button className = "button" onClick={handleToBrowse}>View Pics</button>
          </div>
        </div>
      )}

      {page === "upload" && <UploadPage />}
      {page === "browse" && <BrowsePage />}
    </div>
  );
}



function UploadPage() {

  const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    }
  }
  
  
 function onChange(info) {
   if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  }

  return (
  // <Fab color="primary" aria-label="add">
  // <AddIcon />
  // </Fab>
  <div>
    <div>Upload</div>

  <Upload {...props}>
    <Button className="UploadButton">
    <Icon type="upload" /> Click to Upload
    </Button>
  </Upload>
</div>
  );
}




function BrowsePage() {
  return (
  <div>This is the Browse page.</div>
  )
}


export default App;