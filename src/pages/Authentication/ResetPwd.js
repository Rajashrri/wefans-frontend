import React from "react";
import {
  Row,
  Col,
  Input,
  Button,
  Alert,
  Container,
  Label,
} from "reactstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik } from "formik";
import * as Yup from "yup";

import logodark from "../../assets/images/diigii.webp";
import logolight from "../../assets/images/diigii.webp";

const ResetPasswordPage = () => {
  const navigate = useNavigate();

  const initialValues = {
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const email = localStorage.getItem("forgotOtpEmail"); // Email from previous step
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password: values.password,
          }),
        }
      );

      const res_data = await response.json();

      if (response.ok && res_data.success) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        setErrors({ submit: res_data.message || "Failed to reset password" });
      }
    } catch (error) {
      setErrors({ submit: "Server error. Please try again later." });
    }
    setSubmitting(false);
  };

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col lg={4}>
          <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
            <div className="w-100">
              <Row className="justify-content-center">
                <Col lg={9}>
                  <div className="text-center">
                    <Link to="/">
                      <img
                        src={logodark}
                        height="35"
                        className="auth-logo logo-dark mx-auto"
                        alt="dark"
                      />
                      <img
                        src={logolight}
                        height="35"
                        className="auth-logo logo-light mx-auto"
                        alt="light"
                      />
                    </Link>
                    <h4 className="font-size-18 mt-4">Reset Password</h4>
                    <p className="text-muted">Enter your new password.</p>
                  </div>

                  <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                  >
                    {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                    }) => (
                      <form className="form-horizontal" onSubmit={handleSubmit}>
                        <div className="auth-form-group-custom mb-4">
                          <i className="ri-lock-2-line auti-custom-input-icon"></i>
                          <Label htmlFor="password">New Password</Label>
                          <Input
                            type="password"
                            name="password"
                            placeholder="Enter new password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          {touched.password && errors.password && (
                            <small className="text-danger">{errors.password}</small>
                          )}
                        </div>

                        <div className="auth-form-group-custom mb-4">
                          <i className="ri-lock-2-line auti-custom-input-icon"></i>
                          <Label htmlFor="confirmPassword">Confirm Password</Label>
                          <Input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm new password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.confirmPassword}
                          />
                          {touched.confirmPassword && errors.confirmPassword && (
                            <small className="text-danger">{errors.confirmPassword}</small>
                          )}
                        </div>

                        <div className="mt-4 text-center">
                          <Button
                            color="primary"
                            className="w-md"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Reset Password
                          </Button>
                        </div>

                        {errors.submit && (
                          <div className="mt-2 text-danger text-center">
                            {errors.submit}
                          </div>
                        )}
                      </form>
                    )}
                  </Formik>

                  <div className="mt-5 text-center">
                    <p>
                      <Link to="/login" className="fw-medium text-primary">
                        Back to Login
                      </Link>
                    </p>
                    <p>
                      © {new Date().getFullYear()}{" "}
                      <a
                        href="https://www.digihost.in/"
                        target="_blank"
                        rel="noreferrer"
                      >
                        We Fans 
                      </a>
                      .
                    </p>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </Col>

        <Col lg={8}>
          <div className="authentication-bg">
            <div className="bg-overlay"></div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ResetPasswordPage;
