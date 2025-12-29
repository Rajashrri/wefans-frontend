import React, { useState } from "react";
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
import { toast } from "react-toastify";
import { addTestimonial } from "../../api/testimonialApi";

const Addtestimonial = () => {
  const [testimonial, setTestimonial] = useState({
    name: "",
       designation: "",
          feedback: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const breadcrumbItems = [
    { title: "Dashboard", link: "#" },
    { title: "Add Testimonial", link: "#" },
  ];

  const handleInput = (e) => {
    const { name, value } = e.target;
    setTestimonial({ ...testimonial, [name]: value });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setTestimonial((prev) => ({
      ...prev,
      [name]: files[0], // store single file object
    }));
  };

  // ✅ Submit handler
const handleAddSubmit = async (e) => {
  e.preventDefault();
  const newErrors = {};

  // Validation
  if (!testimonial.name) newErrors.name = "Name is required";
  if (!testimonial.designation) newErrors.designation = "Designation is required";
  if (!testimonial.feedback) newErrors.feedback = "Feedback is required";
  if (!testimonial.image) newErrors.image = "Image is required";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const adminid = localStorage.getItem("adminid");
    const formData = new FormData();

    formData.append("name", testimonial.name);
    formData.append("designation", testimonial.designation);
    formData.append("feedback", testimonial.feedback);
    formData.append("createdBy", adminid);

    if (testimonial.image) formData.append("image", testimonial.image);

    // ✅ Use API helper instead of fetch
    const res_data = await addTestimonial(formData);
    console.log("API Response:", res_data);

    if (res_data.success === false || res_data.msg === "Testimonial already exists") {
      toast.error(res_data.msg || "Failed to add testimonial");
      return;
    }

    toast.success("Testimonial added successfully!");
    setErrors({});
    setTestimonial({ name: "", designation: "", feedback: "", image: null });
  } catch (error) {
    console.error("Add Testimonial Error:", error);
    toast.error("Something went wrong!");
  }
};


  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="ADD testimonial"
          breadcrumbItems={breadcrumbItems}
        />
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <form onSubmit={handleAddSubmit}>
                  <Row>
                    <Col md="6">
                      <Label> Name</Label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={testimonial.name}
                        onChange={handleInput}
                      />
                      {errors.name && (
                        <span className="text-danger">{errors.name}</span>
                      )}
                    </Col>
                    <Col md="6">
                      <Label> Designation</Label>
                      <Input
                        name="designation"
                        type="text"
                        placeholder="Designation"
                        value={testimonial.designation}
                        onChange={handleInput}
                      />
                      {errors.designation && (
                        <span className="text-danger">
                          {errors.designation}
                        </span>
                      )}
                    </Col>
                    {/* Main Image */}
                    <Col md="6">
                      <div className="mb-3">
                        <Label className="form-label"> Image</Label>
                        <Input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                        {errors.image && (
                          <span className="text-danger">{errors.image}</span>
                        )}
                        {testimonial.image && (
                          <small className="text-success">
                            {testimonial.image.name}
                          </small>
                        )}
                      </div>
                    </Col>

                    {/* Short Description */}
                    <Col md="12">
                      <div className="mb-3">
                        <Label className="form-label">Feedback</Label>
                        <Input
                          type="textarea"
                          name="feedback"
                          placeholder="Enter a feedback"
                          value={testimonial.feedback}
                          onChange={handleInput}
                          rows="3"
                        />
                        {errors.feedback && (
                          <span className="text-danger">{errors.feedback}</span>
                        )}
                      </div>
                    </Col>
                  </Row>
                  <Button color="primary" type="submit" className="mt-3">
                    Add
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

export default Addtestimonial;
