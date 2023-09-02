import Navbarnav from "./Nav"
import LoggedInNav from "./LoggedInNav";
import * as storage from "../auth/storage"

const profile = localStorage

export default function Header() {
    return (<header>
 <Navbarnav />
        
    </header>)
}