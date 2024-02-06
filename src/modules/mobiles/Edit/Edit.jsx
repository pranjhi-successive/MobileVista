import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ErrorPage } from "../../../components/Error";
import MobileForm from "../Uploads/Create";
import apiInstance from "../../../service/services";
import { AuthenticationContext } from "../../User/Authentication/Context";

const Edit = () => {
  const { id } = useParams();
  console.log("id:", id);

  const [mobile, setMobile] = useState({});
  const { authData } = useContext(AuthenticationContext);

  console.log(process.env);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await apiInstance.get(`/api/${id}`);
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
        updatedBy={authData.userId}
      />
    </>
  );
};
export default Edit;
