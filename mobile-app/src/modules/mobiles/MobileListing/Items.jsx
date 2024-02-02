import React, { Suspense, useContext, useEffect, useState } from "react";
import {
  message,
} from "antd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/Mobile.css";
import { ListingContext } from "./Listing";
import { Card } from "../../../components/Card";
import { Image, List, Popconfirm, Rate, Space, Spin } from "../../../components";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "../../../components/Icons";
export const LazyCardImage = ({ src }) => (
  <Suspense
    fallback={
      <Spin tip="Loading" size="large">
        please wait ....
      </Spin>
    }
  >
    <Image
      className="lazy-load"
      width={380}
      height={250}
      src={src}
      loading="lazy"
      data-testid="lazy-image"
    />
  </Suspense>
);

export const deleteCancel = () => {
  message.error("Clicked on No");
};

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];

const Items = () => {
  const navigate = useNavigate();

  const {
    filters,
    toFetch,
    setToFetch,
    currentPage,
    setCurrentPage,
    itemsPerPage,
    setItemsPerPage,
  } = useContext(ListingContext);

  const [totalItems, setTotalItems] = useState(0);

  const [mobiles, setMobiles] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const handlePageChange = (page, size) => {
    setCurrentPage(page);
    setItemsPerPage(size);
    setToFetch(true);
    console.error(error);

  };

  const handleEdit = async (id) => {
    navigate(`/edit/${id}`);
  };
  const handleView = (id) => {
    navigate(`${id}`);
  };

  const handleFilters = () => {
    let filter = "";

    if (filters.color?.length >0) {
      filter = filter + "color=" + filters.color.join(",") + "&";
    }
    if (filters.brand?.length>0) {
      filter = filter + "brand=" + filters.brand.join(",") + "&";
    }
    if (filters.price?.length>0) {
      filter = filter + "price=" + filters.price.join(",") + "&";
    }
    if (filters.searchText?.length>0) {
      filter = filter + "searchText=" + filters.searchText;
    }
    return filter;
    
  };

  const fetchedData = async () => {
    const filterQuery = handleFilters();
    const apiUrl = `http://localhost:4000/api/mobiles?${filterQuery}&page=${currentPage}&limit=${itemsPerPage}`;
    try {
      const response = await axios.get(apiUrl);
      setTotalItems(response.data.data.total);
      setMobiles(response.data.data.mobiles);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      console.error(error);
      setLoading(false);
    } finally {
      setToFetch(false);
    }
  };
  useEffect(() => {
    if (toFetch) {
      fetchedData();
    }
  }, [toFetch]);

  const deleteOk = async (id) => {
    await axios.delete(`http://localhost:4000/api/mobiles/${id}`);
    message.success("Deleted");
    fetchedData();
  };

  if (loading) {
    return (
      <Spin tip="Loading" size="large">
        Loading ....
      </Spin>
    );
  }

  return (
    <>
      <h1
        style={{
          textAlign: "left",
          color: "#4285f4",
          fontSize: "2.5em",
          margin: "20px 0",
          fontFamily: "Arial, sans-serif",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "1px",
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
      >
        Mobile List
      </h1>
      <List
        grid={{ gutter: 16, column: 3 }}
        size="small"
        pagination={{
          position: "top",
          onChange: handlePageChange,
          pageSize: itemsPerPage,
          total: totalItems,
          pageSizeOptions: [6, 12, 18, 24, 30, 36, 60],
          current: currentPage,
        }}
        dataSource={mobiles}
        renderItem={(mobile, index) => (
          <Card
            aria-label="card"
            key={mobile.id}
            hoverable
            data-testid="card"
            className="mobile-card"
            cover={<LazyCardImage src={mobile.image} />}
            actions={[
              <EyeOutlined
                key={`eye`}
                data-testid={`view-icon-${index}`}
                onClick={() => handleView(mobile._id)}
              />,
              <Link key={"link"} to={`/edit/${mobile._id}`}>
                <EditOutlined
                  key={`edit`}
                  data-testid={`edit-icon-${index}`}
                  onClick={() => handleEdit(mobile._id)}
                />
              </Link>,
              <Popconfirm
                data-testid="pop"
                key={`popconfirm`}
                title="Delete the task"
                description="Are you sure to delete this task?"
                onConfirm={() => deleteOk(mobile._id)}
                onCancel={deleteCancel}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined
                  key={`delete`}
                  data-testid={`delete-icon-${index}`}
                />
              </Popconfirm>,
            ]}
          >
            <div className="mobile-info">
              <Space direction="vertical">
                <p className="brand">Brand: {mobile.brand}</p>
                <p className="models">Model: {mobile.modelNumber}</p>
                <p className="price">Price: {mobile.price}</p>
              </Space>
              <Space direction="vertical">
                <Rate tooltips={desc} value={mobile.rating} />
                {mobile.rating ? <span>{desc[mobile.rating - 1]}</span> : ""}
              </Space>
            </div>
          </Card>
        )}
      />
    </>
  );
};

export default Items;
