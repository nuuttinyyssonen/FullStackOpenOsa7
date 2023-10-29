import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../reducers/userReducer";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const user = useSelector(({user}) => {
        console.log(user)
        return user
    })

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/')
    };

    if(!user) {
        return null
    }

    return (
        <div>
          <p>{user.name} logged in</p>
          <button id="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
    )

}

export default Logout
