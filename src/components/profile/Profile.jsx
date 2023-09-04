export default function UserProfile({ avatar, name, email }) {
return (
<div>
    <h1>{name}</h1> 
    <p>{email}</p>
    <img src={avatar} alt={name} height={120} width={120} style={{ objectFit: "cover" }} className="rounded" />
</div>
)
}
