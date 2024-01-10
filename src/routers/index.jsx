import React from 'react';
import Dashboard  from '../pages/dashboard/components/Dashboard';
import ListProject from '../pages/project/ListProject';
import EmployeeDetail from "../pages/employee/components/EmployeeDetail.jsx";
import ShowEmployees from "../pages/employee/EmployeeManagement.jsx";
import { ResetPwd } from '../components/auth/reset-password/index.jsx';
import { ProjectDetail } from '../pages/project/components/ProjectDetail.jsx';
import AddProject from '../pages/project/components/AddProject.jsx';
import CreateEmployee from "../pages/employee/components/AddEmployee.jsx";
import { useTranslation } from 'react-i18next';

const AppRoutes = () => {
    const { t, i18n } = useTranslation();

    return [
        { path: "/", element: <Dashboard />, title: t("main.Dashboard") },
        { path: "/listproject", element: <ListProject />, title: t("main.List Project") },
        {
            path: "/project/:id",
            element: <ProjectDetail />,
            title: t("main.Edit Project")
        },
        {
            path: "/listemployee",
            element: <ShowEmployees />,
            errorElement: <div>{t("main.Not found")}</div>,
            title: t("main.List Employee"),
        },
        {
            path: "/employee/:id",
            element: <EmployeeDetail />,
            title: t("main.Edit Employee")
        },
        {
            path: "/addProject",
            element: <AddProject />,
            title: t("main.Edit Employee")
        },
        {
            path: "/login",
            // element: <Login />,
        },
        {
            path: "/addEmployee",
            element: <CreateEmployee />,
            title: t("main.Create Employee")
        },
        {
            path: "/resetPwd",
            element: <ResetPwd />,
            title: t('main.Reset Password')
        },
    ];
};

export default AppRoutes;
