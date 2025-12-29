import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  CardBody,
  Label,
  Input,
  Button,
  Container,
} from "reactstrap";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import { toast } from "react-toastify";
import { useParams,useNavigate } from "react-router-dom";
import { getTestimonialById, updateTestimonial } from "../../api/testimonialApi";

const Updatetestimonial = () => {
  const [testimonial, setTestimonial] = useState({
    name: "",
     designation: "",
      feedback: "",
    image: null,
    old_image: "",
  });
const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const { id } = useParams();

  const breadcrumbItems = [
    { title: "Dashboard", link: "#" },
    { title: "Update testimonial", link: "#" },
  ];

  // Fetch testimonial data
 useEffect(() => {
  const fetchTestimonial = async () => {
    try {
      const res_data = await getTestimonialById(id);

      if (res_data.msg) {
        const data = res_data.msg;
        setTestimonial({
          name: data.name || "",
          designation: data.designation || "",
          feedback: data.feedback || "",
          old_image: data.image || "",
        });
      } else {
        toast.error("Testimonial not found.");
      }
    } catch (error) {
      console.error("Fetch testimonial error:", error);
      toast.error("Failed to fetch testimonial data.");
    }
  };

  fetchTestimonial();
}, [id]);
 
  // Input handler
  const handleInput = (e) => {
    setTestimonial({ ...testimonial, [e.target.name]: e.target.value });
  };
  // Handle file change
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setTestimonial((prev) => ({ ...prev, [name]: files[0] }));
  };


  // ✅ Submit update
 const handleUpdateSubmit = async (e) => {
  e.preventDefault();
  const newErrors = {};

  if (!testimonial.name) newErrors.name = "Name is required";
  if (!testimonial.designation) newErrors.designation = "Designation is required";
  if (!testimonial.feedback) newErrors.feedback = "Feedback is required";

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
    formData.append("updatedBy", adminid);

    if (testimonial.image) formData.append("image", testimonial.image);

    const res_data = await updateTestimonial(id, formData);

    if (res_data.success === false || res_data.msg === "Testimonial already exists") {
      toast.error(res_data.msg || "Failed to update testimonial");
      return;
    }

    toast.success("Testimonial updated successfully!");
    navigate("/testimonial-list");
  } catch (error) {
    console.error("Update testimonial Error:", error);
    toast.error("Something went wrong!");
  }
};


 

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="UPDATE testimonial" breadcrumbItems={breadcrumbItems} />
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <form
                  className="needs-validation"
                  onSubmit={handleUpdateSubmit}
                >
                  <Row>
                    <Col md="6">
                      <Label> Name</Label>
                      <Input
                        name="name"
                        type="text"
                        placeholder="Name"
                        value={testimonial.name} // ✅ correct usage
                        onChange={handleInput}
                      />
                      {errors.name && (
                        <span className="text-danger">
                          {errors.name}
                        </span>
                      )}
                    </Col>


                      <Col md="6">
                      <Label> Name</Label>
                      <Input
                        name="designation"
                        type="text"
                        placeholder="Designation"
                        value={testimonial.designation} // ✅ correct usage
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
                      <Label className="form-label">Image</Label>
                      <Input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                      {testimonial.old_image && (
                        <div className="mt-2">
                          <img
                            src={`${process.env.REACT_APP_API_BASE_URL}/testimonial/${testimonial.old_image}`}
                            alt="Main"
                            width="100"
                            className="rounded border"
                          />
                        </div>
                      )}
                    </Col>
                    {/* Short Description */}
                    <Col md="12">
                      <Label className="form-label">Feedback</Label>
                      <Input
                        type="textarea"
                        rows="3"
                        name="feedback"
                        value={testimonial.feedback}
                        onChange={handleInput}
                        placeholder="Enter a Feedback"
                      />
                      {errors.feedback && (
                        <span className="text-danger">
                          {errors.feedback}
                        </span>
                      )}
                    </Col>

                  </Row>

                  <Button color="primary" type="submit" className="mt-3">
                    Update
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

export default Updatetestimonial;
