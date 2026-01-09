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
import "flatpickr/dist/themes/material_blue.css";
import Flatpickr from "react-flatpickr";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  getLanguageOptions,
  getProfessionsOptions,
  addCelebraty,
  getSocialLinksOptions,
} from "../../api/celebratyApi";
import { useNavigate } from "react-router-dom";

import { useDropzone } from "react-dropzone";

const AddCelebraty = () => {
  const [breadcrumbItems] = useState([
    { title: "Dashboard", link: "#" },
    { title: "Add Celebraty", link: "#" },
  ]);
  const [galleryFiles, setGalleryFiles] = useState([]);
  const navigate = useNavigate();
  const [socialLinksOptions, setSocialLinksOptions] = useState([]);

  const onDrop = (acceptedFiles) => {
    setGalleryFiles((prev) => [...prev, ...acceptedFiles]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    shortinfo: "",
    biography: "",
    image: "",
    languages: [], // ✅ initialize as empty arrays
    professions: [], // ✅ initialize as empty arrays
    statusnew: "Draft", // ✅ Default value
    socialLinks: [], // ✅ added
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [languagesOptions, setLanguageOptions] = useState([]);
  const [professionsOptions, setProfessionsOptions] = useState([]);

  useEffect(() => {
    fetchLanguageOptions();
    fetchProfessionsOptions();
    fetchSocialLinksOptions(); // ✅ added
  }, []);

  const fetchSocialLinksOptions = async () => {
    try {
      const data = await getSocialLinksOptions();
      const options = (data.msg || []).map((item) => ({
        value: item._id,
        label: item.name?.trim() || item.name,
        url: item.url || "",
      }));
      setSocialLinksOptions(options);
    } catch (err) {
      console.error("Error fetching social link options:", err);
    }
  };
  const fetchLanguageOptions = async () => {
    try {
      const data = await getLanguageOptions();
      const options = (data.msg || []).map((item) => ({
        value: item._id,
        label: item.name?.trim() || item.name,
      }));
      setLanguageOptions(options);
    } catch (err) {
      console.error("Error fetching language options:", err);
    }
  };

  const isValidSocialUrl = (url) => {
    if (!url || url.trim() === "") return true; // optional field = valid

    // Must start with www. or have http/https and www.
    const pattern = /^(https?:\/\/)?(www\.)[a-zA-Z0-9_-]+(\.[a-z]{2,})(\/.*)?$/;
    return pattern.test(url.trim());
  };

  const validateAndFormatUrl = (inputUrl) => {
    if (!inputUrl) return ""; // Empty allowed

    let url = inputUrl.trim();

    // Auto prepend https:// if user starts with "www."
    if (url.startsWith("www.")) {
      url = "https://" + url;
    }

    // Auto prepend https:// if missing protocol
    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    try {
      new URL(url); // will throw if invalid
      return url;
    } catch (e) {
      return null; // invalid URL
    }
  };

  const fetchProfessionsOptions = async () => {
    try {
      const data = await getProfessionsOptions();
      const options = (data.msg || []).map((item) => ({
        value: item._id,
        label: item.name?.trim() || item.name,
      }));
      setProfessionsOptions(options);
    } catch (err) {
      console.error("Error fetching profession options:", err);
    }
  };
  const handleInput = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      const generatedSlug = value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with hyphen
        .replace(/^-+|-+$/g, ""); // remove leading/trailing hyphens

      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: generatedSlug, // auto-fill slug from name
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleDateChange = (selectedDates, name) => {
    const formattedDate = selectedDates[0].toISOString().split("T")[0];
    setFormData((prev) => ({ ...prev, [name]: formattedDate }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.slug) newErrors.slug = "Slug is required";
    if (!formData.shortinfo) newErrors.shortinfo = "Short Intro is required";
    if (!formData.biography) newErrors.biography = "Biography is required";
    if (!formData.professions?.length)
      newErrors.professions = "Professions are required";
    if (!formData.languages?.length)
      newErrors.languages = "Languages are required";
    if (!formData.statusnew) newErrors.statusnew = "Status is required"; // ✅ fixed typo (was ststusnew)

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("slug", formData.slug);
      formDataToSend.append("shortinfo", formData.shortinfo);
      formDataToSend.append("biography", formData.biography);
      formDataToSend.append("statusnew", formData.statusnew);
      formDataToSend.append(
        "socialLinks",
        JSON.stringify(formData.socialLinks)
      );

      formDataToSend.append(
        "professions",
        JSON.stringify(formData.professions)
      );
      formDataToSend.append("languages", JSON.stringify(formData.languages));

      if (selectedFile) {
        formDataToSend.append("image", selectedFile);
      }
      // ✅ Append multiple gallery images
      if (galleryFiles.length > 0) {
        galleryFiles.forEach((file) => {
          formDataToSend.append("gallery", file);
        });
      }

      const adminid = localStorage.getItem("adminid");
      formDataToSend.append("createdBy", adminid);

      // ✅ Use API function instead of direct fetch
      const result = await addCelebraty(formDataToSend);

      if (!result.status) {
        toast.error(result.msg || "Failed to add celebraty.");
        return;
      }

      toast.success("Celebraty Added Successfully");
      navigate("/celebrity-list");
      // Reset form
      setFormData({
        name: "",
        slug: "",
        shortinfo: "",
        biography: "",
        image: "",
        languages: [],
        professions: [],
        statusnew: "Draft", // ✅ Default value
        previewImage: "", // ✅ clear preview after successful submit
      });
      setSelectedFile(null);
      setGalleryFiles([]);
      setErrors({});
    } catch (err) {
      console.error("Add celebraty Error:", err);
      toast.error("Something went wrong while adding celebraty.");
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs title="ADD Celebraty" breadcrumbItems={breadcrumbItems} />
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <form onSubmit={handleAddSubmit}>
                  <Row>
                    <Col md="6">
                      <Label>Name</Label>
                      <Input
                        name="name"
                        value={formData.name}
                        onChange={handleInput}
                        placeholder="Name"
                        type="text"
                      />
                      {errors.name && (
                        <span className="text-danger">{errors.name}</span>
                      )}
                    </Col>
                    <Col md="6">
                      <Label>Slug</Label>
                      <Input
                        name="slug"
                        value={formData.slug}
                        onChange={handleInput}
                        placeholder="Slug"
                        type="text"
                      />
                      {errors.slug && (
                        <span className="text-danger">{errors.slug}</span>
                      )}
                    </Col>

                    <Col md="6">
                      <div className="mb-3">
                        <Label className="form-label">Profile Image</Label>
                        <Input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                              setSelectedFile(file);
                              // ✅ Show instant preview
                              setFormData((prev) => ({
                                ...prev,
                                previewImage: URL.createObjectURL(file),
                              }));
                            }
                          }}
                        />

                        {/* ✅ Preview newly selected image */}
                        {formData.previewImage && (
                          <div className="mt-2 position-relative d-inline-block">
                            <img
                              src={formData.previewImage}
                              alt="Preview"
                              width="100"
                              className="rounded border"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedFile(null);
                                setFormData((prev) => ({
                                  ...prev,
                                  previewImage: "",
                                }));
                              }}
                              style={{
                                position: "absolute",
                                top: "-8px",
                                right: "-8px",
                                background: "red",
                                color: "white",
                                border: "none",
                                borderRadius: "50%",
                                width: "22px",
                                height: "22px",
                                cursor: "pointer",
                              }}
                              title="Remove Image"
                            >
                              ×
                            </button>
                          </div>
                        )}
                      </div>
                    </Col>

                    <Col md="12">
                      <Label className="form-label">Gallery Images</Label>

                      <div
                        {...getRootProps()}
                        className={`border border-dashed p-4 text-center rounded bg-light ${
                          isDragActive ? "bg-primary bg-opacity-10" : ""
                        }`}
                        style={{ cursor: "pointer" }}
                      >
                        <input {...getInputProps()} />
                        {isDragActive ? (
                          <p className="mb-0 text-primary fw-bold">
                            Drop images here...
                          </p>
                        ) : (
                          <p className="mb-0 text-muted">
                            Drag & drop images here, or{" "}
                            <strong>click to select</strong>
                          </p>
                        )}
                      </div>

                      {/* ✅ Preview selected gallery images */}
                      {galleryFiles.length > 0 && (
                        <div className="mt-3 d-flex flex-wrap gap-3">
                          {galleryFiles.map((file, idx) => (
                            <div
                              key={idx}
                              className="position-relative"
                              style={{ width: 100, height: 100 }}
                            >
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`gallery-${idx}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: 8,
                                  border: "1px solid #ddd",
                                }}
                              />
                              {/* ❌ Remove Button */}
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setGalleryFiles((prev) =>
                                    prev.filter((_, i) => i !== idx)
                                  );
                                }}
                                style={{
                                  position: "absolute",
                                  top: -8,
                                  right: -8,
                                  background: "red",
                                  color: "white",
                                  border: "none",
                                  borderRadius: "50%",
                                  width: 22,
                                  height: 22,
                                  cursor: "pointer",
                                  fontSize: 12,
                                  lineHeight: "20px",
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </Col>

                    <Col md="12">
                      <Label>Short Intro</Label>
                      <Input
                        type="textarea"
                        name="shortinfo"
                        value={formData.shortinfo}
                        onChange={handleInput}
                        placeholder="Short Intro"
                      />
                    </Col>
                    {errors.shortinfo && (
                      <span className="text-danger">{errors.shortinfo}</span>
                    )}

                    <Col md="12">
                      <Label>Biography</Label>
                      <Input
                        type="textarea"
                        name="biography"
                        value={formData.biography}
                        onChange={handleInput}
                        placeholder="Biography"
                      />
                    </Col>
                    {errors.biography && (
                      <span className="text-danger">{errors.biography}</span>
                    )}

                    <Col md="6">
                      <Label>Professions</Label>
                      <Select
                        isMulti
                        name="professions"
                        options={professionsOptions}
                        value={professionsOptions.filter((opt) =>
                          formData.professions.includes(opt.value)
                        )}
                        onChange={(selectedOptions) =>
                          setFormData((prev) => ({
                            ...prev,
                            professions: selectedOptions.map(
                              (opt) => opt.value
                            ),
                          }))
                        }
                        placeholder="Choose..."
                      />
                      {errors.professions && (
                        <span className="text-danger">
                          {errors.professions}
                        </span>
                      )}
                    </Col>

                    <Col md="6">
                      <Label>Languages</Label>
                      <Select
                        isMulti
                        name="languages"
                        options={languagesOptions}
                        value={languagesOptions.filter((opt) =>
                          formData.languages.includes(opt.value)
                        )}
                        onChange={(selectedOptions) =>
                          setFormData((prev) => ({
                            ...prev,
                            languages: selectedOptions.map((opt) => opt.value),
                          }))
                        }
                        placeholder="Choose..."
                      />
                      {errors.languages && (
                        <span className="text-danger">{errors.languages}</span>
                      )}
                    </Col>

                    <Col md="6">
                      <Label>Status</Label>
                      <Input
                        type="select"
                        name="statusnew"
                        onChange={handleInput}
                        value={formData.statusnew}
                      >
                        <option value="">Select</option>
                        <option value="Draft">Draft</option>
                        <option value="In Review">In Review</option>
                        <option value="Published">Published</option>
                        <option value="Archived">Archived</option>
                      </Input>
                      {errors.statusnew && (
                        <span className="text-danger">{errors.statusnew}</span>
                      )}
                    </Col>

                    <Col md="12" className="mt-3">
                      <Label>Social Links</Label>
                      {formData.socialLinks.map((item, index) => (
                        <Row key={index} className="align-items-center mb-2">
                          <Col md="4">
                            <Select
                              options={socialLinksOptions}
                              value={socialLinksOptions.find(
                                (opt) => opt.value === item.platform
                              )}
                              onChange={(selected) => {
                                const updated = [...formData.socialLinks];
                                updated[index].platform = selected.value;
                                setFormData((prev) => ({
                                  ...prev,
                                  socialLinks: updated,
                                }));
                              }}
                              placeholder="Select Social Platform"
                            />
                          </Col>

                          <Col md="6">
                            <Input
                              type="text"
                              placeholder="Enter custom URL (e.g. www.facebook.com)"
                              value={item.customUrl || ""}
                              onChange={(e) => {
                                const updated = [...formData.socialLinks];
                                updated[index].customUrl = e.target.value;

                                // ✅ Real-time validation
                                const urlValid = isValidSocialUrl(
                                  e.target.value
                                );
                                const newErrors = [
                                  ...(errors.socialLinks || []),
                                ];
                                newErrors[index] = urlValid
                                  ? "" // ✅ Clear error
                                  : "Please enter a valid URL starting with www.";

                                setErrors((prev) => ({
                                  ...prev,
                                  socialLinks: newErrors,
                                }));
                                setFormData((prev) => ({
                                  ...prev,
                                  socialLinks: updated,
                                }));
                              }}
                            />
                            {/* ✅ Inline error message */}
                            {errors.socialLinks?.[index] && (
                              <div
                                style={{
                                  color: "red",
                                  fontSize: "0.8rem",
                                  marginTop: "4px",
                                }}
                              >
                                {errors.socialLinks[index]}
                              </div>
                            )}
                          </Col>

                          <Col md="2">
                            <Button
                              color="danger"
                              type="button"
                              onClick={() => {
                                const updated = formData.socialLinks.filter(
                                  (_, i) => i !== index
                                );
                                const updatedErrors = (
                                  errors.socialLinks || []
                                ).filter((_, i) => i !== index);
                                setFormData((prev) => ({
                                  ...prev,
                                  socialLinks: updated,
                                }));
                                setErrors((prev) => ({
                                  ...prev,
                                  socialLinks: updatedErrors,
                                }));
                              }}
                            >
                              ×
                            </Button>
                          </Col>
                        </Row>
                      ))}

                      <Button
                        color="secondary"
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            socialLinks: [
                              ...prev.socialLinks,
                              { platform: "", customUrl: "" },
                            ],
                          }))
                        }
                      >
                        + Add Social Link
                      </Button>
                    </Col>
                  </Row>

                  <Button type="submit" color="primary" className="mt-3">
                    Add Celebraty
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

export default AddCelebraty;
