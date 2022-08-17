import loader from "../images/loader.gif";

import "./Loader.css";
const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__loader">
        <img src={loader} alt="Loading..." className="loader__loader--img" />
      </div>
    </div>
  );
};

export default Loader;
