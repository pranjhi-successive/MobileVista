import React, { useEffect, useState } from "react";
import { Spin, Table } from "../../../components";
import apiInstance from "../../../service/services";

const ErrorDetail = (props) => {
  const { sessionId } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);

  const [bulkErrors, setBulkErrors] = useState([]);
  const [loading, setLoading] = useState(true);
  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setItemsPerPage(size);
  };

  const handleApiResponse = async () => {
    console.log("id", sessionId);
    try {
      const apiResponse = await apiInstance.get(
        `/up/bulk-errors/${sessionId}?page=${currentPage}&limit=${itemsPerPage}`
      );
      setBulkErrors(apiResponse.data.data);
      console.log(apiResponse.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    handleApiResponse();
  }, [sessionId]);

  const columns = [
    {
      title: "Error Details",
      dataIndex: "errorDetails",
      key: "errorDetails",
    },
  ];

  return (
    <div>
      <div>
        {loading ? (
          <Spin tip="Loading..." />
        ) : (
          <Table
            onChange={handlePageChange}
            dataSource={bulkErrors}
            columns={columns}
            rowKey={(record) => record.rowNumber}
            show
          />
        )}
      </div>
    </div>
  );
};

export default ErrorDetail;
