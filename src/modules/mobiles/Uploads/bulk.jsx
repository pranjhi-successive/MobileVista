import React, { useState } from "react";
import { message } from "antd";
import "./bulk.css";
import BulkUploadList from "./history";
import { Dragger } from "../../../components";
import { InboxOutlined } from "../../../components/Icons/Icons";
const Bulk = () => {
  const [fileList, setFileList] = useState([]);
  const [fetchHistory, setFetchHistory] = useState(true);

  const handleUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch("http://localhost:4000/up/bulk-upload", {
        method: "POST",
        body: formData,
      });
      if (response.ok) {
        message.success(`${file.name} uploaded successfully`);
      } else {
        message.error(`${file.name} upload failed.`);
      }
    } catch (error) {
      message.error("File upload failed.");
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
          console.error("Error uploading file:", error);
          onError(error);
        });
    },
    onChange(info) {
      setFetchHistory(true);
      setFileList(info.fileList);
    },
    onRemove(file) {
      handleRemove(file);
    },
    accept: ".csv",
    listType: "picture",
    progress: {
      strokeColor: {
        "0%": "#108ee9",
        "100%": "#87d068",
      },
      format: (percent) => percent && `${parseFloat(percent.toFixed(1))}%`,
      style: { width: "97%" },
    },
  };

  return (
    <div 
    style={{ padding: "0 24px", minHeight: 880 }}>
      <Dragger
    data-testid="file-input"
        {...props}
        fileList={fileList}
        showUploadList={{ showPreviewIcon: true, showRemoveIcon: true }}
      >
        <div className="dragger-container">
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
        </div>
      </Dragger>
      <div>
        <BulkUploadList fetchHistory={fetchHistory} setFetchHistory={setFetchHistory} />
      </div>
    </div>
  );
};

export default Bulk;
