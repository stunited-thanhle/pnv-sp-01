import React, {useRef, useState} from 'react';
import { useParams } from "react-router-dom";
import {
  useGetDetailEmployee,
  useUpdateEmployee,
  useGetManager,
  useDeleteEmployee
} from "../../../hooks/useEmployee.jsx";
import {Row, Col, Button, Form, Input, Typography, Card, Select, message, Space, Timeline, DatePicker} from 'antd';
import moment from "moment";
import 'sweetalert2/dist/sweetalert2.css';
import { useTranslation} from 'react-i18next';


import { Cloudinary } from "@cloudinary/url-gen";
import axios from "axios";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import {useNavigate} from "react-router";
import Swal from 'sweetalert2';

const { TextArea } = Input;
const { Option } = Select;

const EmployeeDetail = () => {
  const { id } = useParams();
  const { data: employee, isLoading, isError } = useGetDetailEmployee(id);
  const updateEmployeeMutation = useUpdateEmployee(id);
  const { mutate: deleteEmployee } = useDeleteEmployee();
  const [editMode, setEditMode] = useState(false);
  const [editedEmployee, setEditedEmployee] = useState({});

  const [imageUrl, setImageUrl] = useState("");
  const [newAvatar, setNewAvatar] = useState(null);
  const [loadingAvatar, setLoadingAvatar] = useState(false);
  const cld = new Cloudinary({ cloud: { cloudName: "da9hiv52w" } });
  const fileInputRef = useRef();
  const { data: managers } = useGetManager();
  const { t, i18n } = useTranslation();
  const navigate= useNavigate()


  if (isLoading) {
    return <div>{t("main.Loading...")}</div>;
  }

  if (isError) {
    return <div>{t("main.404 Not Found")}</div>;
  }
 
  const disabledDate = (current) => {
    return current && current > moment().endOf(t('main.day'));
  };

  const handleDeleteConfirm = async () => {
    try {
        const result = await Swal.fire({
            title: 'Confirmation',
            text: 'Are you sure you want to delete this employee?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
          deleteEmployee(id);
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Failed to delete employee.',
            icon: 'error',
            timer: 1000,
            showConfirmButton: false
        });
    }
};

  const handleEditClick = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setEditedEmployee(employee?.employee);
    }
  };

  const handleAddSkill = () => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      skills: [
        ...prevState.skills,
        { name: '', exp: '' }
      ],
    }));
  };

  const handleRemoveSkill = (indexToRemove) => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      skills: prevState.skills.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleSkillInputChange = (e, index, field) => {
    const { value } = e.target;
    setEditedEmployee((prevState) => ({
      ...prevState,
      skills: prevState.skills.map((skill, i) =>
          i === index ? { ...skill, [field]: value } : skill
      ),
    }));
  };
  const handleAddLangFrame = () => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      langFrame: [
        ...prevState.langFrame,
        { name: '', exp: '' }
      ],
    }));
  };

  const handleRemoveLangFrame = (indexToRemove) => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      langFrame: prevState.langFrame.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleLangFrameInputChange = (e, index, field) => {
    const { value } = e.target;
    setEditedEmployee((prevState) => ({
      ...prevState,
      langFrame: prevState.langFrame.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleAddTech = () => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      tech: [
        ...prevState.tech,
        { name: '', exp: '' }
      ],
    }));
  };

  const handleRemoveTech = (indexToRemove) => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      tech: prevState.tech.filter((_, index) => index !== indexToRemove),
    }));
  };

  const handleTechInputChange = (e, index, field) => {
    const { value } = e.target;
    setEditedEmployee((prevState) => ({
      ...prevState,
      tech: prevState.tech.map((item, i) =>
          i === index ? { ...item, [field]: value } : item
      ),
    }));
  };



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };


  const handleDateOfBirthChange = (date, dateString) => {
    setEditedEmployee((prevState) => ({
      ...prevState,
      dateOfBirth: dateString,
    }));
  };
  const handleFileChange = async (file) => {
    setLoadingAvatar(true);
    const formData = new FormData();
    if (file instanceof FileList) {
      for (const individualFile of file) {
        formData.append("file", individualFile);
        formData.append("upload_preset", "ay2jrgsp");

        try {
          const res = await axios.post(
              "https://api.cloudinary.com/v1_1/da9hiv52w/image/upload",
              formData,
          );

          setEditedEmployee((prev) => ({
            ...prev,
            avatar: res.data.secure_url, // Update the avatar property
          }));

          message.success(t("main.Avatar uploaded successfully, Click change to apply"));
        } finally {
          setLoadingAvatar(false);
        }

        formData.delete("file");
      }
    } else {
      formData.append("file", file);
      formData.append("upload_preset", "ay2jrgsp");

      try {
        const res = await axios.post(
            "https://api.cloudinary.com/v1_1/da9hiv52w/image/upload",
            formData,
        );

        setImageUrl(res.data.secure_url);
      } catch (err) {
        console.error(err.response.data);
      }

    }

  };
  const {
    avatar,
    name,
    code,
    email,
    phone,
    address,
    identityCard,
    dateOfBirth,
    gender,
    status,
    position,
    skills,
    langFrame,
    tech,
    description,
    manager,
  } = editMode ? editedEmployee : employee?.employee;

  const handleSaveClick = async () => {
    try {
      const result = await updateEmployeeMutation.mutateAsync(editedEmployee);
      setEditMode(false)
      Swal.fire({
        icon: 'success',
        title: t('main.Success'),
        text: t('main.Employee updated successfully!'),
      });
    } catch (error) {
      console.error(t('main.Error updating employee:'), error);

      // Show error alert
      Swal.fire({
        icon: 'error',
        title: t('main.Error'),
        text: t('main.Failed to update employee. Please try again.'),
      });
    }
  };
  return (
      <Card>
        <Row gutter={32}>
          <Col md={24} lg={8}>
            <Row gutter={32} align="middle" justify="center" style={{ marginBottom: 16 }}>
              <Col span={24}>
                <img
                    name="avatar"
                    style={{
                      width: "200px",
                      height: "200px",
                      borderRadius: "100%",
                    }}
                    src={
                        imageUrl ||
                        (newAvatar
                            ? URL.createObjectURL(newAvatar)
                            : (editMode ? editedEmployee.avatar : employee.employee.avatar))
                    }

                    alt={t("main.Employee Avatar")}
                />
                {loadingAvatar && (
                    <div
                        style={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background: "rgba(255, 255, 255, 0.8)",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                          zIndex: 999,
                        }}
                    >
                      {/*<Spin size="large" />*/}
                    </div>
                )}
              </Col>
              <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files)}
                  style={{ display: "none" }}
                  ref={fileInputRef}
              />
              <Col span={24}>
                {editMode && (
                    <Button
                        style={{
                          margin: "10px",
                          borderRadius: "50px",
                          height: "35px",
                        }}
                        onClick={() => fileInputRef.current.click()}
                    >
                      Upload
                    </Button>
                )}
              </Col>
            </Row>
            <Row gutter={16} justify="center">
              <Col span={24}>
                <Form.Item label={t("main.Description")}>
                  {editMode ? (
                      <TextArea
                          rows={4}
                          value={editedEmployee.description}
                          onChange={handleInputChange}
                          name="description"
                      />
                  ) : (
                      <div style={{ maxWidth: "300px", whiteSpace: "pre-wrap" }}>
                        {description}
                      </div>
                  )}
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={16} justify="center">
              <Col span={24}>
                <Form.Item label={t("main.Projects")}>
                  <Timeline mode="left">l
                    {employee?.employee?.employee_project?.map((project, index) => (
                        <Timeline.Item key={index} label={`${moment(project?.project?.startDate).format(t('main.DD-MM-YYYY'))} - ${moment(project?.project?.endDate).format(t('main.DD-MM-YYYY'))}`}>
                          <div>
                            <strong>{t("main.Name:")}</strong> {project?.project?.name}
                          </div>
                          <div>
                            <strong>{t("main.Role:")}</strong> {project?.roles?.join(', ')}
                          </div>
                        </Timeline.Item>
                    ))}
                  </Timeline>
                </Form.Item>

              </Col>
            </Row>
          </Col>
          <Col md={24} lg={16}>
            <Form layout="vertical">
              <Typography.Title level={3} style={{ lineHeight: "30px" }}>
                {t("main.Employee Information")}
              </Typography.Title>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label={t("main.Employee Code")}>
                    <Input
                        name="code"
                        value={editMode ? editedEmployee.code : code}
                        style={{ maxWidth: "300px" }}
                        disabled
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Manager Name")}>

                    {editMode ? (
                        <Select>
                          {(managers || []).map((manager) => (
                              <Select.Option key={manager.id} value={manager.id}>
                                {manager.name}
                              </Select.Option>
                          ))}
                        </Select>
                    ) : (
                        <Input
                            value={editMode ? editedEmployee.manager.name : name}
                            style={{ maxWidth: "300px" }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Name")}>
                    {editMode ? (
                        <Input
                            name="name"
                            value={editedEmployee.name}
                            onChange={handleInputChange}
                            style={{ maxWidth: '300px' }}
                        />
                    ) : (
                        <Input
                            name="name"
                            value={name}
                            style={{ maxWidth: '300px' }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Email")}>
                    {editMode ? (
                        <Input
                            name="email"
                            value={editedEmployee.email}
                            onChange={handleInputChange}
                            style={{ maxWidth: '300px' }}
                        />
                    ) : (
                        <Input
                            name="email"
                            value={email}
                            style={{ maxWidth: '300px' }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Phone")}>
                    {editMode ? (
                        <Input
                            name="phone"
                            value={editedEmployee.phone}
                            onChange={handleInputChange}
                            style={{ maxWidth: '300px' }}
                        />
                    ) : (
                        <Input
                            name="phone"
                            value={phone}
                            style={{ maxWidth: '300px' }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Identity")}>
                    {editMode ? (
                        <Input
                            name="identityCard"
                            value={editedEmployee.identityCard}
                            onChange={handleInputChange}
                            style={{ maxWidth: '300px' }}
                        />
                    ) : (
                        <Input
                            name="identityCard"
                            value={identityCard}
                            style={{ maxWidth: '300px' }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Date of birth")}>
                    {editMode ? (
                        <DatePicker
                            value={moment(editedEmployee.dateOfBirth)}
                            style={{ maxWidth: "300px" }}
                            onChange={handleDateOfBirthChange}
                            disabledDate={disabledDate}
                        />

                    ) : (
                        <Input
                            value={moment(dateOfBirth).format("DD-MM-YYYY")}
                            style={{ maxWidth: "300px" }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Gender")}>
                    {editMode ? (
                        <Select
                            value={editedEmployee.gender}
                            style={{ maxWidth: "300px" }}
                            onChange={(value) => handleInputChange({ target: { name: "gender", value } })}
                        >
                          <Option value="male">{t("main.Male")}</Option>
                          <Option value="female">{t("main.Female")}</Option>
                        </Select>
                    ) : (
                        <Input
                            value={{ male: t("main.Male"), female: t("main.Female") }[gender] || ""}
                            style={{ maxWidth: "300px" }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Position")}>
                    {editMode ? (
                        <Select
                            value={editedEmployee.position}
                            style={{ maxWidth: "300px" }}
                            onChange={(value) => handleInputChange({ target: { name: "position", value } })}
                        >
                          <Option value="fe">Front-end Dev</Option>
                          <Option value="be">Back-end Dev</Option>
                          <Option value="fullstack">FullStack</Option>
                          <Option value="ba">Business Analysis</Option>
                          <Option value="qa">Quality Assurance</Option>
                          <Option value="devops">DevOps Engineer</Option>
                          <Option value="ux_ui">User Experience</Option>
                        </Select>
                    ) : (
                        <Input
                            value={{
                              fe: "Front-end Dev",
                              be: "Back-end Dev",
                              fullstack: "FullStack",
                              ba: "Business Analysis",
                              qa: "Quality Assurance",
                              devops: "DevOps Engineer",
                              ux_ui: "User Experience",
                            }[position] || ""}
                            style={{ maxWidth: "300px" }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Status")}>
                    {editMode ? (
                        <Select
                            value={editedEmployee.status}
                            style={{ maxWidth: "300px" }}
                            onChange={(value) => handleInputChange({ target: { name: "status", value } })}
                        >
                          <Option value="active">{t("main.Active")}</Option>
                          <Option value="inactive">{t("main.Inactive")}</Option>
                        </Select>
                    ) : (
                        <Input
                            value={{ active: t("main.Active"), inactive: t("main.Inactive") }[status] || ""}
                            style={{ maxWidth: "300px" }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Address")}>
                    {editMode ? (
                        <Input
                            rows={4}
                            value={editedEmployee.address}
                            onChange={handleInputChange}
                            name="address"
                            style={{ maxWidth: '300px' }}
                        />
                    ) : (
                        <Input
                            name="address"
                            value={address}
                            style={{ maxWidth: '300px' }}
                            disabled
                        />
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Soft skill")}>
                    {editMode ? (
                        skills.map((skill, index) => (
                            <div key={index} style={{ marginBottom: '8px' }}>
                              <Input
                                  value={editedEmployee?.skills[index].name}
                                  onChange={(e) => handleSkillInputChange(e, index, 'name')}
                                  style={{ width: '120px', marginRight: '8px' }}
                                  placeholder={t("main.Skill Name")}
                              />
                              <Input
                                  value={editedEmployee?.skills[index].exp}
                                  onChange={(e) => handleSkillInputChange(e, index, 'exp')}
                                  style={{ width: '80px', marginRight: '8px' }}
                                  placeholder={t("main.Experience")}
                              />
                              <Button
                                  type="danger"
                                  icon={<DeleteOutlined />}
                                  onClick={() => handleRemoveSkill(index)}
                              />

                            </div>
                        ))
                    ) : (
                        skills.map((skill, index) => (
                            <div key={index} style={{ marginBottom: '8px' }}>
                              <Input
                                  value={skill.name}
                                  style={{ width: '120px', marginRight: '8px' }}
                                  placeholder={t("main.Skill Name")}
                                  disabled
                              />
                              <Input
                                  value={skill.exp}
                                  style={{ width: '80px', marginRight: '8px' }}
                                  placeholder={t("main.Experience")}
                                  disabled
                              />
                            </div>
                        ))
                    )}
                    {editMode && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddSkill}
                        >
                        </Button>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Language/Framework")}>
                    {editMode ? (
                        langFrame.map((item, index) => (
                            <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                              <Input
                                  value={item.name}
                                  onChange={(e) => handleLangFrameInputChange(e, index, 'name')}
                                  style={{ width: '120px', marginRight: '8px' }}
                                  placeholder={t("main.Language/Framework")}
                              />
                              <Input
                                  value={item.exp}
                                  onChange={(e) => handleLangFrameInputChange(e, index, 'exp')}
                                  style={{ width: '80px', marginRight: '8px' }}
                                  placeholder={t("main.Experience")}
                              />
                              <Button
                                  type="danger"
                                  icon={<DeleteOutlined />}
                                  onClick={() => handleRemoveLangFrame(index)}
                              />
                            </div>
                        ))
                    ) : (
                        langFrame.map((item, index) => (
                            <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                              <Input
                                  value={item.name}
                                  style={{ width: '120px', marginRight: '8px' }}
                                  placeholder={t("main.Language/Framework")}
                                  disabled
                              />
                              <Input
                                  value={item.exp}
                                  // onChange={(e) => handleLangFrameInputChange(e, index, 'exp')}
                                  style={{ width: '80px', marginRight: '8px' }}
                                  placeholder={t("main.Experience")}
                                  disabled
                              />
                            </div>
                        ))
                    )}

                    {editMode && (
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddLangFrame}
                        >
                        </Button>
                    )}
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label={t("main.Technology")}>
                    {editMode ? (
                        // Display input fields for editing tech
                        tech.map((item, index) => (
                            <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                              <Input
                                  value={item.name}
                                  onChange={(e) => handleTechInputChange(e, index, 'name')}
                                  style={{ width: '120px', marginRight: '8px' }}
                                  placeholder={t("main.Technology")}
                              />
                              <Input
                                  value={item.exp}
                                  onChange={(e) => handleTechInputChange(e, index, 'exp')}
                                  style={{ width: '80px', marginRight: '8px' }}
                                  placeholder={t("main.Experience")}
                              />
                              <Button
                                  type="danger"
                                  icon={<DeleteOutlined />}
                                  onClick={() => handleRemoveTech(index)}
                              />
                            </div>
                        ))
                    ) : (
                        // Display tech in a table format
                        tech.map((item, index) => (
                            <div key={index} style={{ marginBottom: '8px', display: 'flex', alignItems: 'center' }}>
                              <Input
                                  value={item.name}
                                  // onChange={(e) => handleTechInputChange(e, index, 'name')}
                                  style={{ width: '120px', marginRight: '8px' }}
                                  placeholder={t("main.Technology")}
                                  disabled
                              />
                              <Input
                                  value={item.exp}
                                  // onChange={(e) => handleTechInputChange(e, index, 'exp')}
                                  style={{ width: '80px', marginRight: '8px' }}
                                  placeholder={t("main.Experience")}
                                  disabled
                              />
                            </div>
                        ))

                    )}
                    {editMode && (
                        // Button to add a new tech input field
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={handleAddTech}
                        >
                        </Button>
                    )}
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={8} justify="center">
                <Col>
                  {editMode ? (
                      <Button type="primary" onClick={handleSaveClick}>
                        {t("main.Save")}
                      </Button>
                  ) : (
                      <Button type="default" onClick={handleEditClick}>
                        {t("main.Edit")}
                      </Button>
                  )}
                </Col>
                <Col>
                  <Button type="primary"  onClick={handleDeleteConfirm} >{t("main.Delete")}</Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Card>
  );
};

export default EmployeeDetail;