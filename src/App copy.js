import React, {useState} from 'react';
import './App.css';





function App() {
  return (
    <div className ="App">
     <Choice/> 
    </div>
  );
}


function Choice (){
  const [page, setPage] = useState("");

  function ToUpload(){
    setPage ("Upload");
  }
  
  function ToBrowse(){
    setPage ("Browse");
  }

  return (
    <div className ="Question" >
     {page === " " && 
     <>
       <h1>Welcome To PicPic</h1>
       <h2>Now You'd Like to</h2>
       <button onClick ={ToUpload}>Upload Pics</button>
       <button onClick ={ToBrowse}>View Pics</button>
     </>
  )}

  {page === "Upload" && <UploadPage />}
  {page === "Browse" && <BrowsePage />}
  </div>
  );
}


function UploadPage() {
  return <div>This is the upload page.</div>;
}
function BrowsePage() {
  return <div>This is the Browse page.</div>;
}

export default App;


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






















function UploadPage() {
  this.state = {
    previewVisible: false,
    previewImage: '',
    fileList: [
      {
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-2',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-3',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-4',
        name: 'image.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },
      {
        uid: '-5',
        name: 'image.png',
        status: 'error',
      },
    ],
  };

  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }

  function PictureWall(props) {
    const { previewVisible, previewImage, fileList } = this.props.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );


    this.handleCancel = () => this.setState({ previewVisible: false });


    this.handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
    };

     
      return (
        <div className="clearfix">
          <Upload
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            listType="picture-card"
            fileList={fileList}
            onPreview={this.handlePreview}
            onChange={this.handleChange}
          >
            {fileList.length >= 8 ? null : uploadButton}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </div>
      );
    }
    return(
      <PictureWall state={this.state} />
    )
}





function BrowsePage() {
  return (
  <div>This is the Browse page.</div>
  )
}