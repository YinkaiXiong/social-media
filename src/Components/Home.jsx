import { useContext, useEffect } from "react";
import axios from "axios";
import LeftSide from "./body/LeftSide";
import CenterSide from "./body/CenterSide";
import RightSide from "./body/RightSide";
import { useNavigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

const Home = () => {
  const { addCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  //Check if the user is logged in, if not send to Log in page
  useEffect(() => {
    (async function fetchData() {
      const response = await axios.get("/isAuth");
      if (response) {
        if (response.data === null) {
          navigate("/LogIn", { replace: true });
        } else {
          // setCurrentUser(response.data);
          addCurrentUser(response.data);
        }
      }
    })();
  }, []);
  return (
    <div className="bodyContainer">
      <LeftSide />
      <CenterSide />
      <RightSide />
    </div>
  );
};

export default Home;
