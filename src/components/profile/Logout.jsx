import { remove } from "../auth/storage";
import { useNavigate } from 'react-router-dom';

export default function Logout() {
    const navigate = useNavigate();
    const refresh = () => window.location.reload(true)
    const logOut = (e) => {
        e.preventDefault();
        remove("token");
        remove("profile");
        navigate("/")
        refresh();
    }
        
        return (
            <button onClick={logOut}>Logout</button>
        )
      }