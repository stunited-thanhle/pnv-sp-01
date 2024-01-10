import React from "react";
import Navigation from "../Navigation";
import HeaderContent from "../Header";
import { Layout, Breadcrumb, theme } from "antd";
import "../../../style/layoutDashboard.css";
import { useTranslation} from 'react-i18next';


const { Content, Footer } = Layout;

export const LayoutDashboard = ({ children, pageTitle }) => {
  const { t, i18n } = useTranslation();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Navigation />
      <Layout>
        <HeaderContent pageTitle={pageTitle} />
        <Content
          style={{
            margin: "0 16px",
            overflow: "auto",
          }}
        >
          <Breadcrumb
            style={{
              margin: "8px 0",
            }}
          ></Breadcrumb>
          <div
            style={{
              padding: 24,
              minHeight: 580,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              color: "#000000",
            }}
          >
            {children}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          THE NINEAM ©{new Date().getFullYear()} {t("main.Created by The Nineam")}
        </Footer>
      </Layout>
    </Layout>
  );
};
