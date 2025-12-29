import React, { Component } from "react";
import {
  Row,
  Col,
  Alert,
  Button,
  Container,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { Link, Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

// images
import logodark from "../../assets/images/logo-dark.png";
import logolight from "../../assets/images/logo-light.png";

class VerifyOtpPage extends Component {
  constructor(props) {
    super(props);
    this.formRef = React.createRef();
  }

  handleSubmit = async (data) => {
    try {
      const email = localStorage.getItem("otpemail");

      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/api/auth/verify-otp`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp: data.otp }),
        }
      );

      const res_data = await response.json();

      if (response.ok && res_data.success) {
        localStorage.setItem("token", res_data.token);
        localStorage.setItem("adminid", res_data.user.id);
        localStorage.setItem("role_name", res_data.user.role_name);
        localStorage.setItem("email", res_data.user.email);
        localStorage.setItem("role_id", res_data.user.role_id);

        toast.success("OTP verified successfully!");
        window.location.href = "/dashboard"; // redirect after success
      } else {
        toast.error(res_data.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("OTP verification error:", error);
      toast.error("Server error! Please try again later.");
    }
  };

  render() {
    const { register, handleSubmit, errors } = this.props.formMethods;

    return (
      <React.Fragment>
        <div>
          <Container fluid className="p-0">
            <Row className="g-0">
              <Col lg={4}>
                <div className="authentication-page-content p-4 d-flex align-items-center min-vh-100">
                  <div className="w-100">
                    <Row className="justify-content-center">
                      <Col lg={9}>
                        <div>
                          <div className="text-center">
                            <div>
                              <Link to="/" className="logo">
                                <img
                                  src={logodark}
                                  height="20"
                                  alt="logo"
                                  className="logo-dark-element"
                                />
                                <img
                                  src={logolight}
                                  height="20"
                                  alt="logo"
                                  className="logo-light-element"
                                />
                              </Link>
                            </div>
                            <h4 className="font-size-18 mt-4">
                              OTP Verification
                            </h4>
                            <p className="text-muted">
                              Enter the OTP sent to your registered email.
                            </p>
                          </div>

                          <div className="p-2 mt-5">
                            <Alert color="info" className="mb-4 text-center">
                              Please check your email for the 6-digit OTP.
                            </Alert>

                            <form
                              ref={this.formRef}
                              onSubmit={handleSubmit(this.handleSubmit)}
                              className="form-horizontal"
                            >
                              <FormGroup className="auth-form-group-custom mb-4">
                                <i className="ri-lock-2-line auti-custom-input-icon"></i>
                                <Label for="otp">OTP</Label>
                                <Input
                                  type="text"
                                  id="otp"
                                  placeholder="Enter 6-digit OTP"
                                  name="otp"
                                  maxLength={6}
                                  innerRef={register({
                                    required: "OTP is required",
                                    pattern: {
                                      value: /^[0-9]{6}$/,
                                      message: "Enter a valid 6-digit OTP",
                                    },
                                  })}
                                  className="form-control"
                                />
                                {errors.otp && (
                                  <small className="text-danger">
                                    {errors.otp.message}
                                  </small>
                                )}
                              </FormGroup>

                              <div className="mt-4 text-center">
                                <Button
                                  color="primary"
                                  className="w-md waves-effect waves-light"
                                  type="submit"
                                >
                                  {this.props.loading
                                    ? "Verifying..."
                                    : "Verify OTP"}
                                </Button>
                              </div>
                            </form>
                          </div>

                          <div className="mt-5 text-center">
                            <p>
                              Didn’t get the OTP?{" "}
                              <Link
                                to="#"
                                className="fw-medium text-primary"
                                onClick={() =>
                                  toast.info("Resend OTP functionality coming soon")
                                }
                              >
                                Resend
                              </Link>
                            </p>
                            <p>
                              © {new Date().getFullYear()} Nazox. Crafted with{" "}
                              <i className="mdi mdi-heart text-danger"></i> by
                              Themesdesign
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
        </div>
      </React.Fragment>
    );
  }
}

const VerifyOtpWrapper = (props) => {
  const formMethods = useForm();
  return <VerifyOtpPage {...props} formMethods={formMethods} />;
};

export default VerifyOtpWrapper;
