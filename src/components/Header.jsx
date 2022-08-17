import { Link } from "react-router-dom";
import Button from "./Button";

import "./Header.css";

const Header = ({ logout }) => {
  const logoutHandler = () => {
    logout();
  };
  return (
    <div className="header">
      <Link to="/dashboard" className="header__title">
        <h2 className="header__title--title">Expensify</h2>
      </Link>
      <div className="header__actions">
        <Button
          inverse
          big
          className="header__actions--logout"
          onClick={logoutHandler}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Header;
