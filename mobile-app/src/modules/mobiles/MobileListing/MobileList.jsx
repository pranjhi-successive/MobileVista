import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Spin, Alert, Rate, Space, Image, Layout, List } from 'antd';
import { Link } from 'react-router-dom';
import Sidebar from './Filter';
import '../css/Mobile.css';
const { Content, Sider } = Layout;

const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

const MobileList = () => {
  const [mobiles, setMobiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [value, setValue] = useState(3);
  const [filteredMobiles, setFilteredMobiles] = useState([]);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState('');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const handleColorChange = (selectedColors) => {
    console.log('Selected Colors:', selectedColors);
    setSelectedColors(selectedColors);
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
    console.log(page);
  };
  useEffect(() => {
    const apiUrl = `http://localhost:4000/api/mobiles?page=${currentPage}`
    axios
      .get(apiUrl)
      .then((response) => {
        setMobiles(response.data.data);
        setFilteredMobiles(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [currentPage]);

  useEffect(() => {
    console.log('Mobiles:', mobiles);
    console.log('Filtered Mobiles:', filteredMobiles);
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
    console.log('Clearing filters...');
    setSearchValue('');
    setPriceRange([0, 2000]);
    setSelectedFeatures([]);
    setSelectedColors([]);
    setFilteredMobiles(mobiles);
  };

  const handlePriceRangeChange = (value) => {
    setPriceRange(value);
  };

  const applyFilters = () => {
    console.log('Applying filters...');
  
    const filtered = mobiles.filter((mobile) => {
      console.log('Mobile Color:', mobile.color.toLowerCase());
      console.log('Selected Colors:', selectedColors);
  
      return (
        mobile.brand.toLowerCase().includes(searchValue.toLowerCase()) &&
        mobile.price >= priceRange[0] &&
        mobile.price <= priceRange[1] &&
        ((selectedFeatures.length === 0 && true) ||
          selectedFeatures.every((feature) => mobile.specifications && mobile.specifications[feature])) &&
        (selectedColors.length === 0 ||
          selectedColors.includes(mobile.color.toLowerCase()))
      );
    });
  
    setFilteredMobiles(filtered);
  };
  
  
  

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
       <Sider width={300} style={{ background: '#fff' }}>
        <Sidebar
          handleSearch={handleSearch}
          handlePriceRangeChange={handlePriceRangeChange}
          clearFilters={clearFilters}
          handleFeatureChange={handleFeatureChange} // Pass handleFeatureChange here
          handleColorChange={handleColorChange}
          applyFilters={applyFilters}
        />
      </Sider>

      <Layout style={{ padding: '16px' }}>
        <Content>
        <h2 style={{
    textAlign: 'left',
    color: '#4285f4',  
    fontSize: '2.5em',    
    margin: '20px 0',      
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',   
    textTransform: 'uppercase', 
    letterSpacing: '1px',   
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', 
  }}>Mobile List</h2>
          <Content style={{ padding: '0 24px', minHeight: 280 }}>
            <List
              grid={{ gutter: 16, column: 3 }}
              size="small"
              pagination={{
                position:'top',
                onChange: handlePageChange,
                pageSize: 6,
                count:24,
              }}
              dataSource={filteredMobiles} 
              renderItem={(mobile) => (
                <Link to={`/dashboard/mobiles/${mobile.modelNumber}`} key={mobile.modelNumber}>
                  <Card
                    key={mobile.id}
                    hoverable
                    className="mobile-card"
                    cover={<Image width={380} height={250} src={mobile.image} />}
                  >
                    <div className="mobile-info">
                      <Space direction="vertical">
                        <p className="brand">Brand: {mobile.brand}</p>
                        <p className="model">Model: {mobile.modelNumber}</p>
                        <p className="price">Price: {mobile.price}</p>
                      </Space>
                      <Space direction="vertical">
                        <Rate
                          tooltips={desc}
                          onChange={(value) => setValue(value)}
                          value={mobile.rating}
                        />
                        {mobile.rating ? <span>{desc[mobile.rating - 1]}</span> : ''}
                      </Space>
                    </div>
                  </Card>
                </Link>
              )}
            />
          </Content>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MobileList;