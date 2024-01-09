import { Typography } from "antd";

const { Text, Title } = Typography;

const FormHeader = (props) => {
  const { styles, headerTitle, headerText } = props;

  return (
    <div style={styles.header}>
      <svg
        width="25"
        height="24"
        viewBox="0 0 25 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="0.464294" width="24" height="24" rx="4.8" fill="#1890FF" />
        <path d="M14.8643 3.6001H20.8643V9.6001H14.8643V3.6001Z" fill="white" />
        <path
          d="M10.0643 9.6001H14.8643V14.4001H10.0643V9.6001Z"
          fill="white"
        />
        <path
          d="M4.06427 13.2001H11.2643V20.4001H4.06427V13.2001Z"
          fill="white"
        />
      </svg>
      <Title style={styles.title}>{headerTitle}</Title>
      <Text style={styles.text}>{headerText}</Text>
    </div>
  );
};

export default FormHeader;
