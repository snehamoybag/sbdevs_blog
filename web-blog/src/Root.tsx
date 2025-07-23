import type { ReactElement } from "react";
import { Outlet } from "react-router";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function Root(): ReactElement {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}
