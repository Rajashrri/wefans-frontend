import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getSectionTemplateById,saveTemplateData  } from "../../api/TemplateApi";
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
  const { id,celebId } = useParams();
  const [template, setTemplate] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [mediaPreviews, setMediaPreviews] = useState({});
console.log("Celebrity ID:", celebId);
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

const handleSubmit = async () => {
  const newErrors = {};
  const sectionData = {};

  // ✅ Collect section-wise form data
  template.sections?.forEach((section) => {
    const fields = {};
    section.fieldsConfig?.forEach((field) => {
      if (field.isRequired === "true" && !formData[field._id]) {
        newErrors[field._id] = `${field.title} is required`;
      }
      fields[field.title] = formData[field._id] || "";
    });
    sectionData[section.name.toLowerCase()] = fields;
  });

  // ✅ Validation
  if (Object.keys(newErrors).length > 0) {
    setErrors(newErrors);
    toast.error("Please fix the errors before submitting");
    return;
  }

  try {
    // ✅ Prepare FormData (handles text + files)
    const formDataToSend = new FormData();
    formDataToSend.append("celebId", celebId);
    formDataToSend.append("templateId", id);

    // Loop through section data and append
    Object.entries(sectionData).forEach(([sectionName, fields]) => {
      Object.entries(fields).forEach(([fieldName, value]) => {
        if (value instanceof File) {
          // media field (file)
          formDataToSend.append(`${sectionName}.${fieldName}`, value);
        } else if (Array.isArray(value)) {
          // multiple select
          value.forEach((v) =>
            formDataToSend.append(`${sectionName}.${fieldName}[]`, v)
          );
        } else {
          // text, date, url, single select
          formDataToSend.append(`${sectionName}.${fieldName}`, value);
        }
      });
    });

    // ✅ Call your separate API function
    const result = await saveTemplateData(formDataToSend);

    if (result.success) {
      toast.success("Data saved successfully!");
      console.log("Saved data:", result);
    } else {
      toast.error(result.msg || "Failed to save data");
    }
  } catch (err) {
    console.error("Error submitting template:", err);
    toast.error("Error saving data");
  }
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
                          onChange={(e) =>
                            handleChange(field._id, e.target.value)
                          }
                          placeholder={`Enter ${field.title}`}
                        />
                      )}

                      {/* Textarea (legacy) */}
                      {field.type === "text_long" && (
                        <Input
                          type="textarea"
                          value={formData[field._id]}
                          onChange={(e) =>
                            handleChange(field._id, e.target.value)
                          }
                          placeholder={`Enter ${field.title}`}
                        />
                      )}

                      {/* Date */}
                      {field.type === "date" && (
                        <Input
                          type="date"
                          value={formData[field._id]}
                          onChange={(e) =>
                            handleChange(field._id, e.target.value)
                          }
                        />
                      )}
                      {/* Date */}

                      {field.type === "Single Select" && (
                        <Input
                          type="select"
                          value={formData[field._id] || ""}
                          onChange={(e) =>
                            handleChange(field._id, e.target.value)
                          }
                        >
                          <option value="">Select {field.title}</option>
                          {field.options?.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.name || option.title || option.label}
                            </option>
                          ))}
                        </Input>
                      )}
                      {/* ✅ Multi Select */}
                      {field.type === "Multiple Select" && (
                        <Input
                          type="select"
                          multiple
                          value={formData[field._id] || []}
                          onChange={(e) => {
                            const selectedValues = Array.from(
                              e.target.selectedOptions,
                              (opt) => opt.value
                            );
                            handleChange(field._id, selectedValues);
                          }}
                        >
                          {field.options?.map((option) => (
                            <option key={option._id} value={option._id}>
                              {option.name || option.title || option.label}
                            </option>
                          ))}
                        </Input>
                      )}
                      {field.type === "url" && (
                        <Input
                          type="url"
                          value={formData[field._id]}
                          onChange={(e) =>
                            handleChange(field._id, e.target.value)
                          }
                        />
                      )}
                      {/* Media / file */}
                      {field.type === "media" && (
                        <>
                          <Input
                            type="file"
                            onChange={(e) =>
                              handleChange(
                                field._id,
                                e.target.files[0],
                                "media"
                              )
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
                        <div className="text-danger mt-1">
                          {errors[field._id]}
                        </div>
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
