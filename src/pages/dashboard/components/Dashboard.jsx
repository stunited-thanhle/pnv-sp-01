import { Card, Col, Row, Select, Space, Spin } from "antd";
import React, { useState } from "react";
import {CheckCircleOutlined, ProjectOutlined, UserOutlined,} from "@ant-design/icons";
import "./Dashboard.css";
import ReactApexChart from "react-apexcharts";
import {useGetEmployeeTotal} from "../../../hooks/useEmployee.jsx";
import {useGetProjectTotal} from "../../../hooks/useProject.jsx";
import {useTranslation} from "react-i18next";


const { Option } = Select;
const Dashboard = () => {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState("year");
  const handleYearChange = (value) => {
    setSelectedYear(value);
  };

  const { data: employeeTotal } = useGetEmployeeTotal({
    period: selectedYear,
  });
  const { data: projectTotal } = useGetProjectTotal({
    period: selectedYear,
  });

  const { data: employeeCountJoin } = useGetEmployeeTotal({
    period: "count_join",
  });

  const { data: projectCountJoin } = useGetProjectTotal({
    period: "count_join",
  });

  const formattedEmployeeData = employeeCountJoin
      ? Object.values(employeeCountJoin)
      : [];
  const formattedProjectData = projectCountJoin
      ? Object.values(projectCountJoin)
      : [];

  const dates = Object.keys(projectCountJoin || {});
  console.log(employeeTotal,'s')
  console.log(projectTotal,'q')


  const formattedDates = dates.map((date) => {
    const formattedDate = new Date(date);
    const year = formattedDate.getFullYear();
    const month = (formattedDate.getMonth() + 1).toString().padStart(2, '0');
    return `${year}-${month}`;
  });

  const areaChartState = {
    series: [
      {
        name: t('main.PROJECT'),
        data: formattedProjectData,
      },
      {
        name: t('main.EMPLOYEE'),
        data: formattedEmployeeData,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "area",
        toolbar: {
          show: false,
        },
        zoom: {
          enabled: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "datetime",
        categories: formattedDates,
      },
      tooltip: {
        x: {
          format: "yyyy-MM",
        },
      },
      title: {
        text: t('main.OVERVIEW'),
        align: "center",
      },
    },
  };

  const circleChartState = {
    series: [
      (projectTotal && projectTotal.donePercentage)
          ? Math.round(projectTotal.donePercentage)
          : 0,
      (projectTotal && projectTotal.onProgressPercentage)
          ? Math.round(projectTotal.onProgressPercentage)
          : 0,
      (projectTotal && projectTotal.pendingPercentage)
          ? Math.round(projectTotal.pendingPercentage)
          : 0,
    ],
    options: {
      chart: {
        height: 250,
        type: "donut",
      },
      plotOptions: {
        pie: {
          offsetX: 0,
          offsetY: 0,
          customScale: 1,
          dataLabels: {
            offset: 0,
            minAngleToShowLabel: 10,
          },
          donut: {
            size: "70%",
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "22px",
                fontFamily: undefined,
                fontWeight: 600,
                color: undefined,
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "16px",
                fontFamily: undefined,
                fontWeight: 400,
                color: undefined,
                offsetY: 16,
                formatter: function (val) {
                  return val;
                },
              },
              total: {
                show: true,
                label: t('main.TOTAL'),
                formatter: function () {
                  return projectTotal ? projectTotal.total : 0;
                },
              },
            },
          },
        },
      },
      labels: [t('main.Done'), t('main.Onprogress'), t('main.Pending')],
      title: {
        text: t('main.PROJECT'),
        align: "center",
      },

    },
  };


  return (
      <>
        {projectTotal ? (
            <div style={{ marginLeft: 20 }}>
              <Row justify="end">
                <Select
                    defaultValue={selectedYear}
                    onChange={handleYearChange}
                    style={{ width: 120, marginRight: 10, marginBottom: 10 }}
                >
                  <Option value="year"> {t("main.YEAR")}</Option>
                  <Option value="month"> {t("main.MONTH")}</Option>
                </Select>
              </Row>

              <Row gutter={10} style={{ marginBottom: 20 }} className="tablet-layout">
                <Col span={8} className="chart-items">
                  <Space direction="horizontal">
                    <Card
                        style={{
                          width: 370,
                          background: "#add8e6",
                          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                        }}
                    >
                      <div className="chart-card">
                        <ProjectOutlined
                            style={{
                              color: "#37a171",
                              fontSize: 30,
                              background: "#dbf6e5",
                              padding: 20,
                              borderRadius: 50,
                            }}
                        />
                        <div className="card-infor">
                          <h1>{projectTotal?.total}</h1>
                          <strong style={{ color: "#383838" }}>
                            {t("main.PROJECT")}
                          </strong>
                        </div>
                      </div>
                    </Card>
                  </Space>
                </Col>

                <Col span={8} className="chart-items">
                  <Space direction="horizontal">
                    <Card
                        style={{
                          width: 370,
                          background: "#EB984E",
                          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                        }}
                    >
                      <div className="chart-card">
                        <UserOutlined
                            style={{
                              color: "#37a171",
                              fontSize: 30,
                              background: "#dbf6e5",
                              padding: 20,
                              borderRadius: 50,
                            }}
                        />
                        <div className="card-infor">
                          <h1>{employeeTotal?.total}</h1>
                          <strong style={{ color: "#383838" }}>
                            {t("main.EMPLOYEE")}
                          </strong>
                        </div>

                      </div>
                    </Card>
                  </Space>
                </Col>

                <Col span={8} className="chart-items">
                  <Space direction="horizontal">
                    <Card
                        style={{
                          width: 370,
                          background: "#E6B0AA",
                          boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
                        }}
                    >
                      <div className="chart-card">
                        <CheckCircleOutlined
                            style={{
                              color: "#37a171",
                              fontSize: 30,
                              background: "#dbf6e5",
                              padding: 20,
                              borderRadius: 50,
                            }}
                        />
                        <div className="card-infor">
                          <h1>{projectTotal?.currentDoneCount}</h1>
                          <strong style={{ color: "#383838" }}>
                            {t("main.DONE PROJECT")}
                          </strong>
                        </div>
                      </div>
                    </Card>
                  </Space>
                </Col>
              </Row>

              <Row gutter={10} className="tablet-layout">
                <Col span={8}>
                  <div id="circleChart">
                    <ReactApexChart
                        options={circleChartState.options}
                        series={circleChartState.series}
                        type="donut"
                        height={400}
                    />
                  </div>
                </Col>

                <Col span={16}>
                  <div id="chartArea">
                    <ReactApexChart
                        options={areaChartState.options}
                        series={areaChartState.series}
                        type="area"
                        height={350}
                    />
                  </div>
                </Col>
              </Row>
            </div>
        ) : (
            <Spin
                size="large"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                }}
            />
        )}
      </>
  );
};

export default Dashboard;
