import React from "react";
import Dashboard from "@/components/Dashboard";
import { GetServerSideProps, GetServerSidePropsContext } from "next";

const DashboardPage: React.FC = () => {
  return <Dashboard />;
};

export default DashboardPage;

export const getServerSideProps: GetServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { req } = context;
  const token = req.cookies.access_token || null;

  if (!token) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }


  return {
    props: {},
  };
};
