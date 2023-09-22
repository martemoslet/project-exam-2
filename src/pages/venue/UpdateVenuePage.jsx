import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { authFetch } from "../../components/auth/authFetch";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import RemoveVenue from "./DeleteVenue";
import { useEffect, useState } from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "../../components/ui/Button.module.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";

const schema = yup
  .object({
    name: yup.string(),
    description: yup.string(),
    media: yup.string(),
    price: yup.number(),
    maxGuests: yup.number().integer(),
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

export default function UpdateVenue() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  let { id } = useParams();
  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getData(url) {
      try {
        setIsLoading(true);
        setIsError(false);

        const response = await fetch(url);
        const json = await response.json();

        setData(json);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }

    getData(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`);
  }, [id]);

  if (isLoading || !data) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  }

  if (isError) {
    return <div>Error</div>;
  }
  console.log(data);

  async function onSubmit(data) {
    data.media = data.media.split(",");
    const response = await authFetch(
      `https://api.noroff.dev/api/v1/holidaze/venues/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
        method: "PUT",
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();
    if (response.status === 201 || 204) {
      console.log(result);
      navigate("/");
      return result;
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <Container className="pt-4 pb-4">
      <h1 className="text-center pb-2">Update venue</h1>
      <Form
        className="contact-form"
        onSubmit={handleSubmit(onSubmit)}
        id="registerForm"
      >
        <Row xs={1} sm={1} lg={2} className="justify-content-center">
          <Form.Group>
            <Form.Label htmlFor="name">Venue name</Form.Label>
            <Form.Control
              {...register("name")}
              defaultValue={data.name}
              placeholder="Venue name"
              className="mb-2"
            />

            <p className="ps-2">Location</p>
            <Form.Control
              {...register("location.address")}
              type="location.address"
              defaultValue={data.location.address}
              placeholder="Address"
              className="mb-2"
            />

            <Form.Control
              {...register("location.zip")}
              type="location.zip"
              defaultValue={data.location.zip}
              placeholder="Zip code"
              className="mb-2"
            />

            <Form.Control
              {...register("location.city")}
              type="location.city"
              defaultValue={data.location.city}
              placeholder="City"
              className="mb-2"
            />

            <Form.Control
              {...register("location.country")}
              type="location.country"
              defaultValue={data.location.country}
              placeholder="Country"
              className="mb-2"
            />

            <Form.Control
              {...register("location.continent")}
              type="location.continent"
              defaultValue={data.location.continent}
              placeholder="Continent"
            />
            <hr className="mb-4 mt-4"></hr>

            <Form.Label htmlFor="description">Description</Form.Label>
            <Form.Control
              {...register("description")}
              defaultValue={data.description}
              placeholder="Description"
              className="mb-2"
            />

            <Form.Label htmlFor="media">Images</Form.Label>
            <Form.Control
              type="url"
              {...register("media")}
              defaultValue={data.media}
              placeholder="Images"
              className="mb-2"
            />

            <Col xs={3}>
              <Form.Label htmlFor="maxGuests">Max guests</Form.Label>
              <Form.Control
                {...register("maxGuests")}
                type="maxGuests"
                defaultValue={data.maxGuests}
                placeholder="Max guests"
              />
            </Col>

            <Col xs={3}>
              <Form.Label htmlFor="rating">Rating</Form.Label>
              <Form.Control
                {...register("rating")}
                type="rating"
                defaultValue={data.rating}
                placeholder="Rating"
                className="mb-2"
              />
            </Col>

            <Col xs={3}>
              <Form.Label htmlFor="price">Price</Form.Label>
              <Form.Control
                {...register("price")}
                type="price"
                defaultValue={data.price}
                placeholder="Price"
              />
            </Col>

            <hr className="mb-4 mt-4"></hr>

            <Form.Check
              id="switch"
              type="switch"
              {...register("meta.wifi")}
              label="Wifi included"
              className="mb-2"
              defaultChecked={data.meta.wifi > 0 ? "true" : ""}
            />

            <Form.Check
              id="switch"
              type="switch"
              {...register("meta.parking")}
              label="Parking on site"
              className="mb-2"
              defaultChecked={data.meta.parking > 0 ? "true" : ""}
            />

            <Form.Check
              id="switch"
              type="switch"
              {...register("meta.breakfast")}
              label="Breakfast included"
              className="mb-2"
              defaultChecked={data.meta.breakfast > 0 ? "true" : ""}
            />

            <Form.Check
              id="switch"
              type="switch"
              {...register("meta.pets")}
              label="Pets allowed"
              className="mb-4"
              defaultChecked={data.meta.pets > 0 ? "true" : ""}
            />

            <div className="d-md-flex justify-content-md-end">
              <Button type="submit" className={styles.primary}>
                Update
              </Button>
            </div>
            <RemoveVenue />
          </Form.Group>
        </Row>
      </Form>
    </Container>
  );
}
