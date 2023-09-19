import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authFetch } from "../../components/auth/authFetch";
import { useNavigate } from "react-router-dom";
import styles from "../../components/ui/Button.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

const schema = yup
  .object({
    name: yup
      .string()
      .max(20, "Your name can be maximum 20 characters")
      .required("Please enter your full name"),
    email: yup
      .string()
      .matches(
        /^[\w\-.]+@(stud\.)?noroff\.no$/,
        "Only a stud.noroff.no email address can register"
      )
      .required(),
    avatar: yup.string(),
    password: yup
      .string()
      .min(8, "Your password must be at least 8 characters")
      .required("Please enter a password"),
    venuManager: yup.boolean(),
  })
  .required();

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  async function onSubmit(data) {
    const response = await authFetch(
      "https://api.noroff.dev/api/v1/holidaze/auth/register",
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    if (response.status === 201 || 204) {
      console.log(result);
      navigate("/loginPage");
      return result;
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <Container className="pt-4 pb-4">
      <h1 className="text-center">Register</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row xs={2} sm={2} lg={3} className="justify-content-center pt-3">
          <Form.Group>
            <Form.Control {...register("name")} placeholder="Name" />
            <p style={{ color: "red" }} className="pt-1">
              {errors.name?.message}
            </p>

            <Form.Control {...register("email")} placeholder="Email address" />
            <p style={{ color: "red" }} className="pt-1">
              {errors.email?.message}
            </p>

            <Form.Control {...register("avatar")} placeholder="Upload avatar" />
            <p style={{ color: "red" }} className="pt-1">
              {errors.avatar?.message}
            </p>

            <Form.Control
              {...register("password")}
              type="password"
              placeholder="Password"
            />
            <p style={{ color: "red" }} className="pt-1">
              {errors.password?.message}
            </p>
            <div className="mb-4 pt-2">
              <Form.Check
                type="checkbox"
                id="venueManager"
                className="me-2"
                {...register("venueManager")}
                label="I want to register as a venue manager"
              />
            </div>
            <Button type="submit" className={styles.primary}>
              Register
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
}
