import { Typography, message } from "antd";

import axios from "axios";
import React, { useContext } from "react";
import "./Register.css";
import { Link, Navigate } from "react-router-dom";
import { AuthenticationContext } from "../Authentication/Context";
import { Button, Form, Input, Select } from "../../../../components";
import {
  LockTwoTone,
  MailTwoTone,
  MobileTwoTone,
  PushpinTwoTone,
  ScheduleTwoTone,
  SmileTwoTone,
} from "../../../../components/Icons";

const { Option } = Select;
const { Text } = Typography;

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
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

const Register = () => {
  const [form] = Form.useForm();
  const { isAuthenticated } = useContext(AuthenticationContext);

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    const options = {
      method: "POST",
      url: "http://localhost:4000/auth/signup",
      data: values,
    };

    delete options.data.confirm;
    delete options.data.prefix;

    try {
      const response = await axios.request(options);
      console.log("Result = ", response);
      message.success("Registration successful! You can now log in.");
    } catch (error) {
      message.error(error.response.data.message);
      console.log("error =", error);
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select defaultValue="91" style={{ width: 70 }}>
        <Option value="91">+91</Option>
        <Option value="86">+86</Option>
      </Select>
    </Form.Item>
  );

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <div className="wrapper">
      <div className="register-form-container">
        <Form
          {...formItemLayout}
          aria-label="register form"
          form={form}
          name="register"
          onFinish={onFinish}
          className="register-form"
          style={{ maxWidth: 600 }}
          scrollToFirstError
        >
          <div className="input-box">
            <header>Sign up</header>
            <Form.Item
              name="name"
              label="Name"
              rules={[
                {
                  type: "text",
                  required: true,
                  message: "Please input your Name!",
                },
              ]}
              hasFeedback
            >
              <Input prefix={<SmileTwoTone />} placeholder="Name" />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-mail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}
            >
              <Input prefix={<MailTwoTone />} placeholder="Email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback
            >
              <Input.Password prefix={<LockTwoTone />} placeholder="Password" />
            </Form.Item>

            <Form.Item
              name="confirm"
              label="Confirm Password"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Please confirm your password!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The new password that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockTwoTone />}
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                prefix={<MobileTwoTone />}
                addonBefore={prefixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item>

            <Form.Item
              name={["address", "street"]}
              label="Street"
              rules={[{ required: true, message: "Please input your street!" }]}
            >
              <Input prefix={<PushpinTwoTone />} />
            </Form.Item>

            <Form.Item
              name={["address", "city"]}
              label="City"
              rules={[{ required: true, message: "Please input your city!" }]}
            >
              <Input prefix={<ScheduleTwoTone />} />
            </Form.Item>

            <Form.Item
              name={["address", "state"]}
              label="State"
              rules={[{ required: true, message: "Please input your state!" }]}
            >
              <Input prefix={<ScheduleTwoTone />} />
            </Form.Item>

            <Form.Item {...tailFormItemLayout}>
              <Button
                type="primary"
                name="register"
                htmlType="submit"
                className="btn"
                block="true"
                style={{ marginRight: "15px" }}
                aria-label="register"
              >
                Register
              </Button>
              <div>
                <Text>Already have an account?</Text>{" "}
                <Link to="/login">Go to Login</Link>
              </div>
              <div>
                <Text>Go Back To DashBoard</Text> <Link to="/">DashBoard</Link>
              </div>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Register;
