import { API_HOLIDAZE_URL } from "../../constants";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { authFetch } from "../../components/auth/authFetch";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import styles from "../../components/ui/Button.module.css";

const action = "/profiles";

export default function AvatarChange(profileData) {
  const [avatar, setAvatar] = useState([]);
  let { name } = useParams();
  const navigate = useNavigate();

  async function onFormSubmit(event) {
    event.preventDefault();
    const profileData = {
      avatar,
    };

    const updateProfileURL = `${API_HOLIDAZE_URL}${action}/${name}/media`;

    const response = await authFetch(updateProfileURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "PUT",
      body: JSON.stringify(profileData),
    });
    const result = await response.json();
    if (response.status === 201 || 204) {
      navigate("/");
      return result;
    } else {
      alert("Something went wrong");
    }
  }

  function onAvatarChange(event) {
    setAvatar(event.target.value);
  }

  return (
    <Form onSubmit={onFormSubmit} className="mt-3 mb-3">
      <Row xs="auto" className="d-flex justify-content-center">
        <Col>
          <Form.Control
            size="sm"
            name="avatar"
            value={avatar}
            onChange={onAvatarChange}
            placeholder="Upload avatar"
          />
        </Col>
        <Col>
          <Button
            variant="secondary"
            type="submit"
            className={styles.secondary}
            size="sm"
          >
            Update
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
