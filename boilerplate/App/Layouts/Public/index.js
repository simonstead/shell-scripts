import React from "react";
import Header from "../../../LandingPages/Client/Header";
import Footer from "../../../Footer";
import shared from "../../../Shared/styles.scss";
import Errors from "../../../Errors";

const style = backgroundImage =>
  backgroundImage
    ? {
        backgroundImage: `url(${backgroundImage})`,
        position: "fixed",
        height: "100vh",
        width: "100vw",
        backgroundSize: "cover",
        backgroundPosition: "right 35% top 0%",
        zIndex: "-1"
      }
    : {};

export const Layout = ({ children, backgroundImage, theme }) => (
  <div>
    <div style={style(backgroundImage, theme)} />
    <Header theme={theme} />
    <Errors />
    <div>{children}</div>
    <Footer theme={theme} />
  </div>
);

export const WrappedLayout = ({ children, backgroundImage, theme }) => (
  <Layout backgroundImage={backgroundImage} theme={theme}>
    <div className={shared.Wrapper}>
      <div>{children}</div>
    </div>
  </Layout>
);

export default WrappedLayout;
