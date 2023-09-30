import { API_HOLIDAZE_URL, BOOKINGS } from "../../constants";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { authFetch } from "../../components/auth/authFetch";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Spinner } from "react-bootstrap";

const action = "/bookings";

const schema = yup
  .object({
    venueId: yup.string(),
    dateFrom: yup.string(),
    dateTo: yup.string(),
    guests: yup.number().integer(),
  })
  .required();

export default function BookVenue() {
  const { register, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  let { id } = useParams();

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

    getData(`${API_HOLIDAZE_URL}/venues/${id}${BOOKINGS}`);
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

  async function onSubmit(bookingData) {
    const bookVenueURL = `${API_HOLIDAZE_URL}${action}`;

    const response = await authFetch(bookVenueURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(bookingData),
    });

    const result = await response.json();
    if (response.status === 201 || 204) {
      return result;
    } else {
      alert("Something went wrong");
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("venueId")} value={id} type="hidden" />

        <label htmlFor="dateFrom">Date from</label>
        <input {...register("dateFrom")} type="date" />

        <label htmlFor="dateTo">Date to</label>
        <input {...register("dateTo")} type="date" />

        <label htmlFor="guest">Guests</label>
        <input {...register("guests")} type="number" />

        <input type="submit" />
      </form>
    </div>
  );
}
