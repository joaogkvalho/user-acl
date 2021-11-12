import { useContext } from "react"
import { AuthContext } from "../../contexts/authContext"

export default function Homepage(){
    const { userTenant } = useContext(AuthContext)

    return(
        <h1>{userTenant.email}</h1>
    )
}