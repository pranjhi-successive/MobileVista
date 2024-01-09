import React, { useState, useEffect, lazy, Suspense } from "react";
import axios from "axios";
import {
  Card,
  Spin,
  Alert,
  Rate,
  Space,
  Image,
  Layout,
  List,
  Popconfirm,
  message,
  Form,
} from "antd";
import { Link, useNavigate, useParams } from "react-router-dom";
import Sidebar from "./Filter";
import "../css/Mobile.css";
import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
const { Content, Sider } = Layout;

const desc = ["Terrible", "Bad", "Normal", "Good", "Wonderful"];
const MobileList = ({ items }) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(3);
  const [filteredMobiles, setFilteredMobiles] = useState([]);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [ItemsPerPage, setItemsPerPage] = useState(6);
  const [isEdit, setIsEdit] = useState(false);
  const handleView = (id) => {
    navigate(`${id}`);
  };

  const handleEdit = async (id) => {
    // const response=await axios.get(`http://localhost:4000/api/mobile/${id}`);
    // const mobileData = response.data.data;
    // await axios.post("http://localhost:4000/api/mobile/:brand");
    try {
      setIsEdit(true);
      // const response = await axios.put(`http://localhost:4000/api/mobile/${id}`);
      // const mobileData = response.data.data;
      navigate("/uploads");
    } catch (error) {
      console.error("Error fetching mobile details hghjgj:", error);
    }
  };

  const deleteOk = async (id) => {
    await axios.delete(`http://localhost:4000/api/mobiles/${id}`);
    message.success("Deleted");
    fetchedData();
  };

  const deleteCancel = () => {
    message.error("Click on No");
  };

  const handleColorChange = (selectedColors) => {
    console.log("Selected Colors:", selectedColors);
    setSelectedColors(selectedColors);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(page);
  };
  const fetchedData = () => {
    const apiUrl = `http://localhost:4000/api/mobiles?page=${currentPage}&limit=${ItemsPerPage}`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log(response.data);
        setTotalItems(response.data.data.total);
        setMobiles(response.data.data.mobiles);
        setFilteredMobiles(response.data.data.mobiles);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  };
  useEffect(() => {
    fetchedData();
  }, [currentPage]);

  useEffect(() => {
    console.log("Mobiles:", mobiles);
    console.log("Filtered Mobiles:", filteredMobiles);
  }, [mobiles, filteredMobiles]);

  const handleSearch = (value) => {
    setSearchValue(value);
    const filteredByBrand = mobiles.filter((mobile) =>
      mobile.brand.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredMobiles(filteredByBrand);
  };
  const handleFeatureChange = (selectedFeatures) => {
    setSelectedFeatures(selectedFeatures);
  };
  const clearFilters = () => {
    console.log("Clearing filters...");
    setSearchValue("");
    setPriceRange([0, 2000]);
    setSelectedFeatures([]);
    setSelectedColors([]);
    setFilteredMobiles(mobiles);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const applyFilters = () => {
    console.log("Applying filters...");

    const filtered = mobiles.filter((mobile) => {
      console.log("Mobile Color:", mobile.color.toLowerCase());
      console.log("Selected Colors:", selectedColors);

      return (
        mobile.brand.toLowerCase().includes(searchValue.toLowerCase()) &&
        mobile.price >= priceRange[0] &&
        mobile.price <= priceRange[1] &&
        ((selectedFeatures.length === 0 && true) ||
          selectedFeatures.every(
            (feature) => mobile.specifications && mobile.specifications[feature]
          )) &&
        (selectedColors.length === 0 ||
          selectedColors.includes(mobile.color.toLowerCase()))
      );
    });

    setFilteredMobiles(filtered);
  };

  const LazyCardImage = ({ src }) => (
    <Suspense fallback={<Spin tip="Loading image..." />}>
      <Image class="lazy-load" width={380} height={250} src={src} loading="lazy" />
    </Suspense>
  );

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <Alert message={`Error: ${error}`} type="error" />;
  }

  if (!Array.isArray(mobiles) || mobiles.length === 0) {
    return <div>No mobiles data available.</div>;
  }

  return (
    <Layout>
      
       <Spin tip="Loading..." spinning={loading}>
      <Sider width={300} style={{ background: "#fff" }}>
        <Sidebar
          handleSearch={handleSearch}
          handlePriceRangeChange={handlePriceRangeChange}
          clearFilters={clearFilters}
          handleFeatureChange={handleFeatureChange}
          handleColorChange={handleColorChange}
          applyFilters={applyFilters}
        />
      </Sider>

      <Layout style={{ padding: "16px" }}>
        <Content>
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
              pageSize: ItemsPerPage,
              total: totalItems,
            }}
            dataSource={filteredMobiles}
            renderItem={(mobile) => (
              <Card
                key={mobile.id}
                hoverable
                className="mobile-card"
                cover={<LazyCardImage src={mobile.image} />}
                actions={[
                  console.log("items", mobile),
                  <EyeOutlined onClick={() => handleView(mobile._id)} />,
                  <Link to={`/edit/${mobile._id}`}>
                    <EditOutlined onClick={() => handleEdit(mobile._id)} />
                  </Link>,
                  <Popconfirm
                    title="Delete the task"
                    description="Are you sure to delete this task?"
                    onConfirm={() => deleteOk(mobile._id)}
                    onCancel={deleteCancel}
                    okText="Yes"
                    cancelText="No"
                  >
                    <DeleteOutlined />
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
                    <Rate
                      tooltips={desc}
                      onChange={(value) => setValue(value)}
                      value={mobile.rating}
                    />
                    {mobile.rating ? (
                      <span>{desc[mobile.rating - 1]}</span>
                    ) : (
                      ""
                    )}
                  </Space>
                </div>
              </Card>
            )}
          />
        </Content>
      </Layout>
      </Spin>
    </Layout>
  );
};

export default MobileList;
