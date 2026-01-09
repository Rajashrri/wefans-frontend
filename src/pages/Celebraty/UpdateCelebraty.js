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
import {
  getCelebratyById,
  updateCelebraty,
  getLanguageOptions,
  getProfessionsOptions,
  getSocialLinksOptions,
} from "../../api/celebratyApi";
import { useDropzone } from "react-dropzone";

const UpdateCelebraty = () => {
  const [breadcrumbItems] = useState([
    { title: "Dashboard", link: "#" },
    { title: "Update Celebraty", link: "#" },
  ]);

  const navigate = useNavigate();
  const { id } = useParams();

  const [galleryFiles, setGalleryFiles] = useState([]); // new gallery uploads
  const [oldGallery, setOldGallery] = useState([]); // existing gallery

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setGalleryFiles((prev) => [...prev, ...acceptedFiles]);
    },
    accept: { "image/*": [] },
    multiple: true,
  });

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    shortinfo: "",
    biography: "",
    image: null,
    old_image: "",
    languages: [],
    professions: [],
    socialLinks: [],
    statusnew: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [languagesOptions, setLanguageOptions] = useState([]);
  const [professionsOptions, setProfessionsOptions] = useState([]);
  const [socialLinksOptions, setSocialLinksOptions] = useState([]);

  // 📌 Fetch celebrity data
  const fetchCelebratyById = async () => {
    try {
      const res_data = await getCelebratyById(id);
      if (res_data.msg) {
        const data = res_data.msg;
        setFormData({
          name: data.name || "",
          slug: data.slug || "",
          shortinfo: data.shortinfo || "",
          statusnew: data.statusnew || "",
          professions: data.professions || [],
          languages: data.languages || [],
          biography: data.biography || "",
          old_image: data.image || "",
          socialLinks: data.socialLinks || [],
        });
        setOldGallery(data.gallery || []);
      } else {
        toast.error("Celebraty not found");
      }
    } catch (error) {
      console.error("Fetch Celebraty error:", error);
      toast.error("Failed to fetch Celebraty data");
    }
  };

  useEffect(() => {
    fetchCelebratyById();
    fetchLanguageOptions();
    fetchProfessionsOptions();
    fetchSocialLinksOptions();
  }, [id]);

  // 📌 Fetch dropdowns
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
 const handleInput = (e) => {
  const { name, value } = e.target;

  // Auto-generate slug when the user types the name
  if (name === "name") {
    const generatedSlug = value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric chars with hyphen
      .replace(/^-+|-+$/g, ""); // remove leading/trailing hyphens

    setFormData((prev) => ({
      ...prev,
      name: value,
      slug: generatedSlug,
    }));
  } else {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };
  const isValidSocialUrl = (url) => {
    if (!url || url.trim() === "") return true; // empty allowed

    // Must start with www. or include https://www.
    const pattern = /^(https?:\/\/)?(www\.)[a-zA-Z0-9_-]+(\.[a-z]{2,})(\/.*)?$/;
    return pattern.test(url.trim());
  };

  // 📌 Submit form
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
    if (!formData.statusnew) newErrors.statusnew = "Status is required";

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
        "professions",
        JSON.stringify(formData.professions)
      );
      formDataToSend.append("languages", JSON.stringify(formData.languages));
      formDataToSend.append(
        "socialLinks",
        JSON.stringify(formData.socialLinks)
      );

      if (selectedFile) formDataToSend.append("image", selectedFile);
if (formData.removeOldImage) formDataToSend.append("removeOldImage", "true");

      // ✅ include old gallery (keep existing)
      formDataToSend.append("oldGallery", JSON.stringify(oldGallery));

      // ✅ include new gallery files
      galleryFiles.forEach((file) => {
        formDataToSend.append("gallery", file);
      });

      const adminid = localStorage.getItem("adminid");
      formDataToSend.append("createdBy", adminid);

      const result = await updateCelebraty(id, formDataToSend);

      if (!result.status) {
        toast.error(result.msg || "Failed to update Celebraty.");
        return;
      }

      toast.success("Celebraty Updated Successfully");
      navigate("/celebrity-list");
    } catch (err) {
      console.error("Update Celebraty Error:", err);
      toast.error("Something went wrong while updating Celebraty.");
    }
  };

  return (
    <div className="page-content">
      <Container fluid>
        <Breadcrumbs
          title="UPDATE Celebraty"
          breadcrumbItems={breadcrumbItems}
        />
        <Row>
          <Col xl="12">
            <Card>
              <CardBody>
                <form onSubmit={handleAddSubmit}>
                  <Row>
                    {/* NAME */}
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

                    {/* SLUG */}
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

                    {/* PROFILE IMAGE */}
                    <Col md="6">
                      <Label>Profile Image</Label>
                      <Input
                        type="file"
                        name="image"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                     {formData.old_image && (
  <div className="mt-2 position-relative d-inline-block">
    <img
      src={`${process.env.REACT_APP_API_BASE_URL}/celebraty/${formData.old_image}`}
      alt="Main"
      width="100"
      className="rounded border"
    />
    <button
      type="button"
      onClick={() =>
        setFormData((prev) => ({
          ...prev,
          old_image: "", // remove preview
          removeOldImage: true, // mark as removed
        }))
      }
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

                    </Col>

                    {/* GALLERY */}
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

                      {/* ✅ Old Gallery Preview */}
                      {oldGallery.length > 0 && (
                        <div className="mt-3 d-flex flex-wrap gap-3">
                          {oldGallery.map((file, idx) => (
                            <div
                              key={`old-${idx}`}
                              className="position-relative"
                              style={{ width: 100, height: 100 }}
                            >
                              <img
                                src={`${process.env.REACT_APP_API_BASE_URL}/celebraty/${file}`}
                                alt={`gallery-${idx}`}
                                style={{
                                  width: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                  borderRadius: 8,
                                  border: "1px solid #ddd",
                                }}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setOldGallery((prev) =>
                                    prev.filter((_, i) => i !== idx)
                                  )
                                }
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
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* ✅ New Gallery Preview */}
                      {galleryFiles.length > 0 && (
                        <div className="mt-3 d-flex flex-wrap gap-3">
                          {galleryFiles.map((file, idx) => (
                            <div
                              key={`new-${idx}`}
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
                                }}
                              >
                                ×
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </Col>

                    {/* OTHER FIELDS */}
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

                    <Col md="6">
                      <Label>Professions</Label>
                      <Select
                        isMulti
                        options={professionsOptions}
                        value={professionsOptions.filter((opt) =>
                          formData.professions.includes(opt.value)
                        )}
                        onChange={(selected) =>
                          setFormData((prev) => ({
                            ...prev,
                            professions: selected.map((opt) => opt.value),
                          }))
                        }
                        placeholder="Select Professions"
                      />
                    </Col>

                    <Col md="6">
                      <Label>Languages</Label>
                      <Select
                        isMulti
                        options={languagesOptions}
                        value={languagesOptions.filter((opt) =>
                          formData.languages.includes(opt.value)
                        )}
                        onChange={(selected) =>
                          setFormData((prev) => ({
                            ...prev,
                            languages: selected.map((opt) => opt.value),
                          }))
                        }
                        placeholder="Select Languages"
                      />
                    </Col>

                    <Col md="6">
                      <Label>Status</Label>
                      <Input
                        type="select"
                        name="statusnew"
                        value={formData.statusnew}
                        onChange={handleInput}
                      >
                        <option value="">Select</option>
                        <option value="Draft">Draft</option>
                        <option value="In Review">In Review</option>
                        <option value="Published">Published</option>
                        <option value="Archived">Archived</option>
                      </Input>
                    </Col>

                    {/* ✅ SOCIAL LINKS */}
                    <Col md="12" className="mt-3">
                      <Label>Social Links</Label>

                      {formData.socialLinks.map((item, index) => (
                        <Row key={index} className="align-items-center mb-2">
                          {/* Select Social Platform */}
                          <Col md="4">
                            <Select
                              options={socialLinksOptions}
                              value={socialLinksOptions.find(
                                (opt) => opt.value === item.platform
                              )}
                              onChange={(selected) => {
                                const updated = [...formData.socialLinks];
                                updated[index].platform = selected.value;
                                updated[index].name = selected.label;
                                updated[index].url = selected.url;
                                setFormData((prev) => ({
                                  ...prev,
                                  socialLinks: updated,
                                }));
                              }}
                              placeholder="Select Social Platform"
                            />
                          </Col>

                          {/* URL Input with Validation */}
                          <Col md="6">
                            <Input
                              type="text"
                              placeholder="Enter custom URL (e.g. www.facebook.com)"
                              value={item.customUrl || ""}
                              onChange={(e) => {
                                const value = e.target.value;
                                const updated = [...formData.socialLinks];
                                updated[index].customUrl = value;

                                // ✅ Validate on change
                                const newErrors = [
                                  ...(errors.socialLinks || []),
                                ];
                                newErrors[index] = isValidSocialUrl(value)
                                  ? ""
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

                            {/* Inline Error */}
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

                          {/* Remove Button */}
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

                      {/* Add New Social Link */}
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
                    Update Celebraty
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

export default UpdateCelebraty;
