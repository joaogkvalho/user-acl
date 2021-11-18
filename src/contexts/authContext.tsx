import { useRouter } from "next/router"
import { createContext, ReactNode, useEffect, useState } from "react"
import { toast } from "react-toastify"
import { api } from '../services/api'

type User = {
  name: string,
  roles: string,
}

type SignupFormData = {
    name: string;
    email: string;
    password: string;
    cpfOrCnpj: string;
    adress: string;
    complement: string;
    state: string;
    city: string;
    country: string;
    cep: string;
}

type SignInFormData = {
    email: string;
    password: string;
  }

type AuthContextData = {
    user: User
    handleCreateUser: (data: SignupFormData) => void
    handleSignIn: (data: SignInFormData) => void
    signOut: () => void
}

type AuthProviderProps = {
    children: ReactNode
}

type SignInAuthResponse = {
  token: string;
  user: User
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProviderProps){
    const [ user, setUser ] = useState({} as User)
    const router = useRouter()

    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem('@user:data')))
    }, [])

    useEffect(() => {
      localStorage.setItem('@user:data', JSON.stringify(user))
    }, [user])

    async function handleCreateUser(data: SignupFormData){
        const dataFormatted = {
            name: data.name,
            email: data.email,
            password: data.password,
            cpf_cnpj: data.cpfOrCnpj,
            cep: data.cep,
            address: data.adress,
            complement: data.complement,
            city: data.city,
            country: data.country,
            state: data.state
        }

        const toastSuccess = () => toast.success('Usuário cadastrado com sucesso', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        })

        const toastGeneralError = () => toast.error('Erro interno ao criar conta', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        })

        const toastDuplicityError = () => toast.error('Usuário já cadastrado no banco de dados', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
        })

        try{
            await api.post('/accounts/sign-up', dataFormatted)            
            
            toastSuccess()
            setTimeout(() => router.push('/'), 3000)
        } catch(err){
            if(err.response?.status === 409){
                toastDuplicityError()
            } else {
                toastGeneralError()
            }
        }
    }

    async function handleSignIn(data: SignInFormData){
        const dataFormatted = {
          email: data.email,
          password: data.password
        }

        const toastGeneralError = () => toast.error('Erro interno no servidor', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        })

        const toastWrongDataError = () => toast.error('Email ou senha incorretos', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          draggable: true,
        })

        try{
          const response = await api.post<SignInAuthResponse>('auth/sign-in', dataFormatted)

          const { user, token } = response.data

          localStorage.setItem('@user:token', token)

          setUser(user)
          router.push('homepage')          
        } catch(err){
          if(err.response?.status === 401){
            toastWrongDataError()
          } else {
            toastGeneralError()
          }
        }
    }

    function signOut(){
      setUser(null)
      localStorage.removeItem('@user:data')
      localStorage.removeItem('@user:token')
    }

    return(
        <AuthContext.Provider value={{ handleCreateUser, user , handleSignIn, signOut }}>
            {props.children}
        </AuthContext.Provider>
    )
}