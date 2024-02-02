import React, { useContext } from "react";
import "../../mobiles/css/Filter.css";
import { ListingContext } from "./Listing";
import colors from "./Colors";
import brands from "./Brands";
import { Button, Select, Slider,Search } from "../../../components";
import { SearchOutlined } from "../../../components/Icons/Icons";
import { Input } from "antd";


const Sidebar = () => {
  const colorOptions = Object.values(colors).map((color) => ({
    label: color,
    value: color,
    desc: color,
  }));
  const brandOptions = Object.values(brands).map((brand) => ({
    label: brand,
    value: brand,
    desc: brand,
  }));

  const { setToFetch, filters, setFilters, setCurrentPage, setItemsPerPage } =
    useContext(ListingContext);
  const handleRestore = () => {
    setCurrentPage(1);
    setItemsPerPage(6);
  };
  return (
    <div className="sidebar-container">
      <Search
        placeholder="Search mobiles..."
        onChange={(e) => setFilters({ ...filters, searchText: e.target.value })}
        onPressEnter={()=>setToFetch(true)}
        enterButton={<SearchOutlined />}
        onSearch={() => setToFetch(true)}
        className="search-input"
        value={filters.searchText}
      />
      <h3>Filters</h3>
      <b>By Price </b>
      <Slider
       data-testid="slider"
       label="slider"
        range
        defaultValue={[0, 2000]}
        onChange={(value) => setFilters({ ...filters, price: value })}
        max={2000}
        value={filters.price}
        className="price-slider"
      />
      <br></br>
      <b> By Color</b>
      <Select
        mode="multiple"
        placeholder="Select colors"
        className="color-select"
        onChange={(value) => setFilters({ ...filters, color: value })}
        options={colorOptions}
        value={filters.color}
      ></Select>
      <b>By Brand </b>
      <Select
        mode="multiple"
        data-testid="brand-filter"
        placeholder="Select brand"
        className="color-select"
        onChange={(value) => setFilters({ ...filters, brand: value })}
        options={brandOptions}
        value={filters.brand}
      ></Select>

      <div >
        <Button
          type="primary"
          onClick={() => {
            handleRestore();
            setToFetch(true);
          }}
          style={{ marginRight: "2.5px" }}

        >
          Apply Filters
        </Button>
        <Button
          onClick={() => {
            setFilters({ price: [0, 2000] });
            handleRestore();
            setToFetch(true);
          }}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
