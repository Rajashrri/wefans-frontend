import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Button,
  Label,
  Input,
  Container,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import Select from "react-select";
import { toast } from "react-toastify";
import { addBlog, getBlogCategories } from "../../api/blogApi";

const CreateEmploye = () => {
  const [breadcrumbItems] = useState([
    { title: "Dashboard", link: "/" },
    { title: "Add blog", link: "#" },
  ]);

  const [optionscat, setOptions] = useState([]);
  const [blog, setBlog] = useState({
    name: "",
    category_id: "",
    category_name: "",
    date: "",
    author_name: "",
    short_description: "",
    details: "",
    main_image: null,
    feature_image: null,
  });

  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setBlog((prev) => ({
      ...prev,
      [name]: files[0], // store single file object
    }));
  };

  // ✅ Submit handler
const handleAddSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};
  if (!blog.name) newErrors.name = "Title is required";
  if (!blog.category_id) newErrors.category_id = "Category is required";
  if (!blog.date) newErrors.date = "Date is required";
  if (!blog.author_name) newErrors.author_name = "Author name is required";
  if (!blog.short_description) newErrors.short_description = "Short description is required";
  if (!blog.details) newErrors.details = "Details are required";
  if (!blog.main_image) newErrors.main_image = "Main image is required";
  if (!blog.feature_image) newErrors.feature_image = "Feature image is required";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const adminid = localStorage.getItem("adminid");
    const formData = new FormData();
    formData.append("name", blog.name);
    formData.append("category_id", blog.category_id);
    formData.append("category_name", blog.category_name);
    formData.append("date", blog.date);
    formData.append("author_name", blog.author_name);
    formData.append("short_description", blog.short_description);
    formData.append("details", blog.details);
    formData.append("createdBy", adminid);
    if (blog.main_image) formData.append("main_image", blog.main_image);
    if (blog.feature_image) formData.append("feature_image", blog.feature_image);

    const res_data = await addBlog(formData);

    if (res_data.success === false || res_data.msg === "Blog already exist") {
      toast.error(res_data.msg || "Failed to add blog");
      return;
    }

    toast.success("Blog added successfully!");
    setErrors({});
    setBlog({
      name: "",
      category_id: "",
      category_name: "",
      date: "",
      author_name: "",
      short_description: "",
      details: "",
      main_image: null,
      feature_image: null,
    });
  } catch (error) {
    console.error("Add Blog Error:", error);
    toast.error("Something went wrong!");
  }
};

  //add blog

 const fetchOptions = async () => {
  try {
    const res_data = await getBlogCategories();
    const options = Array.isArray(res_data.msg)
      ? res_data.msg.map((item) => ({
          value: item._id,
          label: item.name?.trim() || item.name,
        }))
      : [];
    setOptions(options);
  } catch (error) {
    console.error("Error fetching category options:", error);
  }
};

  useEffect(() => {
    fetchOptions();
  }, []);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Breadcrumbs title="Add Blog" breadcrumbItems={["Blog", "Add"]} />
          <Row>
            <Col xl="12">
              <Card>
                <CardBody>
                  <form className="needs-validation" onSubmit={handleAddSubmit}>
                    <Row>
                      {/* Category Select */}
                      <Col md="6">
                        <div className="mb-3">
                          <Label className="form-label">Select Category</Label>
                          <Select
                            options={optionscat}
                            name="category_id"
                            value={
                              optionscat.find(
                                (option) => option.value === blog.category_id
                              ) || null
                            }
                            onChange={(selectedOption) => {
                              setBlog((prev) => ({
                                ...prev,
                                category_id: selectedOption
                                  ? selectedOption.value
                                  : "",
                                category_name: selectedOption
                                  ? selectedOption.label
                                  : "",
                              }));
                            }}
                            isClearable
                            placeholder="Choose..."
                          />
                          {errors.category_id && (
                            <span className="text-danger">
                              {errors.category_id}
                            </span>
                          )}
                        </div>
                      </Col>

                      {/* Title */}
                      <Col md="6">
                        <div className="mb-3">
                          <Label className="form-label">Title</Label>
                          <Input
                            value={blog.name || ""}
                            onChange={handleInput}
                            name="name"
                            placeholder="Enter blog title"
                            type="text"
                          />
                          {errors.name && (
                            <span className="text-danger">{errors.name}</span>
                          )}
                        </div>
                      </Col>

                      {/* Date */}
                      <Col md="6">
                        <div className="mb-3">
                          <Label className="form-label">Date</Label>
                          <Input
                            type="date"
                            name="date"
                            value={blog.date}
                            onChange={handleInput}
                          />
                          {errors.date && (
                            <span className="text-danger">{errors.date}</span>
                          )}
                        </div>
                      </Col>

                      {/* Author Name */}
                      <Col md="6">
                        <div className="mb-3">
                          <Label className="form-label">Author Name</Label>
                          <Input
                            type="text"
                            name="author_name"
                            placeholder="Enter author name"
                            value={blog.author_name}
                            onChange={handleInput}
                          />
                          {errors.author_name && (
                            <span className="text-danger">
                              {errors.author_name}
                            </span>
                          )}
                        </div>
                      </Col>

                      {/* Main Image */}
                      <Col md="6">
                        <div className="mb-3">
                          <Label className="form-label">Main Image</Label>
                          <Input
                            type="file"
                            name="main_image"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          {errors.main_image && (
                            <span className="text-danger">
                              {errors.main_image}
                            </span>
                          )}
                          {blog.main_image && (
                            <small className="text-success">
                              {blog.main_image.name}
                            </small>
                          )}
                        </div>
                      </Col>

                      {/* Feature Image */}
                      <Col md="6">
                        <div className="mb-3">
                          <Label className="form-label">Feature Image</Label>
                          <Input
                            type="file"
                            name="feature_image"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          {errors.feature_image && (
                            <span className="text-danger">
                              {errors.feature_image}
                            </span>
                          )}
                          {blog.feature_image && (
                            <small className="text-success">
                              {blog.feature_image.name}
                            </small>
                          )}
                        </div>
                      </Col>

                      {/* Short Description */}
                      <Col md="12">
                        <div className="mb-3">
                          <Label className="form-label">
                            Short Description
                          </Label>
                          <Input
                            type="textarea"
                            name="short_description"
                            placeholder="Enter a short description"
                            value={blog.short_description}
                            onChange={handleInput}
                            rows="3"
                          />
                          {errors.short_description && (
                            <span className="text-danger">
                              {errors.short_description}
                            </span>
                          )}
                        </div>
                      </Col>

                      {/* Details */}
                      <Col md="12">
                        <Label className="form-label">Details</Label>
                        <Input
                          type="textarea"
                          rows="5"
                          name="details"
                          value={blog.details}
                          onChange={handleInput}
                          placeholder="Enter blog content"
                        />
                        {errors.details && (
                          <span className="text-danger">{errors.details}</span>
                        )}
                      </Col>



                    </Row>

                    <Button color="primary" type="submit">
                      Add Blog
                    </Button>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default CreateEmploye;
