import { Button, DatePicker, Form, Input, message } from "antd";
import React, { useState } from "react";

const Profile = () => {
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleSaveClick = () => {
    form
      .validateFields()
      .then((values) => {
        const hasValues = Object.values(values).some((value) => !!value);

        if (hasValues) {
          setIsEditMode(false);

          message.success("Changes saved successfully");
        } else {
          message.warning("Please provide at least one value before saving.");
        }
      })
      .catch((errorInfo) => {
        console.error("Validation failed:", errorInfo);
      });
  };

  const handleCancelClick = () => {
    form.resetFields();
    setIsEditMode(false);
  };

  return (
    <Form form={form} style={{ maxWidth: "400px", margin: "0 auto" }}>
      <Form.Item
        label="name"
        name="name"
        rules={[{ required: true, message: "Please input your username!" }]}
        style={{ marginBottom: "10px" }}
      >
        <Input disabled={!isEditMode} />
      </Form.Item>

      <Form.Item name="email" label="E-mail" style={{ marginBottom: "10px" }}>
        <Input disabled={!isEditMode} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: "Please input your password!" }]}
        style={{ marginBottom: "10px" }}
      >
        <Input.Password disabled={!isEditMode} />
      </Form.Item>

      {isEditMode ? (
        <>
          <Button
            type="primary"
            onClick={handleSaveClick}
            style={{ marginRight: "10px" }}
          >
            Save
          </Button>
          <Button onClick={handleCancelClick}>Cancel</Button>
        </>
      ) : (
        <Button onClick={handleEditClick}>Edit</Button>
      )}
    </Form>
  );
};

export default Profile;
