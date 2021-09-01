import React from "react";
import "../../../MainHelper.css";
import classes from "../css/NavigationBar.module.css";
import { NavLink } from "react-router-dom";
import Logo from "../../../logo.png";
export default function NavigationBar() {
  return (
    <div className={`container ${classes.navBar}`}>
      <div className={`col-4 ${classes.linkRoot}`}>
        <div className={classes.mainLink}>
          <NavLink className={`${classes.myLink} ${classes.firstLink}`} to="/">
            <img alt = 'logo' className={classes.logo} src={Logo} />
          </NavLink>
        </div>
      </div>

      <div className = 'col-4'/>

      <div className={`col-2 ${classes.linkRoot}`}>
        <div className={classes.mainLink}>
          <NavLink className={classes.myLink} to="/leagues">
            <p>Leagues</p>
          </NavLink>
        </div>
      </div>

      <div className={`col-2 ${classes.linkRoot}`}>
        <div className={classes.mainLink}>
          <NavLink className={classes.myLink} to="/aboutapp">
            <p>About App</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
