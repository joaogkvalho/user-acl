import { useRouter } from "next/router"
import { createContext, ReactNode } from "react"
import { toast } from "react-toastify"
import { api } from '../services/api'

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
    handleCreateUser: (data: SignupFormData) => void
    handleSignIn: (data: SignInFormData) => void
}

type AuthProviderProps = {
    children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProviderProps){
    const router = useRouter()

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

        const toastSuccess = () => toast.success('Usuário criado com sucesso', {
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
          await api.post('auth/sign-in', dataFormatted)

          router.push('homepage')
        } catch(err){
          if(err.response?.status === 401){
            toastWrongDataError()
          } else {
            toastGeneralError()
          }
        } 
  }

    return(
        <AuthContext.Provider value={{ handleCreateUser, handleSignIn }}>
            {props.children}
        </AuthContext.Provider>
    )
}