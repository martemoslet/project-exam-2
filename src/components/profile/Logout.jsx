import { remove } from "../auth/storage";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import styles from "../ui/Button.module.css";

export default function Logout() {
  const navigate = useNavigate();
  const refresh = () => window.location.reload(true);
  const logOut = (e) => {
    e.preventDefault();
    remove("token");
    remove("profile");
    navigate("/");
    refresh();
  };

  return (
    <Button onClick={logOut} className={styles.secondary}>
      Log out
    </Button>
  );
}
