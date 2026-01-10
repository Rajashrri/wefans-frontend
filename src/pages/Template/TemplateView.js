import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSectionTemplateById } from "../../api/TemplateApi";
import {
  Input,
  Button,
  Label,
  Row,
  Col,
  Container,
  Card,
  CardBody,
} from "reactstrap";
import { toast } from "react-toastify";

const Template = () => {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [mediaPreviews, setMediaPreviews] = useState({});

  useEffect(() => {
    const fetchTemplate = async () => {
      try {
        const res = await getSectionTemplateById(id);
        const data = res.data;

        setTemplate(data);

        // Initialize formData dynamically for all sections
        const initialData = {};
        data.sections?.forEach((section) => {
          section.fieldsConfig?.forEach((field) => {
            initialData[field._id] = field.type === "media" ? null : "";
          });
        });
        setFormData(initialData);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load template");
      }
    };

    fetchTemplate();
  }, [id]);

  const handleChange = (fieldId, value, type) => {
    setFormData((prev) => ({ ...prev, [fieldId]: value }));

    if (type === "media" && value) {
      setMediaPreviews((prev) => ({
        ...prev,
        [fieldId]: URL.createObjectURL(value),
      }));
    }
  };

  const handleSubmit = () => {
    const newErrors = {};
    template.sections?.forEach((section) => {
      section.fieldsConfig?.forEach((field) => {
        if (field.isRequired === "true" && !formData[field._id]) {
          newErrors[field._id] = `${field.title} is required`;
        }
      });
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error("Please fix the errors before submitting");
      return;
    }

    console.log("Form Submitted:", formData);
    toast.success("Form submitted successfully!");
  };

  if (!template) return <p>Loading template...</p>;

  return (
    <div className="page-content">
      <Container fluid>
        <Card>
          <CardBody>
            <h4 className="mb-4">{template.title} Form</h4>

         {template.sections?.map((section) => (
  <div key={section._id} className="mb-4">
    <h5>{section.name}</h5>
    <Row>
      {section.fieldsConfig?.map((field) => (
        <Col md="6" key={field._id} className="mb-3">
          <Label>{field.title}</Label>

          {/* Short text */}
          {field.type === "text_short" && (
            <Input
              type="text"
              value={formData[field._id]}
              onChange={(e) => handleChange(field._id, e.target.value)}
              placeholder={`Enter ${field.title}`}
            />
          )}

        
          {/* Textarea (legacy) */}
          {field.type === "text_long" && (
            <Input
              type="textarea"
              value={formData[field._id]}
              onChange={(e) => handleChange(field._id, e.target.value)}
              placeholder={`Enter ${field.title}`}
            />
          )}

          {/* Date */}
          {field.type === "date" && (
            <Input
              type="date"
              value={formData[field._id]}
              onChange={(e) => handleChange(field._id, e.target.value)}
            />
          )}
 {/* Date */}
          {field.type === "url" && (
            <Input
              type="url"
              value={formData[field._id]}
              onChange={(e) => handleChange(field._id, e.target.value)}
            />
          )}
          {/* Media / file */}
          {field.type === "media" && (
            <>
              <Input
                type="file"
                onChange={(e) =>
                  handleChange(field._id, e.target.files[0], "media")
                }
              />
              {mediaPreviews[field._id] && (
                <img
                  src={mediaPreviews[field._id]}
                  alt="Preview"
                  style={{
                    marginTop: 8,
                    width: 100,
                    height: 100,
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              )}
            </>
          )}

          {/* Validation errors */}
          {errors[field._id] && (
            <div className="text-danger mt-1">{errors[field._id]}</div>
          )}
        </Col>
      ))}
    </Row>
  </div>
))}

            <Button color="primary" onClick={handleSubmit}>
              Submit
            </Button>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Template;
