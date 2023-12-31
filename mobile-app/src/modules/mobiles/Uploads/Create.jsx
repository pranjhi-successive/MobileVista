import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { Form, Input, InputNumber, DatePicker, Checkbox, Button, Space, Select, message } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

const MobileCreate = ({ history }) => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate();
  
    const handleSubmit = async (values) => {
      try {
        setLoading(true);
        console.log('Form values:', values);
        const response = await axios.post('http://localhost:4000/api/create', values);
        console.log('Response:', response.data);
        message.success('Mobile created successfully');
        navigate('/dashboard/mobiles')
      } catch (error) {
        console.error('Error creating mobile:', error);
        message.error('Failed to create mobile');
      } finally {
        setLoading(false);
      }
    };
    const containerStyle = {
      padding: '20px',
      maxWidth: '600px',
      margin: '0 auto',
      background: isHovered ? '#f0f0f0' : '#fff',
      transition: 'background 0.3s ease-in-out',
      borderRadius: '5px',
      border: isHovered ? '1px solid #aaa' : '1px solid #d9d9d9',
      boxShadow: isHovered ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)', 
    };
  
    const formStyle = {
      border: '1px solid #d9d9d9',
      borderRadius: '5px',
      padding: '20px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      textAlign:'left',
    };

    const tailFormItemLayout = {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 8,
          },
        },
      };
  return (
    <div
    style={containerStyle}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
  >
    <div >
      <h2 style={{
    textAlign: 'center',
    color: 'black',  
    fontSize: '2.5em',    
    margin: '20px 0',      
    fontFamily: 'Arial, sans-serif',
    fontWeight: 'bold',   
    textTransform: 'uppercase', 
    letterSpacing: '1px',   
    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.1)', 
  }}>Create Mobile</h2>
      <Form form={form} onFinish={handleSubmit} labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} style={formStyle}scrollToFirstError>
        <Form.Item label="Brand" name="brand" rules={[{ required: true, message: 'Please enter the brand!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Model Number" name="modelNumber" rules={[{ required: true, message: 'Please enter the model number!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Price" name="price" rules={[{ required: true, type: 'number', message: 'Please enter the price!' }]}>
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Color" name="color" rules={[{ required: true, message: 'Please enter the color!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Specifications" wrapperCol={{ span: 16 }}>
          <Space direction="vertical">
            <Form.Item name={['specifications', 'display']} label="Display" rules={[{ required: true, message: 'Please enter the display specification!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['specifications', 'camera']} label="Camera" rules={[{ required: true, message: 'Please enter the camera specification!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['specifications', 'processor']} label="Processor" rules={[{ required: true, message: 'Please enter the processor specification!' }]}>
              <Input />
            </Form.Item>
            <Form.Item name={['specifications', 'storage']} label="Storage" rules={[{ required: true, message: 'Please enter the storage specification!' }]}>
              <Input />
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item label="Release Date" name="releaseDate" rules={[{ required: true, message: 'Please select the release date!' }]}>
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Battery Capacity" name="batteryCapacity" rules={[{ required: true, message: 'Please enter the battery capacity!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Connectivity" wrapperCol={{ span: 16 }}>
          <Space>
            <Form.Item name={['connectivity', 'wifi']} valuePropName="checked">
              <Checkbox>Wi-Fi</Checkbox>
            </Form.Item>
            <Form.Item name={['connectivity', 'bluetooth']} valuePropName="checked">
              <Checkbox>Bluetooth</Checkbox>
            </Form.Item>
            <Form.Item name={['connectivity', 'cellular']} valuePropName="checked">
              <Checkbox>Cellular</Checkbox>
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item label="Weight" name="weight">
          <InputNumber style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item label="Operating System" name="operatingSystem" rules={[{ required: true, message: 'Please enter the operating system!' }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Is Water Resistant" name="isWaterResistant" valuePropName="checked">
          <Checkbox />
        </Form.Item>

        <Form.Item label="Additional Features" name="additionalFeatures">
          <Select mode="tags" style={{ width: '100%' }} placeholder="Enter additional features" />
        </Form.Item>

        <Form.Item label="Accessories" name="accessories">
          <Form.List name="accessories">
            {(fields, { add, remove }) => (
              <>
                {fields.map(({ key, name, fieldKey, ...restField }) => (
                  <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                    <Form.Item
                      {...restField}
                      name={[name, 'name']}
                      fieldKey={[fieldKey, 'name']}
                      rules={[{ required: true, message: 'Please enter the accessory name!' }]}
                    >
                      <Input placeholder="Accessory Name" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'type']}
                      fieldKey={[fieldKey, 'type']}
                    >
                      <Input placeholder="Accessory Type" />
                    </Form.Item>
                    <Form.Item
                      {...restField}
                      name={[name, 'price']}
                      fieldKey={[fieldKey, 'price']}
                      rules={[{ type: 'number', message: 'Please enter a valid price!' }]}
                    >
                      <InputNumber placeholder="Accessory Price" style={{ width: '100%' }} />
                    </Form.Item>
                    <Button type="dashed" onClick={() => remove(name)} style={{ marginLeft: '8px' }}>
                      Remove
                    </Button>
                  </Space>
                ))}
                <Form.Item>
                  <Button type="dashed" onClick={() => add()} block>
                    Add Accessory
                  </Button>
                </Form.Item>
              </>
            )}
          </Form.List>
        </Form.Item>

        <Form.Item label="Warranty" wrapperCol={{ span: 16 }}>
          <Space>
            <Form.Item name={['warranty', 'validUntil']} label="Valid Until">
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item name={['warranty', 'type']} label="Type">
              <Input />
            </Form.Item>
          </Space>
        </Form.Item>

        <Form.Item label="Image URL" name="image" rules={[{ required: true, message: 'Please enter the image URL!' }]}>
          <Input />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}> 
          <Button type="primary" htmlType="submit" loading={loading} >
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default MobileCreate;
