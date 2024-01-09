import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Grid, Input, Typography, message, theme } from "antd";
import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "./Header";
import { getFormStyle } from "./Styles";
import { DashboardContext } from "../../Route";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Link } = Typography;

const Login = () => {
  const { dashboardSelectedItem, setDashboardSelectedItem } =
    useContext(DashboardContext);
  const { token } = useToken();
  const screens = useBreakpoint();
  const styles = getFormStyle(screens, token);

  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const displayMessage = (messageType, data) => {
    messageApi.open({
      type: messageType,
      content: data?.message,
    });
  };

  const onFinish = async (values) => {
    console.log("Received values of form: ", values);

    const options = {
      method: "POST",
      url: "http://localhost:4000/auth/login",
      data: values,
    };

    try {
      const response = await axios.request(options);
      displayMessage("success", response?.data);
      setDashboardSelectedItem("Home");
      navigate("/dashboard");
    } catch (error) {
      displayMessage("error", error.response?.data);
    }
  };

  return (
    <>
      {contextHolder}
      <section style={styles.section}>
        <div style={styles.container}>
          <FormHeader
            styles={styles}
            headerTitle="Sign in"
            headerText="Please enter your details below to sign
            in."
          />
          <Form
            name="login"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
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
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              label="Password"
              rules={[
                {
                  required: true,
                  message: "Please input your Password!",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: "0px" }}>
              <Button block="true" type="primary" htmlType="submit">
                Log in
              </Button>
              <div style={styles.footer}>
                <Text style={styles.text}>Don't have an account?</Text>{" "}
                <Link href="/register">Sign up now</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </section>
    </>
  );
};

export default Login;
