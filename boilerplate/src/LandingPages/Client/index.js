import React from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";

import PeopleIcon from "../icons/People.png";
import SessionIcon from "../icons/Session.png";
import ProfileIcon from "../icons/Profile.png";
import MoneyIcon from "../icons/Money.png";
import CalendarIcon from "../icons/Calendar.png";
import HeartIcon from "../icons/Together.png";
import AdminIcon from "../icons/admin.png";
import background from "../../Shared/Images/hands.jpg";

import styles from "./styles.scss";
import shared from "../../Shared/styles.scss";

import Header from "./Header";
import Footer from "../../Footer";

import Fetch from "../../App/api/Fetch";
import { getTherapists } from "../../Therapists/actions";

const imageStyle = {
  backgroundImage: `url(${background})`,
  position: "absolute",
  height: "100vh",
  width: "100vw",
  backgroundSize: "cover",
  backgroundPosition: "right 35% top 0%",
  zIndex: "-1"
};

const TherapistBanner = () => (
  <div className={shared.Banner}>
    <h2>Are you a therapist?</h2>
    <Link to={"/become-a-therapist"}>Apply to be on our platform</Link>
  </div>
);

const OtherBanner = () => (
  <div className={shared.Banner}>
    <h2>Tired of long waiting&nbsp;lists?</h2>
    <Link to={"/therapists"}>Get started with Helpfound</Link>
  </div>
);

const WhyJoin = () => (
  <div className={styles.WhyJoin}>
    <h2>Why choose Helpfound?</h2>
    <div>
      <img src={CalendarIcon} alt={"icon of calendar"} />
      <p>Times that suit you</p>
    </div>
    <div>
      <img src={AdminIcon} alt={"icon of clipboard"} />
      <p>Find someone quickly</p>
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
      <img src={SessionIcon} alt={"icon of a user profile"} />
      <p>Find a therapist</p>
    </div>
    <div>
      <img src={CalendarIcon} alt={"icon of people on chairs"} />
      <p>Book a 15 minute phone&nbsp;call</p>
    </div>
    <div>
      <img src={ProfileIcon} alt={"icon of money in a circle of arrows"} />
      <p>Register for an account</p>
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

export const ClientLandingPage = () => (
  <Fetch actions={[getTherapists]}>
    <div className={styles.LandingPage}>
      <div style={imageStyle} />
      <Header />
      <div className={styles.ImageOverlay}>
        <h1>Get the help you need, today</h1>
        <Link to={"/therapists"} className={shared.Button}>
          Find someone to help
        </Link>
      </div>
      <div className={styles.Tagline}>
        <h2>
          Helpfound offers private, affordable therapy when you need it from
          experienced, qualified and registered professionals.
        </h2>
      </div>
      <TherapistBanner />
      <WhyJoin />
      <HowItWorks />
      <OtherBanner />
      <div className={styles.ButtonContainer}>
        <Link to={"/therapists"} className={shared.Button}>
          Apply to join today
        </Link>
      </div>
      <Footer />
    </div>
  </Fetch>
);

export default ClientLandingPage;
