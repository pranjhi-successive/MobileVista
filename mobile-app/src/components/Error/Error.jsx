import React from "react";
import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div style={styles.container}>
      <Result
        status="404"
        title="404 Not Found"
        subTitle="Oops! It looks like the page you are looking for does not exist."
        extra={
          <div style={styles.extraContent}>
            <p style={styles.description}>
              You can go back to the <Link to="/">homepage</Link> or try
              searching.
            </p>
            <Button type="primary" size="large">
              <Link to="/">Back to Homepage</Link>
            </Button>
          </div>
        }
      />
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f5f5f5",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  extraContent: {
    textAlign: "center",
    marginTop: "24px",
  },
  description: {
    fontSize: "1.2em",
    marginBottom: "16px",
  },
};

export default ErrorPage;
