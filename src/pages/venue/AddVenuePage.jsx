import { API_HOLIDAZE_URL } from "../../constants";
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
import Col from "react-bootstrap/Col";

const action = "/venues";

const schema = yup
  .object({
    name: yup.string().required("Please enter a venue name"),
    description: yup.string().required("Please enter a description"),
    media: yup.string(),
    price: yup.number().required().typeError("Please enter a price"),
    maxGuests: yup
      .number()
      .integer()
      .required()
      .typeError("Max guests must be a number"),
    rating: yup.number(),
    meta: yup.object({
      wifi: yup.boolean(),
      parking: yup.boolean(),
      breakfast: yup.boolean(),
      pets: yup.boolean(),
    }),
    location: yup.object({
      address: yup.string(),
      city: yup.string(),
      zip: yup.string(),
      country: yup.string(),
      continent: yup.string(),
    }),
  })
  .required();

export default function AddVenue() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();

  async function onSubmit(data) {
    data.media = data.media.split(",");
    const response = await authFetch(`${API_HOLIDAZE_URL}${action}`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    const result = await response.json();
    if (response.status === 201 || 204) {
      navigate("/");
      return result;
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <Container className="pt-4 pb-4">
      <h1 className="text-center">Add venue</h1>
      <Form
        className="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        id="registerForm"
      >
        <Row xs={1} sm={1} lg={2} className="justify-content-center">
          <Form.Group>
            <Form.Control {...register("name")} placeholder="Venue name" />
            <p style={{ color: "red" }} className="pt-1">
              {errors.name?.message}
            </p>

            <p className="ps-2">Location</p>
            <Form.Control
              {...register("location.address")}
              type="location.address"
              placeholder="Address"
              className="mb-2"
            />

            <Form.Control
              {...register("location.zip")}
              type="location.zip"
              placeholder="Zip code"
              className="mb-2"
            />

            <Form.Control
              {...register("location.city")}
              type="location.city"
              placeholder="City"
              className="mb-2"
            />

            <Form.Control
              {...register("location.country")}
              type="location.country"
              placeholder="Country"
              className="mb-2"
            />

            <Form.Control
              {...register("location.continent")}
              type="location.continent"
              placeholder="Continent"
            />
            <hr className="mb-4 mt-4"></hr>

            <Form.Control
              {...register("description")}
              placeholder="Description"
            />
            <p style={{ color: "red" }} className="pt-1">
              {errors.description?.message}
            </p>

            <Form.Control
              type="url"
              {...register("media")}
              placeholder="Images"
              className="mb-2"
            />
            <Col xs={3}>
              <Form.Control
                {...register("maxGuests")}
                type="maxGuests"
                placeholder="Max guests"
              />
            </Col>
            <p style={{ color: "red" }} className="pt-1">
              {errors.maxGuests?.message}
            </p>

            <Col xs={3}>
              <Form.Control
                {...register("rating")}
                type="rating"
                placeholder="Rating"
                className="mb-2"
              />
            </Col>

            <Col xs={3}>
              <Form.Control
                {...register("price")}
                type="price"
                placeholder="Price"
              />
            </Col>
            <p style={{ color: "red" }} className="pt-1">
              {errors.price?.message}
            </p>

            <hr className="mb-4 mt-4"></hr>

            <Form.Check
              id="switch"
              type="switch"
              {...register("meta.wifi")}
              label="Wifi included"
              className="mb-2"
            />

            <Form.Check
              id="switch"
              type="switch"
              {...register("meta.parking")}
              label="Parking on site"
              className="mb-2"
            />

            <Form.Check
              id="switch"
              type="switch"
              {...register("meta.breakfast")}
              label="Breakfast included"
              className="mb-2"
            />

            <Form.Check
              id="switch"
              type="switch"
              {...register("meta.pets")}
              label="Pets allowed"
              className="mb-4"
            />
            <Button type="submit" className={styles.primary}>
              Add venue
            </Button>
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
}
