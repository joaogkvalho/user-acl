import { useContext } from "react"
import { AuthContext } from "../../contexts/authContext"

export default function Homepage(){
    const { user } = useContext(AuthContext)

    return(
        <>
            <h1>Nome: {user.name}</h1>
            <h2>Role: {user.roles}</h2>
        </>
    )
}