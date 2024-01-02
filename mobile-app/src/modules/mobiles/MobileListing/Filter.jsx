import React from 'react';
import { Input, Slider, Button, Checkbox, Select } from 'antd';

const { Search } = Input;
const { Option } = Select;

const Sidebar = ({
  handleSearch,
  handlePriceRangeChange,
  clearFilters,
  handleFeatureChange, 
  handleColorChange,
  applyFilters,
}) => {
  const colorOptions = ['phantom gray', 'sorta sage','frosted black','aurora white','cosmic black','phantom black','product(red)','mystic bronze'];
  const featureOptions = ['Wi-Fi', 'Bluetooth', 'GPS'];

  return (
    <div style={{ width: '300px', padding: '16px', borderRight: '1px solid #e8e8e8' }}>
      <h3>Filters</h3>
      <Search
        placeholder="Search mobiles..."
        onSearch={handleSearch}
        enterButton
        style={{ marginBottom: '16px' }}
      />
      <b>By Price </b>
      <Slider
        range
        defaultValue={[0, 1500]}
        max={2000}
        onChange={handlePriceRangeChange}
        style={{ marginBottom: '16px' }}
      />

<Checkbox.Group style={{ marginBottom: '16px' }} onChange={handleFeatureChange}>
        {featureOptions.map((feature) => (
          <Checkbox key={feature} value={feature}>
            {feature}
          </Checkbox>
        ))}
      </Checkbox.Group>

      <Select
        mode="multiple"
        placeholder="Select colors"
        style={{ width: '100%', marginBottom: '16px' }}
        onChange={handleColorChange}
      >
        {colorOptions.map((color) => (
          <Option key={color} value={color}>
            {color}
          </Option>
        ))}
      </Select>

      <Button type="primary" onClick={applyFilters}>
        Apply Filters
      </Button>
      <Button onClick={clearFilters} style={{ marginLeft: '8px' }}>
        Clear Filters
      </Button>
    </div>
  );
};

export default Sidebar;
