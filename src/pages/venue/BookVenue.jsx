import { API_HOLIDAZE_URL, } from "../../constants";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { authFetch } from "../../components/auth/authFetch";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const action = "/bookings";

const schema = yup
.object({
venueId: yup
.string(),
dateFrom: yup
.string(),
dateTo: yup
.string(),
guests: yup
.number()
.integer()
})
.required();

export default function BookVenue() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        } = useForm({
        resolver: yupResolver(schema),
        });

let { id } = useParams();


//const refresh = () => window.location.reload(true)

async function onSubmit(bookingData) {

const bookVenueURL = `${API_HOLIDAZE_URL}${action}`;

const response = await authFetch(bookVenueURL, {
headers: {
"Content-Type": "application/json",
},
method: 'POST',
body: JSON.stringify(bookingData)
});

const result = await response.json()
if (response.status === 201 || 204) {
    //refresh();
    console.log(result)
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
