import React, { useEffect, useState } from "react";
import { Form, message } from "antd";
import {
  Button,
  Checkbox,
  DatePicker,
  FormItem,
  FormList,
  Input,
  InputNumber,
  Select,
  Space,
} from "../../../components";
import apiInstance from "../../../service/services";

const MobileForm = (props) => {
  const { mobile, submitMessage, formHeading, url, method, message1 } = props;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  console.log(mobile);

  useEffect(() => {
    form.setFieldsValue(mobile);
  }, [form, mobile]);

  const handleSubmit = async (values) => {
    const options = {
      url,
      data: values,
      method,
    };
    try {
      setLoading(true);
      const response = await apiInstance.request(options);
      console.log("Response:", response.data);
      message.success(message1);
      window.location.reload();
    } catch (error) {
      console.error("Error creating mobile:", error);
      message.error("Failed to create mobile");
    } finally {
      setLoading(false);
    }
  };
  const containerStyle = {
    padding: "20px",
    maxWidth: "600px",
    margin: "0 auto",
    background: isHovered ? "#f0f0f0" : "#fff",
    transition: "background 0.3s ease-in-out",
    borderRadius: "5px",
    border: isHovered ? "1px solid #aaa" : "1px solid #d9d9d9",
    boxShadow: isHovered
      ? "0 4px 8px rgba(0,0,0,0.2)"
      : "0 2px 4px rgba(0,0,0,0.1)",
  };

  const formStyle = {
    border: "1px solid #d9d9d9",
    borderRadius: "5px",
    padding: "20px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
    textAlign: "left",
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
      <div>
        <h2
          style={{
            textAlign: "center",
            color: "black",
            fontSize: "2.5em",
            margin: "20px 0",
            fontFamily: "Arial, sans-serif",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "1px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 0.1)",
          }}
        >
          {formHeading}
        </h2>
        <Form
          aria-label="create"
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={formStyle}
          scrollToFirstError
        >
          <FormItem
            label="Brand"
            name="brand"
            rules={[{ required: true, message: "Please enter the brand!" }]}
          >
            <Input />
          </FormItem>

          <FormItem
            label="Model Number"
            name="modelNumber"
            rules={[
              { required: true, message: "Please enter the model number!" },
            ]}
          >
            <Input />
          </FormItem>

          <FormItem
            label="Price"
            name="price"
            rules={[
              {
                required: true,
                type: "number",
                message: "Please enter the price!",
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </FormItem>

          <FormItem
            label="Color"
            name="color"
            rules={[{ required: true, message: "Please enter the color!" }]}
          >
            <Input />
          </FormItem>

          <FormItem label="Specifications" wrapperCol={{ span: 16 }}>
            <Space direction="vertical">
              <FormItem
                name={["specifications", "display"]}
                label="Display"
                rules={[
                  {
                    required: true,
                    message: "Please enter the display specification!",
                  },
                ]}
              >
                <Input />
              </FormItem>
              <FormItem
                name={["specifications", "camera"]}
                label="Camera"
                rules={[
                  {
                    required: true,
                    message: "Please enter the camera specification!",
                  },
                ]}
              >
                <Input />
              </FormItem>
              <FormItem
                name={["specifications", "processor"]}
                label="Processor"
                rules={[
                  {
                    required: true,
                    message: "Please enter the processor specification!",
                  },
                ]}
              >
                <Input />
              </FormItem>
              <FormItem
                name={["specifications", "storage"]}
                label="Storage"
                rules={[
                  {
                    required: true,
                    message: "Please enter the storage specification!",
                  },
                ]}
              >
                <Input />
              </FormItem>
            </Space>
          </FormItem>

          <FormItem
            label="Release Date"
            name="releaseDate"
            rules={[
              { required: true, message: "Please select the release date!" },
            ]}
          >
            <DatePicker style={{ width: "100%" }} />
          </FormItem>

          <FormItem
            label="Battery Capacity"
            name="batteryCapacity"
            rules={[
              { required: true, message: "Please enter the battery capacity!" },
            ]}
          >
            <Input />
          </FormItem>

          <FormItem label="Connectivity" wrapperCol={{ span: 16 }}>
            <Space>
              <FormItem
                name={["connectivity", "wifi"]}
                valuePropName="checked"
              >
                <Checkbox>Wi-Fi</Checkbox>
              </FormItem>
              <FormItem
                name={["connectivity", "bluetooth"]}
                valuePropName="checked"
              >
                <Checkbox>Bluetooth</Checkbox>
              </FormItem>
              <FormItem
                name={["connectivity", "cellular"]}
                valuePropName="checked"
              >
                <Checkbox>Cellular</Checkbox>
              </FormItem>
            </Space>
          </FormItem>

          <FormItem label="Weight" name="weight">
            <InputNumber style={{ width: "100%" }} />
          </FormItem>

          <FormItem
            label="Operating System"
            name="operatingSystem"
            rules={[
              { required: true, message: "Please enter the operating system!" },
            ]}
          >
            <Input />
          </FormItem>

          <FormItem
            label="Is Water Resistant"
            name="isWaterResistant"
            valuePropName="checked"
          >
            <Checkbox />
          </FormItem>

          <FormItem
            placeholder="Enter additional features"
            label="Additional Features"
            name="additionalFeatures"
          >
            <Select
              mode="tags"
              style={{ width: "100%" }}
              placeholder="Enter additional features"
            />
          </FormItem>

          <FormItem
            label="Accessories"
            placeholder="Accessory Name"
            name="accessories"
          >
            <FormList name="accessories">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space
                      key={key}
                      style={{ display: "flex", marginBottom: 8 }}
                      align="baseline"
                    >
                      <FormItem
                        {...restField}
                        name={[name, "name"]}
                        rules={[
                          {
                            required: true,
                            message: "Please enter the accessory name!",
                          },
                        ]}
                      >
                        <Input placeholder="Accessory Name" />
                      </FormItem>
                      <FormItem {...restField} name={[name, "type"]}>
                        <Input placeholder="Accessory Type" />
                      </FormItem>
                      <FormItem
                        {...restField}
                        name={[name, "price"]}
                        rules={[
                          {
                            type: "number",
                            message: "Please enter a valid price!",
                          },
                        ]}
                      >
                        <InputNumber
                          label="Accessory Price"
                          style={{ width: "100%" }}
                        />
                      </FormItem>
                      <Button
                        type="dashed"
                        onClick={() => remove(name)}
                        style={{ marginLeft: "8px" }}
                      >
                        Remove
                      </Button>
                    </Space>
                  ))}
                  <FormItem>
                    <Button type="dashed" onClick={() => add()} block>
                      Add Accessory
                    </Button>
                  </FormItem>
                </>
              )}
            </FormList>
          </FormItem>

          <FormItem label="Warranty" wrapperCol={{ span: 16 }}>
            <Space>
              <FormItem name={["warranty", "validUntil"]} label="Valid Until">
                <DatePicker style={{ width: "100%" }} />
              </FormItem>
              <FormItem name={["warranty", "type"]} label="Type">
                <Input />
              </FormItem>
            </Space>
          </FormItem>

          <FormItem
            label="Image URL"
            name="image"
            rules={[{ required: true, message: "Please enter the image URL!" }]}
          >
            <Input />
          </FormItem>

          <FormItem {...tailFormItemLayout}>
            <Button
              type="primary"
              name="submit"
              htmlType="submit"
              loading={loading}
            >
              {submitMessage}
            </Button>
          </FormItem>
        </Form>
      </div>
    </div>
  );
};

export default MobileForm;
