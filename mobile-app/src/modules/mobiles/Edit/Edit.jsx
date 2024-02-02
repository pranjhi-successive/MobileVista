import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorPage } from "../../../components/Error";
import MobileForm from "../Uploads/Create";

const Edit = () => {
  const { id } = useParams();
  console.log("id:", id);

  const [mobile, setMobile] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/${id}`);
        const mobileData = response.data.data;
        delete mobileData.releaseDate;
        delete mobileData.warranty.validUntil;
        setMobile(mobileData);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [id]);
  if (!mobile) {
    return <ErrorPage />;
  }
  return (
    <>
      {/* <pre>{JSON.stringify(mobile, null, 2)}</pre> */}
      <MobileForm
        submitMessage="Update Mobile"
        formHeading="Edit Mobile Data"
        mobile={mobile}
        method="PUT"
        url={`http://localhost:4000/api/mobile/${id}`}
        message1="Mobile Updated Successfully"
      />
    </>
  );
};
export default Edit;
