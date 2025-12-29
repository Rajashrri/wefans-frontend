import React, { useState } from "react";
import {
  Row, Col, Card, CardBody, Button, Label, Input, Container
} from "reactstrap";
import Breadcrumbs from '../../components/Common/Breadcrumb';
import { toast } from 'react-toastify';
import { addprofessionalmaster } from "../../api/professionalmasterApi";
import { useNavigate } from "react-router-dom";

const Addprofessionalmaster = () => {
  const [professionalmaster, setprofessionalmaster] = useState({
    name: "",
     slug: "",
     image: null,
  
  });

  const [errors, setErrors] = useState({});
const navigate = useNavigate();

  const breadcrumbItems = [
    { title: "Dashboard", link: "#" },
    { title: "Add Profession ", link: "#" },
  ];

  const handleInput = (e) => {
    const { name, value } = e.target;
    setprofessionalmaster({ ...professionalmaster, [name]: value });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setprofessionalmaster((prev) => ({
      ...prev,
      [name]: files[0], // store single file object
    }));
  };


 // ✅ Submit handler
 const handleAddSubmit = async (e) => {
  e.preventDefault();
  const newErrors = {};

  // Validation
  if (!professionalmaster.name) newErrors.name = "Name is required";
   if (!professionalmaster.slug) newErrors.slug = "Slug is required";
  if (!professionalmaster.image) newErrors.image = "Image is required";

  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    return;
  }

  try {
    const adminid = localStorage.getItem("adminid");

    const formData = new FormData();
    formData.append("name", professionalmaster.name);
        formData.append("slug", professionalmaster.slug);

    formData.append("createdBy", adminid);
    if (professionalmaster.image) formData.append("image", professionalmaster.image);

    // ✅ Use API helper instead of raw fetch
    const res_data = await addprofessionalmaster(formData);
    console.log("API Response:", res_data);

    if (res_data.success === false || res_data.msg === "professionalmaster already exist") {
      toast.error(res_data.msg || "Failed to add professionalmaster");
      return;
    }

    toast.success("Professionalmaster added successfully!");
    setErrors({});
     navigate("/professional-list");
  } catch (error) {
    console.error("Add professionalmaster Error:", error);
    toast.error("Something went wrong!");
  }
};



  

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="Profession Master" breadcrumbItems={breadcrumbItems} />
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
                        value={professionalmaster.name}
                        onChange={handleInput}
                      />
                      {errors.name && <span className="text-danger">{errors.name}</span>}
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
                                               <span className="text-danger">
                                                 {errors.image}
                                               </span>
                                             )}
                                             {professionalmaster.image && (
                                               <small className="text-success">
                                                 {professionalmaster.image.name}
                                               </small>
                                             )}
                                           </div>
                                         </Col>

                                         <Col md="6">
                      <Label> Slug</Label>
                      <Input
                        name="slug"
                        type="text"
                        placeholder="Slug"
                        value={professionalmaster.slug}
                        onChange={handleInput}
                      />
                      {errors.slug && <span className="text-danger">{errors.slug}</span>}
                    </Col>
                 
                  </Row>
                  <Button color="primary" type="submit" className="mt-3">Add</Button>
                </form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Addprofessionalmaster;
