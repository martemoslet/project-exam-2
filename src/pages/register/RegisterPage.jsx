import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { authFetch } from "../../components/auth/authFetch";
import { useNavigate } from 'react-router-dom';

const schema = yup
.object({
name: yup
.string()
.max(20, "Your name can be maximum 20 characters")
.required("Please enter your full name"),
email: yup
.string()
.matches(/^[\w\-.]+@(stud\.)?noroff\.no$/, "Only a stud.noroff.no email address can register")
.required(),
avatar: yup
.string(),
password: yup
.string()
.min(8, "Your password must be at least 8 characters")
.required("Please enter a password"),
venuManager: yup
.boolean(),
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
  const response = await authFetch('https://api.noroff.dev/api/v1/holidaze/auth/register', {
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
    navigate('/loginPage')
    return result;
    } else {
    alert("Something went wrong");
    }
    

}


return (
<form className="contact-form" onSubmit={handleSubmit(onSubmit)} id="registerForm">
<h1>Register</h1>
<label htmlFor="name">Full name</label>
<input {...register("name")} />
<p>{errors.name?.message}</p>
<label htmlFor="email">Email address</label>
<input {...register("email")} />
<p>{errors.email?.message}</p>
<label htmlFor="avatar">Avatar</label>
<input {...register("avatar")} />
<p>{errors.avatar?.message}</p>
<label htmlFor="passowrd">Password</label>
<input {...register("password")} type="password" />
<p>{errors.password?.message}</p>
<div>
<input type="checkbox" id='venueManager' className='me-2' {...register("venueManager")} />
<label htmlFor="venueManager">I want to register as a venue manager</label>
</div>
<input type="submit" />
</form>
);
}
