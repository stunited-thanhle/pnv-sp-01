import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import {
    Button, Col, DatePicker, Form, Input, InputNumber, Radio, Row, Select, Spin, Table, Upload, message,
} from "antd";
import { Image as CloudImage, CloudinaryContext } from "cloudinary-react";
import moment from "moment";
import { CloseCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Cloudinary } from "@cloudinary/url-gen";
import { Divider } from "antd";
import { useNavigate } from "react-router";
import {useCreateEmployee, useGetManager} from "../../../hooks/useEmployee.jsx";
const { useForm } = Form;
import { useTranslation} from 'react-i18next';


const CreateEmployee = () => {
    const [formCreate] = useForm();
    const [newName, setNewName] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newDob, setNewDob] = useState("");
    const [newIdentityCard, setNewIdentityCard] = useState("");
    const [newGender, setNewGender] = useState("");
    const [newPosition, setNewPosition] = useState("");
    const [newStatus, setNewStatus] = "active";
    const [newEmail, setNewEmail] = useState("");
    const [newJoinDate, setNewJoinDate] = useState("");
    const [newAvatar, setNewAvatar] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [newIsManager, setNewIsManager] = useState(false);
    const [newManager, setNewManager] = useState("");
    const [newSkills, setNewSkills] = useState([]);
    const [newSkill, setNewSkill] = useState("");
    const [newExperience, setNewExperience] = useState("");
    const [newLangFrames, setNewLangFrames] = useState([]);
    const [newLangFrame, setNewLangFrame] = useState("");
    const [newLangExperience, setNewLangExperience] = useState("");
    const [newTechs, setNewTechs] = useState([]);
    const [newTech, setNewTech] = useState("");
    const [newTechExperience, setNewTechExperience] = useState("");
    const { t, i18n } = useTranslation();



    const skills = [
        {
            title: t("main.Soft skill"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("main.Experience"),
            dataIndex: "exp",
            key: "exp",
        },
    ];

    const langFrames = [
        {
            title: t("main.LangFrame"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("main.Experience"),
            dataIndex: "exp",
            key: "exp",
        },
    ];

    const techs = [
        {
            title: t("main.Technology"),
            dataIndex: "name",
            key: "name",
        },
        {
            title: t("main.Experience"),
            dataIndex: "exp",
            key: "exp",
        },
    ];

    const [imageUrl, setImageUrl] = useState(
        "https://res.cloudinary.com/da9hiv52w/image/upload/v1704559896/xljfi1wpvhfabwihemgr.png",
    );
    const [loading, setLoading] = useState(false);
    const cld = new Cloudinary({ cloud: { cloudName: "dvm8fnczy" } });
    const navigate = useNavigate();
    const [confirmLoading, setConfirmLoading] = useState(false);
    const { data: managers } = useGetManager();
    const { mutate: createEmployee, isError, error } =useCreateEmployee();

    const addToSkills = () => {
        if (!newSkill || !newExperience) {
            message.error(t("main.Error skill"));
            return;
        }
        const existingSkill = newSkills.find((skill) => skill.name === newSkill);

        if (existingSkill) {
            message.error(t("main.Exist skill"));
            return;
        }
        const newEntry = {
            name: newSkill,
            exp: newExperience,
        };
        setNewSkills([...newSkills, { ...newEntry, key: newSkills.length + 1 }]);
        setNewSkill("");
        setNewExperience("");
    };
    const removeSkill = (key) => {
        const updatedSkills = newSkills.filter((skill) => skill.key !== key);
        setNewSkills(updatedSkills);
    };
    const addToLangFrame = () => {
        if (!newLangFrame || !newLangExperience) {
            message.error(t("main.Error Language"));
            return;
        }
        const existingLangFrame = newLangFrames.find(
            (langFrame) => langFrame.name === newLangFrame,
        );

        if (existingLangFrame) {
            message.error(t("main.Exist Language"));
            return;
        }
        const newLangEntry = {
            name: newLangFrame,
            exp: newLangExperience,
        };
        setNewLangFrames([
            ...newLangFrames,
            { ...newLangEntry, key: newLangFrame.length + 1 },
        ]);
        setNewLangFrame("");
        setNewLangExperience("");
    };
    const removeLangFrame = (key) => {
        const updatedLangFrames = newLangFrames.filter(
            (langFrame) => langFrame.key !== key,
        );
        setNewLangFrames(updatedLangFrames);
    };
    //Technology
    const addToTech = () => {
        if (!newTech || !newTechExperience) {
            message.error(t("main.Error Tech"));
            return;
        }
        const existingTech = newTechs.find((tech) => tech.name === newTech);

        if (existingTech) {
            message.error(t("main.Exist Technology"));
            return;
        }
        const newTechEntry = {
            name: newTech,
            exp: newTechExperience,
        };
        setNewTechs([...newTechs, { ...newTechEntry, key: newTech.length + 1 }]);
        setNewTech("");
        setNewTechExperience("");
    };
    
    const removeTech = (key) => {
        const updatedTechs = newTechs.filter((tech) => tech.key !== key);
        setNewTechs(updatedTechs);
    };
    const defaultImageUrl =
        "https://res.cloudinary.com/da9hiv52w/image/upload/v1704559896/xljfi1wpvhfabwihemgr.png";

    const handleChange = (info) => {
        if (info.file.status === t("main.uploading")) {
            setLoading(true);
            return;
        }
        if (info.file.status === t("main.done")) {
            setImageUrl(info.file.response.secure_url);
            setNewAvatar(info.file.response.secure_url);
            message.success(t(`main.uploaded successfully`));
            setLoading(false);
        } else {
            setImageUrl(defaultImageUrl);
            setNewAvatar(null);
            setLoading(false);
        }
    };

    const handleAdd = async () => {
        try {
            const formData = await formCreate.validateFields();
            formData.skills = newSkills;
            formData.langFrame = newLangFrames;
            formData.tech = newTechs;
            formData.avatar = imageUrl;
            // formData.code = newCode;
            setConfirmLoading(true);
            createEmployee({
                ...formData,
                code: generateRandomCode(),
            });
            Swal.fire({
                icon: 'success',
                title: t('main.Employee Created Successfully!'),
                showConfirmButton: false,
                timer: 1500, // Optional: You can customize the time the success message stays visible
            });
            navigate('/listemployee')
        } catch (error) {
            message.error(t("main.Error Employee"));
        }
    };

    useEffect(() => {
        formCreate.setFields([{ name: t("main.Email"), errors: [] }]);

        if (isError) {
            formCreate.setFields([
                {
                    name: t("main.Email"),
                    errors: [error.response.data.message],
                },
            ]);
        }
    }, [isError]);

    // const breadcrumbItems = [
    //     { key: "manageEmployees" },
    //     { key: "", title: "EMPLOYEE.CREATE"},
    // ];
    const generateRandomCode = () => {
        const randomNumber = Math.floor(100 + Math.random() * 900);
        return `ST${randomNumber}`;
    };

    return (
        <>
            {/*<Breadcrumb items={breadcrumbItems} />*/}
            <Form
                form={formCreate}
                name="createEmployee"
                layout="vertical"
                autoComplete="off"
                validateMessages={{
                    required: "Please input }!",
                    types: {
                        email: "${label} is not a valid email!",
                        number: "${label} is not a valid number!",
                    },
                }}
            >
                <Form.Item
                    valuePropName="avatar"
                    value={newAvatar}
                    onChange={(e) => setNewAvatar(e.target.value)}
                >

                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <CloudinaryContext cloudName="dvm8fnczy" cld={cld}>
                            <div style={{ marginTop: "10px" }}>
                                <Upload
                                    listType="picture-circle"
                                    maxCount={1}
                                    action={`https://api.cloudinary.com/v1_1/da9hiv52w/image/upload`}
                                    data={{ upload_preset: "ay2jrgsp" }}
                                    showUploadList={false}
                                    onChange={handleChange}
                                >
                                    <Spin spinning={loading} tip="Uploading...">
                                        {imageUrl ? (
                                            <div className="rounded-image-container">
                                                <CloudImage
                                                    publicId={imageUrl}
                                                    style={{
                                                        width: "100px",
                                                        paddingTop: "5px",
                                                        borderRadius: "100%",
                                                    }}
                                                />
                                            </div>
                                        ) : (
                                            <div>
                                                <PlusOutlined />
                                            </div>
                                        )}
                                    </Spin>
                                </Upload>
                            </div>
                        </CloudinaryContext>
                    </div>
                </Form.Item>
                <Row gutter={32} justify={"center"}>
                    <Col md={24} lg={8}>
                        <Form.Item
                            name="code"
                            label={t("main.Code")}
                            style={{ width: "100%" }}
                            required
                        >
                            <Input defaultValue={generateRandomCode()} disabled />
                        </Form.Item>

                        <Form.Item
                            name="name"
                            label={t("main.Name")}
                            style={{ width: "100%" }}
                            rules={[{ required: true, message: t("main.Name")}]}
                        >
                            <Input
                                value={newName}
                                onChange={(e) => setNewName(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="phone"
                            label={t("main.Phone")}
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    pattern: /^[0-9]{10}$/,
                                    message: t("main.Phone"),
                                },
                            ]}
                        >
                            <Input
                                value={newPhone}
                                onChange={(e) => setNewPhone(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="address"
                            label={t("main.Address")}
                            style={{ width: "100%" }}
                            rules={[{ required: true, message: t("main.Address")}]}
                        >
                            <Input
                                value={newAddress}
                                onChange={(e) => setNewAddress(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="status"
                            label={t("main.Status")}
                            style={{ width: "100%" }}
                            rules={[{ required: true, message: t("main.Status") }]}
                        >
                            <Select
                                value={newStatus}
                                onChange={(value) => setNewStatus(value)}
                            >
                                <Select.Option value="inactive">
                                    {t("main.Inative")}
                                </Select.Option>
                                <Select.Option value="active">{t("main.Active")}</Select.Option>
                            </Select>
                        </Form.Item>

                        <Form.Item
                            name="position"
                            label={t("main.Position")}
                            style={{ width: "100%" }}
                            rules={[{ required: true, message: t("main.Position")}]}
                        >
                            <Select
                                value={newPosition}
                                onChange={(value) => setNewPosition(value)}
                            >
                                <Select.Option value="fe">Front-end Dev</Select.Option>
                                <Select.Option value="be">Back-end Dev</Select.Option>
                                <Select.Option value="fullstack">FullStack</Select.Option>
                                <Select.Option value="ba">Business Analysis</Select.Option>
                                <Select.Option value="qa">Quality Assurance</Select.Option>
                                <Select.Option value="devops">DevOps Engineer</Select.Option>
                                <Select.Option value="ux_ui">User Experience</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="joinDate"
                            label={t("main.Join Date")}
                            rules={[{ required: true, message: t("main.Join Date") }]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                value={moment(newJoinDate)}
                                placeholder={t("main.Select Join Date")}
                                onChange={(e) => {
                                    setNewJoinDate(e ? e.format(t("main.DD/MM/YYYY")) : null);
                                }}
                                format={t("main.DD/MM/YYYY")}
                            />
                        </Form.Item>
                    </Col>
                    <Col md={24} lg={8}>
                        <Form.Item
                            name="email"
                            label={t("main.Email")}
                            style={{ width: "100%" }}
                            rules={[
                                { required: true, message: t("main.Email") },
                                {
                                    type: "email",
                                    message: t("main.Valid Email"),
                                },
                            ]}
                        >
                            <Input
                                value={newEmail}
                                onChange={(e) => setNewEmail(e.target.value)}
                            />
                        </Form.Item>
                        <Form.Item
                            name="dateOfBirth"
                            label={t("main.Date of birth")}
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    message: t("main.Date of birth"),
                                },
                            ]}
                        >
                            <DatePicker
                                style={{ width: "100%" }}
                                value={moment(newDob)}
                                placeholder={t("main.Select Date of birth")}
                                onChange={(date) => {
                                    setNewDob(date.format(t("main.DD/MM/YYYY")));
                                }}
                                format={t("main.DD/MM/YYYY")}
                                disabledDate={(current) => {
                                    return current && current > moment().endOf("day");
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            name="identityCard"
                            label={t("main.Identity")}
                            style={{ width: "100%" }}
                            rules={[
                                {
                                    required: true,
                                    pattern: /^[0-9]{9,12}$/,
                                    message: t("main.Identity"),
                                },
                            ]}
                        >
                            <Input
                                value={newIdentityCard}
                                onChange={(e) => setNewIdentityCard(e.target.value)}
                            />
                        </Form.Item>

                        <Form.Item
                            name="gender"
                            label={t("main.Gender")}
                            style={{ width: "100%" }}
                            rules={[{ required: true, message: t("main.Gender") }]}
                        >
                            <Select
                                value={newGender}
                                onChange={(value) => setNewGender(value)}
                            >
                                <Select.Option value="male">{t("main.Male")}</Select.Option>
                                <Select.Option value="female">{t("main.Female")}</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="isManager"
                            label={t("main.IsManager")}
                            style={{ width: "100%" }}
                            labelCol={{ span: 8 }}
                            rules={[
                                {
                                    required: true,
                                    message: t("main.IsManager"),
                                },
                            ]}
                        >
                            <Radio.Group
                                value={newIsManager}
                                onChange={(e) => setNewIsManager(e.target.value)}
                                style={{marginBottom: "0px"}}
                            >
                                <Radio value={true}>{t("main.True")}</Radio>
                                <Radio value={false}>{t("main.False")}</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item name="managerId" label={t("main.Manager")}>
                            <Select
                                value={newManager.id}
                                onChange={(value, option) =>
                                    setNewManager({ id: value, name: option.children })
                                }
                            >
                                {(managers || []).map((manager) => (
                                    <Select.Option key={manager.id} value={manager.id}>
                                        {manager.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="description"
                            label={t("main.Description")}
                            style={{ width: "100%" }}
                        >
                            <Input.TextArea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                            />
                        </Form.Item>
                    </Col>
                </Row>

                <Divider />
                <Row gutter={15} justify={"center"}>
                    <Col md={24} lg={8}>
                        <Form.Item
                            label={t("main.LangFrame")}
                            style={{ padding: 0, margin: 0 }}
                        >
                            <Select
                                value={newLangFrame}
                                onChange={(value) => setNewLangFrame(value)}
                                placeholder={t("main.Language")}
                            >
                                {[
                                    "HTML",
                                    "CSS",
                                    "JavaScript",
                                    "React",
                                    "Node.js",
                                    "Express",
                                    "NestJs",
                                    "Python",
                                    "C#",
                                    "C++",
                                    "Java",
                                    "Ruby",
                                    "PHP",
                                ].map((langFrame) => (
                                    <Select.Option key={langFrame} value={langFrame}>
                                        {langFrame}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={t("main.Experience")}
                            style={{ marginBottom: "8px" }}
                            rules={[
                                {
                                    required: true,
                                    message:t("main.Experience"),
                                },
                            ]}
                        >
                            <InputNumber
                                value={newLangExperience}
                                onChange={(value) => setNewLangExperience(value)}
                                style={{ width: "100%" }}
                                placeholder={t("main.Experience")}
                                min={1}
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={ addToLangFrame}
                        >
                        </Button>
                    </Col>
                    <Col md={24} lg={8}>
                        <Form.Item name="langFrames">
                            <Table
                                className="skills-table"
                                rowKey="name"
                                dataSource={newLangFrames.map((langFrame) => ({
                                    ...langFrame,
                                    key: langFrame.key,
                                }))}
                                style={{
                                    width: "100%",
                                    maxHeight: "200px",
                                    overflow: "auto",
                                }}
                                columns={[
                                    ...langFrames,
                                    {
                                        title: t("main.Action"),
                                        width: 50,
                                        render: (record) => (
                                            <CloseCircleOutlined
                                                type="link"
                                                onClick={() => {
                                                    removeLangFrame(record.key);
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                                pagination={false}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={15} justify={"center"}>
                    <Col md={24} lg={8}>
                        <Form.Item
                            label= {t("main.Technology")}
                            style={{ padding: 0, margin: 0 }}
                        >
                            <Select
                                value={newTech}
                                onChange={(value) => setNewTech(value)}
                                placeholder={ t("main.Technology")}
                            >
                                {[
                                    "Docker",
                                    "Git/GitHub",
                                    "Jira",
                                    "AWS",
                                    "K8S",
                                    "Tailwind",
                                    "MongoDB",
                                    "PostgreSQL",
                                    "SQL Server",
                                    "Redis",
                                ].map((tech) => (
                                    <Select.Option key={tech} value={tech}>
                                        {tech}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={t("main.Experience")}
                            style={{ marginBottom: "8px" }}
                            rules={[
                                {
                                    required: true,
                                    message: t("main.Experience"),
                                },
                            ]}
                        >
                            <InputNumber
                                value={newTechExperience}
                                onChange={(value) => setNewTechExperience(value)}
                                style={{ width: "100%" }}
                                placeholder={t("main.Experience")}
                                min={1}
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={addToTech}
                        >
                        </Button>
                    </Col>
                    <Col md={24} lg={8}>
                        <Form.Item name="techs">
                            <Table
                                className="skills-table"
                                rowKey="name"
                                dataSource={newTechs.map((tech) => ({
                                    ...tech,
                                    key: tech.key,
                                }))}
                                style={{
                                    width: "100%",
                                    maxHeight: "200px",
                                    overflow: "auto",
                                }}
                                columns={[
                                    ...techs,
                                    {
                                        title: t("main.Action"),
                                        width: 50,
                                        render: (record) => (
                                            <CloseCircleOutlined
                                                type="link"
                                                onClick={() => {
                                                    removeTech(record.key);
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                                pagination={false}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Divider />
                <Row gutter={15} justify={"center"}>
                    <Col md={24} lg={8}>
                        <Form.Item
                            label={t("main.Soft skill")}
                            style={{ padding: 0, margin: 0 }}
                        >
                            <Select
                                value={newSkill}
                                onChange={(value) => setNewSkill(value)}
                                placeholder={t("main.Skill")}
                            >
                                {[t("main.Management"), t("main.Planning"), t("main.Team Work")].map((skill) => (
                                    <Select.Option key={skill} value={skill}>
                                        {skill}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>

                        <Form.Item
                            label={t("main.Experience")}
                            style={{ marginBottom: "8px" }}
                            rules={[
                                {
                                    required: true,
                                    message: t("main.Experience"),
                                },
                            ]}
                        >
                            <InputNumber
                                value={newExperience}
                                onChange={(value) => setNewExperience(value)}
                                style={{ width: "100%" }}
                                placeholder={t("main.Experience")}
                                min={1}
                            />
                        </Form.Item>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={addToSkills}
                        >
                        </Button>
                    </Col>
                    <Col md={24} lg={8}>
                        <Form.Item name="skills">
                            <Table
                                className="skills-table"
                                rowKey="name"
                                dataSource={newSkills.map((skill) => ({
                                    ...skill,
                                    key: skill.key,
                                }))}
                                style={{
                                    width: "100%",
                                    maxHeight: "200px",
                                    overflow: "auto",
                                }}
                                columns={[
                                    ...skills,
                                    {
                                        title: t("main.Action"),
                                        width: 50,
                                        style: { whiteSpace: "nowrap" },
                                        render: (record) => (
                                            <CloseCircleOutlined
                                                type="link"
                                                onClick={() => {
                                                    removeSkill(record.key);
                                                }}
                                            />
                                        ),
                                    },
                                ]}
                                pagination={false}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={15} justify={"center"}>
                            <Button
                                style={{
                                    marginRight: "10px",
                                    // borderRadius: "50px",
                                    // height: "35px",
                                }}

                            >
                                {t("main.Back")}
                            </Button>
                            <Button
                                style={{
                                    marginRight: "10px",
                                    // borderRadius: "50px",
                                    // height: "35px",
                                }}
                                type="primary"
                                onClick={handleAdd}
                            >
                                {t("main.Save")}
                            </Button>
                </Row>
            </Form>
        </>
    );
};
export default CreateEmployee;
