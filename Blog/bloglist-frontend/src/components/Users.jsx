import { useEffect, useState } from "react";
import blogService from "../services/blogs";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import Navbar from "./Navbar";

const Users = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const queryUsers = async () => {
            try {
                const queriedUsers = await blogService.getUsers()
                setUsers(queriedUsers)
            } catch(error) {
                console.error(error)
            }
        }
        queryUsers()
    }, [])

    return (
        <div>
            <Navbar />
            <Logout />
            <h1>Users</h1>
            {users.map((item, key) => {
                return(
                    <div key={key}>
                        <h3><Link to={`/users/${item._id}`}>{item.name}</Link>  {item.blog.length}</h3>
                    </div>
                )
            })}
        </div>
    )
}

export default Users