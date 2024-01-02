import React, { useState } from 'react';
import { message, Progress, List } from 'antd';
import Dragger from 'antd/es/upload/Dragger';
import { InboxOutlined } from '@ant-design/icons';
import './bulk.css'
const Bulk = () => {
  const [fileList, setFileList] = useState([]);
  const [uploadHistory, setUploadHistory] = useState([]);

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('http://localhost:4000/up/importUser', {
        method: 'POST',
        body: formData,
      });

      const uploadedFile = {
        uid: file.uid,
        name: file.name,
        status: response.ok ? 'done' : 'error',
      };

      setUploadHistory((prevHistory) => [...prevHistory, uploadedFile]);

      if (response.ok) {
        message.success(`${file.name} uploaded successfully`);
      } else {
        message.error(`${file.name} upload failed.`);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      message.error('File upload failed.');
    }
  };

  const handleRemove = (file) => {
    const newFileList = fileList.filter((item) => item.uid !== file.uid);
    setFileList(newFileList);
  };

  const props = {
    customRequest: ({ onSuccess, onError, file }) => {
      handleUpload(file)
        .then(() => onSuccess())
        .catch((error) => {
          console.error('Error uploading file:', error);
          onError(error);
        });
    },
    onChange(info) {
      setFileList(info.fileList);
    },
    onRemove(file) {
      handleRemove(file);
    },
  };

  return (
    <div>
      <Dragger {...props} fileList={fileList} showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}>
      <div className="dragger-container">
      <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
   </div>
      </Dragger>
      <div>
        {fileList.map((file) => (
          <div key={file.uid}>
            {/* <span>{file.name}</span> */}
            {file.status === 'uploading' && <Progress percent={file.percent} />}
          </div>
        ))}
      </div>
      <List
      className="upload-history"
        header={<div>Upload History</div>}
        bordered
        dataSource={uploadHistory}
        renderItem={(item) => (
          <List.Item className='upload-history-item'>
            <span>{item.name}</span>
            {item.status === 'done' && <span style={{ color: 'green', marginLeft: '10px' }}>Uploaded successfully</span>}
            {item.status === 'error' && <span style={{ color: 'red', marginLeft: '10px' }}>Upload failed</span>}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Bulk;
