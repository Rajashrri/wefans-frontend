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
import { useParams, useNavigate } from "react-router-dom";
import { getBlogCategories, getBlogById, updateBlog } from "../../api/blogApi";

const UpdateEmploye = () => {
  const { id } = useParams(); // ✅ Allowed in functional component
  const navigate = useNavigate();

  const [optionscat, setOptions] = useState([]);
  const [errors, setErrors] = useState({});
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
    old_main_image: "",
    old_feature_image: "",
  });

  // ✅ Fetch blog data & category list on mount
  useEffect(() => {
    fetchOptions();
    fetchBlogData();
  }, [id]);

  // Fetch categories
const fetchOptions = async () => {
  try {
    const res_data = await getBlogCategories();

    if (Array.isArray(res_data.msg)) {
      const options = res_data.msg.map((item) => ({
        value: item._id,
        label: item.name?.trim() || "Unnamed Category",
      }));
      setOptions(options);
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    toast.error("Failed to load categories");
  }
};
 

  const fetchBlogData = async () => {
  try {
    const res_data = await getBlogById(id);

    if (res_data.msg) {
      const blogData = res_data.msg;
      setBlog({
        name: blogData.name || "",
        category_id: blogData.category_id || "",
        category_name: blogData.category_name || "",
        date: blogData.date ? blogData.date.slice(0, 10) : "",
        author_name: blogData.author_name || "",
        short_description: blogData.short_description || "",
        details: blogData.details || "",
        old_main_image: blogData.main_image || "",
        old_feature_image: blogData.feature_image || "",
      });
    } else {
      toast.error("Failed to load blog data");
    }
  } catch (error) {
    console.error("Error fetching blog:", error);
    toast.error("Error loading blog details");
  }
};

  // Handle input
  const handleInput = (e) => {
    const { name, value } = e.target;
    setBlog((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setBlog((prev) => ({ ...prev, [name]: files[0] }));
  };

  // ✅ Submit update
 const handleUpdateSubmit = async (e) => {
  e.preventDefault();

  const newErrors = {};
  if (!blog.name) newErrors.name = "Title is required";
  if (!blog.category_id) newErrors.category_id = "Category is required";
  if (!blog.date) newErrors.date = "Date is required";
  if (!blog.author_name) newErrors.author_name = "Author name is required";
  if (!blog.short_description) newErrors.short_description = "Short description is required";
  if (!blog.details) newErrors.details = "Details are required";

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
    formData.append("updatedBy", adminid);

    if (blog.main_image) formData.append("main_image", blog.main_image);
    if (blog.feature_image) formData.append("feature_image", blog.feature_image);

    const res_data = await updateBlog(id, formData);

    if (res_data.success === false || res_data.msg === "Blog already exist") {
      toast.error(res_data.msg || "Failed to update blog");
      return;
    }

    toast.success("Blog updated successfully!");
    navigate("/blog-list");
  } catch (error) {
    console.error("Update Blog Error:", error);
    toast.error("Something went wrong!");
  }
};


  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Update Blog" breadcrumbItems={["Blog", "Update"]} />
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <form
                  className="needs-validation"
                  onSubmit={handleUpdateSubmit}
                >
                  <Row>
                    {/* Category Select */}
                    <Col md="6">
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
                    </Col>

                    {/* Title */}
                    <Col md="6">
                      <Label className="form-label">Title</Label>
                      <Input
                        name="name"
                        value={blog.name}
                        onChange={handleInput}
                        placeholder="Enter blog title"
                      />
                      {errors.name && (
                        <span className="text-danger">{errors.name}</span>
                      )}
                    </Col>

                    {/* Date */}
                    <Col md="6">
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
                    </Col>

                    {/* Author */}
                    <Col md="6">
                      <Label className="form-label">Author Name</Label>
                      <Input
                        name="author_name"
                        value={blog.author_name}
                        onChange={handleInput}
                        placeholder="Enter author name"
                      />
                      {errors.author_name && (
                        <span className="text-danger">
                          {errors.author_name}
                        </span>
                      )}
                    </Col>
                    {/* Main Image */}
                    <Col md="6">
                      <Label className="form-label">Main Image</Label>
                      <Input
                        type="file"
                        name="main_image"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {blog.old_main_image && (
                        <div className="mt-2">
                          <img
                            src={`${process.env.REACT_APP_API_BASE_URL}/blog/${blog.old_main_image}`}
                            alt="Main"
                            width="100"
                            className="rounded border"
                          />
                        </div>
                      )}
                    </Col>

                    {/* Feature Image */}
                    <Col md="6">
                      <Label className="form-label">Feature Image</Label>
                      <Input
                        type="file"
                        name="feature_image"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {blog.old_feature_image && (
                        <div className="mt-2">
                          <img
                            src={`${process.env.REACT_APP_API_BASE_URL}/blog/${blog.old_feature_image}`}
                            alt="Feature"
                            width="100"
                            className="rounded border"
                          />
                        </div>
                      )}
                    </Col>
                    {/* Short Description */}
                    <Col md="12">
                      <Label className="form-label">Short Description</Label>
                      <Input
                        type="textarea"
                        rows="3"
                        name="short_description"
                        value={blog.short_description}
                        onChange={handleInput}
                        placeholder="Enter a short summary"
                      />
                      {errors.short_description && (
                        <span className="text-danger">
                          {errors.short_description}
                        </span>
                      )}
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

                  <Button color="primary" type="submit" className="mt-3">
                    Update Blog
                  </Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default UpdateEmploye;
