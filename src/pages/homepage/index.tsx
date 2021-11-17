import { useContext } from "react"
import { AuthContext } from "../../contexts/authContext"

export default function Homepage(){
    const { user } = useContext(AuthContext)
    
    return(
        <div>
           <h1>{user.name}</h1>
        </div>
    )
}