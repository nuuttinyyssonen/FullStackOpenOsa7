import { Link } from "react-router-dom"
import '../css/navbar.css'

const Navbar = () => {

    return(
        <div className="navbar">
            <Link to='/home'>Home</Link>
            <Link to='/users'>users</Link> 
        </div>
    )
}

export default Navbar