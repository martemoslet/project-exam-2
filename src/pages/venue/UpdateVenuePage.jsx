import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { authFetch } from "../../components/auth/authFetch";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import RemoveVenue from './DeleteVenue';
import { useEffect, useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

const schema = yup
.object({
name: yup
.string(),
description: yup
.string(),
media: yup
.string(),
price: yup
.number(),
maxGuests: yup
.number()
.integer(),
rating: yup
.number(),
meta: yup
.object({
    wifi: yup
    .boolean(),
    parking: yup
    .boolean(),
    breakfast: yup
    .boolean(),
    pets: yup
    .boolean(),
}),
location: yup
.object({
    address: yup
    .string(),
    city: yup
    .string(),
    zip: yup
    .string(),
    country: yup
    .string(),
    continent: yup
    .string(),
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
//const navigate = useNavigate();

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
    return <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
    </Spinner>;
    }
    
    
    if (isError) {
    return <div>Error</div>;
    }
    console.log(data)

async function onSubmit(data) {
    data.media = data.media.split(",");
  const response = await authFetch(`https://api.noroff.dev/api/v1/holidaze/venues/${id}`, {
    headers: {
    "Content-Type": "application/json",
    },
    method: 'PUT',
    body: JSON.stringify(data)
    });
    
   
    const result = await response.json()
    if (response.status === 201 || 204) {
    console.log(result)
    //navigate('/')
    return result;
    } else {
    alert("Something went wrong");
    }
}

return (
    <>
<form className="contact-form" onSubmit={handleSubmit(onSubmit)} id="registerForm">
<h1>Update venue</h1>
<label htmlFor="name">Venue name</label>
<input {...register("name")} defaultValue={data.name} />
<p>{errors.name?.message}</p>

<label htmlFor="location.address">Address</label>
<input {...register("location.address")} type="location.address" defaultValue={data.location.address} />

<label htmlFor="location.city">City</label>
<input {...register("location.city")} type="location.city" defaultValue={data.location.city} />

<label htmlFor="location.zip">Zip code</label>
<input {...register("location.zip")} type="location.zip" defaultValue={data.location.zip} />

<label htmlFor="location.country">Country</label>
<input {...register("location.country")} type="location.country" defaultValue={data.location.country} />

<label htmlFor="location.continent">Continent</label>
<input {...register("location.continent")} type="location.continent" defaultValue={data.location.continent} />

<label htmlFor="description">Description</label>
<textarea {...register("description")} defaultValue={data.description}/>
<p>{errors.description?.message}</p>

<label htmlFor="media">Media</label>
<input type="url" {...register("media")} defaultValue={data.media} />

<label htmlFor="price">Price</label>
<input {...register("price")} type="price" defaultValue={data.price} />
<p>{errors.price?.message}</p>

<label htmlFor="maxGuests">Max guests</label>
<input {...register("maxGuests")} type="maxGuests" defaultValue={data.maxGuests} />
<p>{errors.maxGuests?.message}</p>

<label htmlFor="rating">Rating</label>
<input {...register("rating")} type="rating" defaultValue={data.rating} />

<label htmlFor="meta.wifi">Wifi included</label>
<input type="checkbox" className='' {...register("meta.wifi")} defaultChecked={data.meta.wifi > 0 ? "true" : ""} />

<label htmlFor="meta.parking">Parking on site</label>
<input type="checkbox" className='' {...register("meta.parking")} defaultChecked={data.meta.parking > 0 ? "true" : ""} />

<label htmlFor="meta.breakfast">Breakfast included</label>
<input type="checkbox" className='' {...register("meta.breakfast")} defaultChecked={data.meta.breakfast > 0 ? "true" : ""} />

<label htmlFor="meta.pets">Pets allowed</label>
<input type="checkbox" className='' {...register("meta.pets")} defaultChecked={data.meta.pets > 0 ? "true" : ""} />

<input type="submit" />
</form>
<RemoveVenue />
</>
);
}
