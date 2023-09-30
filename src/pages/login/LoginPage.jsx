import { API_HOLIDAZE_URL } from "../../constants";
import { useState } from "react";
import * as storage from "../../components/auth/storage";
import { useNavigate, Link } from "react-router-dom";
import styles from "../../components/ui/Button.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const action = "/login";

export default function Login(profile) {
  const navigate = useNavigate();
  const refresh = () => window.location.reload(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onFormSubmit(event) {
    event.preventDefault();
    const body = {
      email,
      password,
    };

    const response = await fetch(`${API_HOLIDAZE_URL}/auth${action}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(body),
    });

    const { accessToken, ...user } = await response.json();

    storage.save("token", accessToken);
    storage.save("profile", user);

    if (response.status === 200) {
      navigate("/");
      refresh();
    } else {
      alert("Wrong email or password");
      storage.remove("token");
      storage.remove("profile");
    }
  }

  function onEmailChange(event) {
    setEmail(event.target.value);
  }
  function onPasswordChange(event) {
    setPassword(event.target.value);
  }

  return (
    <Container className="pt-4 pb-4 mt-4">
      <h1 className="text-center">Login to your account</h1>
      <Form onSubmit={onFormSubmit}>
        <Row xs={2} sm={2} lg={3} className="justify-content-center">
          <Form.Group>
            <Form.Control
              className="mt-4"
              name="email"
              value={email}
              onChange={onEmailChange}
              placeholder="Email address"
            />

            <Form.Control
              className="mt-3 mb-3"
              name="password"
              value={password}
              onChange={onPasswordChange}
              type="password"
              placeholder="Password"
            />

            <Button type="submit" className={styles.primary}>
              Login
            </Button>
          </Form.Group>
        </Row>
        <p className="pt-3 text-center">
          Don't have an account yet? Register{" "}
          <Link
            to="/registerPage"
            style={{ color: "#6B19CB", fontWeight: 600 }}
            className="registerlink"
          >
            here
          </Link>
        </p>
      </Form>
    </Container>
  );
}
