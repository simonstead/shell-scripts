import React from "react";
import Header from "../../../Account/Header";
import Footer from "../../../Footer";
import shared from "../../../Shared/styles.scss";
import Errors from "../../../Errors";

export const Layout = ({ children }) => (
  <div>
    <Header />
    <Errors />
    <div>{children}</div>
    <Footer />
  </div>
);

export const WrappedLayout = ({ children }) => (
  <Layout>
    <div className={shared.Wrapper}>
      <div>{children}</div>
    </div>
  </Layout>
);

export default Layout;
