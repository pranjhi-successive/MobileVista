// import { Button, Form, Input } from "antd";
// import axios from "axios";
// import React from "react";

// const formItemLayout = {
//   labelCol: {
//     xs: { span: 24 },
//     sm: { span: 8 },
//   },
//   wrapperCol: {
//     xs: { span: 24 },
//     sm: { span: 16 },
//   },
// };

// const tailFormItemLayout = {
//   wrapperCol: {
//     xs: {
//       span: 24,
//       offset: 0,
//     },
//     sm: {
//       span: 16,
//       offset: 8,
//     },
//   },
// };

// const Login = () => {
//   const [form] = Form.useForm();

//   const onFinish = async (values) => {
//     console.log("Received values of form: ", values);

//     const options = {
//       method: "POST",
//       url: "http://localhost:4000/user/login",
//       data: values,
//     };

//     try {
//       const response = await axios.request(options);
//       console.log("Result = ", response);
//     } catch (error) {
//       console.log("error =", error);
//     }
//   };

//   return (
//     <div
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
// >
//       <Form
//         {...formItemLayout}
//         form={form}
//         name="register"
//         onFinish={onFinish}
//         style={{ maxWidth: 600 }}
//         scrollToFirstError
//       >
//         <Form.Item
//           name="email"
//           label="E-mail"
//           rules={[
//             {
//               type: "email",
//               message: "The input is not valid E-mail!",
//             },
//             {
//               required: true,
//               message: "Please input your E-mail!",
//             },
//           ]}
//           hasFeedback
//         >
//           <Input />
//         </Form.Item>

//         <Form.Item
//           name="password"
//           label="Password"
//           rules={[
//             {
//               required: true,
//               message: "Please input your password!",
//             },
//           ]}
//         >
//           <Input.Password />
//         </Form.Item>

//         <Form.Item {...tailFormItemLayout}>
//           <Button type="primary" htmlType="submit">
//             Login
//           </Button>
//         </Form.Item>
//       </Form>
//     </div>
//   );
// };

// export default Login;
// import { LockOutlined, MailOutlined } from "@ant-design/icons";
// import { Button, Form, Grid, Input, Typography, message, theme } from "antd";
// import axios from "axios";
// import React from "react";
// import FormHeader from "./header";
// import { getFormStyle } from "./styles";
// import { useNavigate } from "react-router-dom";

// const { useToken } = theme;
// const { useBreakpoint } = Grid;
// const { Text, Link } = Typography;

// const Login = () => {
//   const { token } = useToken();
//   const screens = useBreakpoint();
//   const styles = getFormStyle(screens, token);

//   const navigate = useNavigate();
//   const [messageApi, contextHolder] = message.useMessage();

//   const displayMessage = (messageType, data) => {
//     messageApi.open({
//       type: messageType,
//       content: data?.message,
//     });
//   };

//   const onFinish = async (values) => {
//     console.log("Received values of form: ", values);

//     const options = {
//       method: "POST",
//       url: "http://localhost:8080/users/login",
//       data: values,
//     };

//     try {
//       const response = await axios.request(options);
//       displayMessage("success", response?.data);

//       navigate("/dashboard");
//     } catch (error) {
//       displayMessage("error", error.response?.data);
//     }
//   };

//   return (
//     <>
//       {contextHolder}
//       <section style={styles.section}>
//         <div style={styles.container}>
//           <FormHeader
//             styles={styles}
//             headerTitle="Sign in"
//             headerText="Welcome back to JobNest UI! Please enter your details below to sign
//             in."
//           />
//           <Form
//             name="login"
//             onFinish={onFinish}
//             layout="vertical"
//             requiredMark="optional"
//           >
//             <Form.Item
//               name="email"
//               label="Email"
//               rules={[
//                 {
//                   type: "email",
//                   required: true,
//                   message: "Please input your Email!",
//                 },
//               ]}
//             >
//               <Input prefix={<MailOutlined />} placeholder="Email" />
//             </Form.Item>
//             <Form.Item
//               name="password"
//               label="Password"
//               rules={[
//                 {
//                   required: true,
//                   message: "Please input your Password!",
//                 },
//               ]}
//             >
//               <Input.Password
//                 prefix={<LockOutlined />}
//                 type="password"
//                 placeholder="Password"
//               />
//             </Form.Item>

//             <Form.Item style={{ marginBottom: "0px" }}>
//               <Button block="true" type="primary" htmlType="submit">
//                 Log in
//               </Button>
//               <div style={styles.footer}>
//                 <Text style={styles.text}>Don't have an account?</Text>{" "}
//                 <Link href="/register">Sign up now</Link>
//               </div>
//             </Form.Item>
//           </Form>
//         </div>
//       </section>
//     </>
//   );
// };

// export default Login;
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Grid, Input, Typography, message, theme } from "antd";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
import FormHeader from "./Header";
import { getFormStyle } from "./Styles";

const { useToken } = theme;
const { useBreakpoint } = Grid;
const { Text, Link } = Typography;

const Login = () => {
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
              name="email"
              label="Email"
              rules={[
                {
                  type: "email",
                  required: true,
                  message: "Please input your Email!",
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