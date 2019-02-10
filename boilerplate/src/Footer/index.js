import React from "react";
import styles from "./styles.scss";
import { Link } from "react-router-dom";

export const Footer = ({ theme }) => (
  <div className={theme === "dark" ? styles.DarkFooter : styles.Footer}>
    <Link to={"/about-us"}>About us</Link>
    <Link to={"/therapists"}>Find a therapist</Link>
    <Link to={"/contact"}>Contact us</Link>
    <Link to={"/how-we-use-your-data"}>How we use your data</Link>
    <Link to={"/privacy"}>Privacy policy</Link>
    <Link to={"/become-a-therapist"}>For therapists</Link>
  </div>
);

export default Footer;
