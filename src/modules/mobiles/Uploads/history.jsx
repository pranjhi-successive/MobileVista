import React, { useEffect, useState } from "react";
import ErrorDetail from "./ErrorDetail";
import {
  Button,
  Drawer,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Space,
} from "../../../components";
import { EyeOutlined } from "../../../components/Icons";
import apiInstance from "../../../service/services";

const BulkUploadList = (props) => {
  const { fetchHistory, setFetchHistory } = props;

  const [bulkUploads, setBulkUploads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drawerItemId, setDrawerItemId] = useState("");
  const fetchApiResponse = async () => {
    console.log("In fetch response", loading);
    try {
      const apiResponse = await apiInstance.get(`/up/bulk-uploads-list`);

      if (Array.isArray(apiResponse.data)) {
        setBulkUploads(apiResponse.data);
      } else {
        console.error("Invalid data format:", apiResponse.data);
      }
    } catch (error) {
      console.log("Some error in fetching bulk upload details", error);
    } finally {
      setLoading(false);
      setFetchHistory(false);
    }
  };

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("right");
  const showDrawer = (id) => {
    setDrawerItemId(id);
    setOpen(true);
  };
  const onChange = (e) => {
    setPlacement(e.target.value);
  };
  const onClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("In fetch history");
    if (fetchHistory) {
      fetchApiResponse();
    }
  }, [fetchHistory]);
  return (
    <div className="bulk-upload-container">
      <h1>Upload History</h1>
      <RadioGroup value={placement} onChange={onChange}>
        <Radio value="top">top</Radio>
        <Radio value="right">right</Radio>
        <Radio value="bottom">bottom</Radio>
        <Radio value="left">left</Radio>
      </RadioGroup>

      <List
        dataSource={bulkUploads}
        pagination={{
          showSizeChanger: true,
          position: "top",
          pageSize: 6,
        }}
        renderItem={(item) => (
          <ListItem>
            <div className="record-details">
              <div>Total: {item.totalEntries}</div>
              <div>File Name: {item.fileName}</div>
              <div>Success: {item.totalEntries - item.totalErrors}</div>
              <div>Errors: {item.totalErrors}</div>
              <div>Time Taken: {item.timeTaken}</div>
              <div>
                Uploaded At: {new Date(item.createdAt).toLocaleString()}
              </div>
              <div>Session Id: {item.session_id}</div>
            </div>
            <div className="view-errors">
              <Button
                type="primary"
                onClick={() => showDrawer(item.session_id)}
              >
                <EyeOutlined className="action-icon" />
                View Errors
              </Button>
            </div>
          </ListItem>
        )}
      />
      <Drawer
        title="Errors"
        placement={placement}
        width={500}
        onClose={onClose}
        open={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="primary" onClick={onClose}>
              OK
            </Button>
          </Space>
        }
      >
        <ErrorDetail sessionId={drawerItemId} />
      </Drawer>
    </div>
  );
};

export default BulkUploadList;
