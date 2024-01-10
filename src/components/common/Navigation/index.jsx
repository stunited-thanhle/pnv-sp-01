import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu, Modal, Typography } from "antd";
import menuItem from "../Menu";
import userImage from "../../../../public/logocms.png";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuth } from "../../auth/AuthContext";
import { useTranslation } from 'react-i18next';

const { Title } = Typography;
const { Sider } = Layout;

function Navigation() {
  const [collapsed, setCollapsed] = useState(false);
  const [isShow, setIsShow] = useState(false);
  const { isLogin, setIsLogin } = useAuth();
  const { t, i18n } = useTranslation();


  const showLogoutModal = () => {
    setIsShow(true)
  }
  const handleCancel = () => {
    setIsShow(false);
  };

  const handleOk = () => {
    localStorage.removeItem("user");
    setIsLogin(false);
  };

  return (
    <Sider
      style={{ background: "#ffffff" }}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="demo-logo-vertical">
        <img
          src={userImage}
          alt="User"
          style={{
            width: "auto", // Đặt kích thước tùy ý
            height: "50px", // Đặt kích thước tùy ý
            borderRadius: "50%", // Để bo góc và tạo hình tròn nếu muốn
          }}
        />

        <Title
          level={5}
          className={collapsed ? "hidden-title" : ""}
          style={{ fontWeight: "700", fontSize: "15px" }}
        >
          THE NINEAM
        </Title>
      </div>
      <Menu
        defaultSelectedKeys={["1"]}
        mode="inline"
        inlineCollapsed={collapsed}
        style={{ fontSize: "15px" }}
      >
        {menuItem.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            <Link to={item.key}>{t("main." + item.label)}</Link>
          </Menu.Item>
        ))}

        <Menu.Item
          key={'Log out'}
          icon={<LogoutOutlined />}
          onClick={showLogoutModal}>
          {t("main.Log out")}
        </Menu.Item>

        <Modal
          title={t("main.Are you sure you want to log out?")}
          open={isShow}
          onOk={handleOk}
          onCancel={handleCancel}
        />

      </Menu>
    </Sider>
  );
}

export default Navigation;
