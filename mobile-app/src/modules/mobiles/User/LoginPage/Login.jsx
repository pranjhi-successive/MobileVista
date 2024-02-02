import { Typography, message } from "antd";
import axios from "axios";
import React, { useContext, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import "./Login.css";
import { DashboardContext } from "../../../Dashboard/DashContext";
import { AuthenticationContext } from "../Authentication/Context";
import { Button, Form, Input } from "../../../../components";
import { LockOutlined, MailOutlined } from "../../../../components/Icons";
const { Text, Link } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const { isAuthenticated } = useContext(AuthenticationContext);

  const { setDashboardSelectedItem } = useContext(DashboardContext);

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
      localStorage.setItem("token", response.data.token);
      console.log(response.data.token);

      displayMessage("success", { message: "Login Successful" });
      setDashboardSelectedItem("Mobiles");
      window.location.reload();
      navigate("/dashboard");
    } catch (error) {
      displayMessage("error", { message: "Invalid credentials" });
    }
  };

  useEffect(() => {
    setDashboardSelectedItem("Mobiles");
  }, []);
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <>
      {contextHolder}
      <section className="bg-img">
        <div className="content">
          <header>Sign in</header>
          <Form
            name="login"
            aria-label="login form"
            onFinish={onFinish}
            layout="vertical"
            requiredMark="optional"
          >
            <Form.Item
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
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
              <div>
                <Text>Don't have an account?</Text>{" "}
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
