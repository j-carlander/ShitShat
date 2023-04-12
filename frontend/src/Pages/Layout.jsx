import React from "react";
import { Outlet } from 'react-router-dom';
import PageHeader from "../Components/PageHeader/PageHeader";
import PageFooter from "../Components/PageFooter/PageFooter";


export default function Layout() {
  return (
    <>
      <PageHeader />
      <Outlet />
      <PageFooter />
    </>
  )
}