import React, { useState } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Dropdown, Space, Avatar } from "antd";
import usFlag from "../../../assets/Image/FlagoftheUnitedStates.png";
import vnFlag from "../../../assets/Image/FlagofVietnam.png";
import { useTranslation } from 'react-i18next';

const Language = () => {
  const { t, i18n } = useTranslation();
  const [currentLanguage, setCurrentLanguage] = useState("en");

  const handleTransClick = (language) => () => {
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  const items = [
    {
      label: (
        <Space onClick={handleTransClick('en')}>
          <Avatar src={<img src={usFlag} alt="avatar" />} />
          <div>{t("main.English")} (US)</div>
        </Space>
      ),
      key: "0",
    },
    {
      label: (
        <Space onClick={handleTransClick('vi')}>
          <Avatar src={<img src={vnFlag} alt="avatar" />} />
          <div>{t("main.Vietnamese")}</div>
        </Space>
      ),
      key: "1",
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      <a onClick={(e) => e.preventDefault()}>
        <Space>
          <Avatar size={20} icon={<img src={currentLanguage === 'en' ? usFlag : vnFlag} alt="avatar" />} />
          <div style={{ fontSize: "1rem", color: "#5D5FEF" }}></div>
          <DownOutlined style={{ fontSize: 10 }} />
        </Space>
      </a>
    </Dropdown>
  );
};

export default Language;
