import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import blogService from "../services/blogs";
import { Link } from "react-router-dom";
import Logout from "../components/Logout";
import { useSelector } from "react-redux";
import Navbar from "./Navbar";

const User = () => {
    const id = useParams().id
    const [user, setUser] = useState()
    useEffect(() => {
        const queryUser = async () => {
            const queriedUser = await blogService.getUser(id)
            setUser(queriedUser)
        }
        queryUser()
    }, [])

    if(!user) {
        return null
    }

    return(
        <div>
            <Navbar />
            <Logout />
            <h2>{user.name}</h2>
            <h3>added blogs</h3>
            {user.blog.map((item, key) => {
                return(
                    <div key={key}>{item.title}</div>
                )
            })}
        </div>
    )
}

export default User