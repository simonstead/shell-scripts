import React from "react";
import PeopleIcon from "../icons/People.png";
import SessionIcon from "../icons/Session.png";
import ProfileIcon from "../icons/Profile.png";
import MoneyIcon from "../icons/Money.png";
import CalendarIcon from "../icons/Calendar.png";
import HeartIcon from "../icons/Together.png";
import AdminIcon from "../icons/admin.png";
import background from "../icons/people.jpg";
import styles from "./styles.scss";
import shared from "../../Shared/styles.scss";
import classNames from "classnames";
import { Link } from "react-router-dom";

const imageStyle = {
  backgroundImage: `url(${background})`,
  position: "absolute",
  height: "100vh",
  width: "100vw",
  backgroundSize: "cover",
  backgroundPosition: "right 35% top 0%",
  zIndex: "-1"
};

const WhyJoin = () => (
  <div className={styles.WhyJoin}>
    <h2>Why join?</h2>
    <div>
      <img src={CalendarIcon} alt={"icon of calendar"} />
      <p>Availability that suits you</p>
    </div>
    <div>
      <img src={PeopleIcon} alt={"icon of people"} />
      <p>Find more clients</p>
    </div>
    <div>
      <img src={AdminIcon} alt={"icon of clipboard"} />
      <p>Less time spent on admin</p>
    </div>
    <div>
      <img src={HeartIcon} alt={"icon of heart shaped hand shake"} />
      <p>Supportive community</p>
    </div>
  </div>
);
const HowItWorks = () => (
  <div className={styles.HowItWorks}>
    <h2>How it works</h2>
    <div>
      <img src={ProfileIcon} alt={"icon of a user profile"} />
      <p>Submit your application</p>
    </div>
    <div>
      <img src={SessionIcon} alt={"icon of people on chairs"} />
      <p>Match with clients</p>
    </div>
    <div>
      <img src={MoneyIcon} alt={"icon of money in a circle of arrows"} />
      <p>Manage your practice</p>
    </div>
  </div>
);
const MinimumRequirements = () => (
  <div className={styles.MinimumRequirements}>
    <h2>Minimum requirements</h2>
    <div>
      <p className={shared.InfoSection}>
        To make our platform safe, effective and high quality, we make sure all
        our practitioners meet some minium quality standards
      </p>
      <ul>
        <li>
          Be recognised by professional bodies with accredited, chartered or
          registered status
        </li>
        <li>Have at least 1000 hours of clinical therapy experience</li>
        <li>Hold professional indemnity insurance</li>
        <li>Be a UK resident</li>
      </ul>
    </div>
  </div>
);

export const TherapistLandingPage = () => (
  <div className={styles.LandingPage}>
    <div style={imageStyle} />
    <div className={styles.ImageOverlay}>
      <h1>Helpfound</h1>
      <Link to={"/register/therapists"} className={shared.Button}>
        Apply to join today
      </Link>
    </div>
    <WhyJoin />
    <HowItWorks />
    <MinimumRequirements />
    <h2 className={classNames(styles.BottomHeader, shared.Banner)}>
      Ready to get started?
    </h2>
    <div className={styles.ButtonContainer}>
      <Link to={"/register/therapists"} className={shared.Button}>
        Apply to join today
      </Link>
    </div>
  </div>
);

export default TherapistLandingPage;
