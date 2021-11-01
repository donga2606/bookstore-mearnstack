import React, { FC } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useRouter } from "next/dist/client/router";
import HeadLayout from "./HeadLayout";
import Toast from "./Toast";
const Layout: FC = ({ children }) => {
  const router = useRouter();
  const showHeaderAndFooter = ["/login", "/signup"].includes(router.pathname)
    ? false
    : true;
  return (
    <>
      <HeadLayout />
      {showHeaderAndFooter ? (
        <>
          <Header />
          <Toast />
          {children}
          <Footer />
        </>
      ) : (
        <>
          <Toast />
          {children}
        </>
      )}
    </>
  );
};
export default Layout;
