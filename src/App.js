import React, { useState, useEffect } from "react";
import "./App.css";
import { Upload, message, Button, Icon, Layout, Menu, Modal,Card, } from 'antd';
import "antd/dist/antd.css";
import * as firebase from 'firebase';
import EditableTagGroup from "./EditableTagGroup"



var firebaseConfig = {
  apiKey: "AIzaSyCKjYQ13B10z0z2foSxxFNKsIQ0myHr8uQ",
  authDomain: "picpic-ad37c.firebaseapp.com",
  databaseURL: "https://picpic-ad37c.firebaseio.com",
  projectId: "picpic-ad37c",
  storageBucket: "picpic-ad37c.appspot.com",
  messagingSenderId: "430981483427",
  appId: "1:430981483427:web:f5c2a7e59ed3b207c26816",
  measurementId: "G-7NBYSTMM6R"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();






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
            <button className="button" onClick={handleToUpload}>Upload Pics</button>
            <button className="button" onClick={handleToBrowse}>View Pics</button>
          </div>
        </div>
      )}

      {page === "upload" && <UploadPage handleToBrowse={handleToBrowse} />}
      {page === "browse" && <BrowsePage />}
    </div>
  );
}



function UploadPage(props) {

  const uploadProps = {
    name: 'file',
    action: file => {
      console.log(file);
      return new Promise((resolve, reject) => {
        let ref = firebase.storage().ref(file.name);
        ref.put(file).then(function(snapshot) {
          console.log('Uploaded a blob or file!');
          resolve();
        });
      });
    },
    headers: {
      authorization: 'authorization-text',
    },
    onChange: (info) => {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
        props.handleToBrowse();

      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } //else if (info.file.status === 'error') {
        //message.error(`${info.file.name} file upload failed.`);
      //}
    }
  };

  return (
    // <Fab color="primary" aria-label="add">
    // <AddIcon />
    // </Fab>
    <div>
      <h1 class="Welcome">Welcome To Picpic</h1>

      <Upload {...uploadProps}>
        <Button className="UploadButton">
          <Icon type="upload" /> Upload Here :)
    </Button>
      </Upload>
    </div>
  );
}




function BrowsePage() {

  const { Header, Sider, Content } = Layout;

  const [collapsed, setCollapsed] = useState(false);
  const [images, setImages] = useState(false);
  const [modalState, setModalState] = useState({visible: false, imageURL: null});
  const [searchTerm, setSearchTerm] = useState("");



  function setTags(newTags) {

    if (!modalState.imageURL) {
      return ;
    }

    setImages({...images, [modalState.imageURL]: newTags});

    console.log("Set new tags: ", newTags);
  }

  function toggle() {
    setCollapsed(!collapsed);
  }

  useEffect(() => {
    console.log('useEffect');
    if (images !== false) {
      return ;
    }

    var listRef = firebase.storage().ref().root;
    // Find all the prefixes and items.
    listRef.list().then(function(res) {
      let promises = res.items.map(item => item.getDownloadURL());
      Promise.all(promises).then(function (urls) {
        let images = {};
        urls.forEach(url => {
          images[url] = [];
        });
        setImages(images);
        // console.log(urls);
      })
    }).catch(function(error) {
      // Uh-oh, an error occurred!
    });
  });


function handleOK(){
  setModalState({visible: false, imageURL: null});
}
 
function handleCancel(){
  setModalState({visible: false, imageURL: null});
}

function handleClicked(image) {
  setModalState({visible: true, imageURL: image});
}

function handleSearchTermChanged(e) {
  setSearchTerm(e.target.value);
}

  //render() {
  return (
  
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">
            <Icon type="" />
            <span>Sceneries</span>
          </Menu.Item>
          <Menu.Item key="2">
            <Icon type="" />
            <span>Friends</span>
          </Menu.Item>
          <Menu.Item key="3">
            <Icon type="" />
            <span>Screen Shots </span>
          </Menu.Item>
        </Menu>
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <Icon
            className="trigger"
            type={collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={toggle}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
        >
 
          
              <form>
                <label>
                  Search:
                  <input type="text" name="name" value={searchTerm} onChange={handleSearchTermChanged}/>
                </label>
              </form>
 
 
 
              <Modal
              title="Basic Modal"
              visible={modalState.visible}
              onOK={handleOK}
              onCancel={handleCancel}
              >
                <EditableTagGroup setTags={setTags} tags={modalState.imageURL ? images[modalState.imageURL] : []}/>
              </Modal>

          {images && Object.keys(images).length > 0 && Object.keys(images).map(url => {

            if (searchTerm != "" && !images[url].includes(searchTerm)) {
              return <div></div>;
            }

            return (
              <div onClick={e => handleClicked(url)}>
                <Card 
                hoverable
                cover={<img className="images" width="10px" src={url} />}
                >
                </Card>
              </div>
            );
            
          })}
          
          </Content>
      </Layout>
    </Layout>


  );
  //}

  
}




export default App;