import { useState } from "react";
import { Button, Form, Spinner, Toast, ToastContainer } from "react-bootstrap";
import { Link } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";

function SignupForm() {
  const [validated, setValidated] = useState(false);
  const [Data, setData] = useState({
    formName: "",
    formUsername: "",
    formEmail: "",
    formPassword: "",
  });
  const [toast, setToast] = useState(false);
  const { register, isLoading, sessionVerified } = useAuthContext();

  const handleChange = (event) => {
    const { id, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setValidated(true);
    await register({
      name: Data.formName,
      username: Data.formUsername,
      email: Data.formEmail,
      password: Data.formPassword,
    });

    if (!sessionVerified) {
      setToast(true);
      return;
    }

    setData({
      formName: "",
      formUsername: "",
      formEmail: "",
      formPassword: "",
    });
  };

  return (
    <div className="d-flex justify-content-center align-items-center flex-column w-100 w-sm-50">
      <img src="/assets/images/logo.svg" alt="logo" />

      <h2 className="fs-3 fs-md-2 fw-bold lh-base pt-5 pt-sm-12 font-monospace">
        Create a new account
      </h2>
      <p className="fs-6 fs-md-5 text-secondary-emphasis fw-medium lh-base mt-2">
        To use vibewave, Please enter your details
      </p>

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="d-flex flex-column w-50 mt-4"
        method="POST"
      >
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            min="2"
            max="50"
            value={Data.name}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid name.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            min="2"
            max="50"
            value={Data.username}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid username.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            min="2"
            max="50"
            value={Data.email}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            min="8"
            max="50"
            value={Data.password}
            onChange={handleChange}
            required
          />
          <Form.Control.Feedback type="invalid">
            Please provide a strong password.
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="purple-500" type="submit" disabled={isLoading}>
          {isLoading ? (
            <div className="d-flex justify-content-center align-items-center">
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
                className="me-2"
              />
              Loading...
            </div>
          ) : (
            "Sign up"
          )}
        </Button>
      </Form>

      <p className="fs-6 fw-medium lh-base text-secondary-emphasis text-center mt-4">
        Already have an account?
        <Link
          to="/sign-in"
          className="fs-6 text-indigo-500 lh-base fw-semibold ms-1"
        >
          Log in
        </Link>
      </p>
      <ToastContainer
        className="p-3"
        position="top-center"
        style={{ zIndex: 1 }}
      >
        <Toast
          show={toast}
          onClose={() => setToast(false)}
          bg="danger"
          className="mt-4"
        >
          <Toast.Header>
            <strong className="me-auto">Error</strong>
          </Toast.Header>
          <Toast.Body>
            Whoops! something went wrong, please try again.
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}

export default SignupForm;
