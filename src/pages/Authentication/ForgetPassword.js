import React, { useEffect } from "react";
import {
  Row,
  Col,
  Alert,
  Button,
  Container,
  Label,
  Input,
  Form,
} from "reactstrap";
import { useForm, Controller } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import logodark from "../../assets/images/diigii.webp";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.body.classList.add("auth-body-bg");
    return () => {
      document.body.classList.remove("auth-body-bg");
    };
  }, []);

  const onSubmit = async (data) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: data.email }),
        }
      );

      const res_data = await response.json();

      if (response.ok) {
        // Store email for OTP verification
        localStorage.setItem("forgotOtpEmail", res_data.email);

        toast.success("OTP Sucesssfully generated...");
        navigate("/forgot-otp"); // Redirect to OTP page
      } else {
        toast.error(res_data.message || "Error generating OTP");
      }
    } catch (error) {
      toast.error("Server error. Please try again later.");
    }
  };

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col lg={4}>
          <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
            <div className="w-100">
              <Row className="justify-content-center">
                <Col lg={9}>
                  <div>
                    <div className="text-center">
                      <Link to="/" className="logo">
                        <img src={logodark} height="35" alt="logo" />
                      </Link>
                      <h4 className="font-size-18 mt-4">Reset Password</h4>
                      <p className="text-muted">Enter your email to get OTP.</p>
                    </div>

                    <div className="p-2 mt-5">
                      <Form onSubmit={handleSubmit(onSubmit)}>
                        <div className="auth-form-group-custom mb-4">
                          <i className="ri-mail-line auti-custom-input-icon"></i>
                          <Label htmlFor="useremail">Email</Label>
                          <Controller
                            name="email"
                            control={control}
                            rules={{
                              required: "Email is required",
                              pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Invalid email address",
                              },
                            }}
                            render={({ field }) => (
                              <Input
                                {...field}
                                type="email"
                                id="useremail"
                                placeholder="Enter your email"
                                invalid={!!errors.email}
                              />
                            )}
                          />
                          {errors.email && (
                            <span className="text-danger">
                              {errors.email.message}
                            </span>
                          )}
                        </div>

                        <div className="mt-4 text-center">
                          <Button color="primary" className="w-md" type="submit">
                            Generate OTP
                          </Button>
                        </div>
                      </Form>
                    </div>

                    <div className="mt-5 text-center">
                      <p>
                        Remembered your password?{" "}
                        <Link to="/login" className="fw-medium text-primary">
                          Log in
                        </Link>
                      </p>
                      <p>
                        © {new Date().getFullYear()}{" "}
                        <a href="#" target="_blank" rel="noreferrer">
                          We Fans  
                        </a>
                        .
                      </p>
                    </div>
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

export default ForgotPasswordPage;
