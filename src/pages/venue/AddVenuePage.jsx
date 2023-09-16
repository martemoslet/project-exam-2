import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { authFetch } from "../../components/auth/authFetch";
import { useNavigate } from 'react-router-dom';

const schema = yup
.object({
name: yup
.string()
.required("Please enter your full name"),
description: yup
.string()
.required(),
media: yup
.string(),
price: yup
.number()
.required("Please enter a price"),
maxGuests: yup
.number()
.integer()
.required(),
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


export default function AddVenue() {
const {
register,
handleSubmit,
formState: { errors },
} = useForm({
resolver: yupResolver(schema),
});
//const navigate = useNavigate();



async function onSubmit(data) {
    data.media = data.media.split(",");
  const response = await authFetch('https://api.noroff.dev/api/v1/holidaze/venues', {
    headers: {
    "Content-Type": "application/json",
    },
    method: 'POST',
    body: JSON.stringify(data)
    });
    
    
    const result = await response.json()
    if (response.status === 201 || 204) {
    //alert("Registration successful");
    console.log(result)
    //navigate('/loginPage')
    return result;
    } else {
    alert("Something went wrong");
    }
    

}


return (
<form className="contact-form" onSubmit={handleSubmit(onSubmit)} id="registerForm">
<h1>Add venue</h1>
<label htmlFor="name">Venue name</label>
<input {...register("name")} />
<p>{errors.name?.message}</p>

<label htmlFor="location.address">Address</label>
<input {...register("location.address")} type="location.address" />

<label htmlFor="location.city">City</label>
<input {...register("location.city")} type="location.city" />

<label htmlFor="location.zip">Zip code</label>
<input {...register("location.zip")} type="location.zip" />

<label htmlFor="location.country">Country</label>
<input {...register("location.country")} type="location.country" />

<label htmlFor="location.continent">Continent</label>
<input {...register("location.continent")} type="location.continent" />

<label htmlFor="description">Description</label>
<textarea {...register("description")} />
<p>{errors.description?.message}</p>

<label htmlFor="media">Media</label>
<input type="url" {...register("media")} />

<label htmlFor="price">Price</label>
<input {...register("price")} type="price" />
<p>{errors.price?.message}</p>

<label htmlFor="maxGuests">Max guests</label>
<input {...register("maxGuests")} type="maxGuests" />
<p>{errors.maxGuests?.message}</p>

<label htmlFor="rating">Rating</label>
<input {...register("rating")} type="rating" />

<label htmlFor="meta.wifi">Wifi included</label>
<input type="checkbox" className='' {...register("meta.wifi")} />

<label htmlFor="meta.parking">Parking on site</label>
<input type="checkbox" className='' {...register("meta.parking")} />

<label htmlFor="meta.breakfast">Breakfast included</label>
<input type="checkbox" className='' {...register("meta.breakfast")} />

<label htmlFor="meta.pets">Pets allowed</label>
<input type="checkbox" className='' {...register("meta.pets")} />

<input type="submit" />
</form>
);
}
