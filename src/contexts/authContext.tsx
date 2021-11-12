import { useRouter } from "next/router"
import { createContext, ReactNode, useState } from "react"
import { toast } from "react-toastify"
import { api } from '../services/api'

type UserTenant = {
  name: string;
  email: string;
  city: string;
  country: string;
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
    userTenant: UserTenant | null
    handleCreateUser: (data: SignupFormData) => void
    handleSignIn: (data: SignInFormData) => void
}

type AuthProviderProps = {
    children: ReactNode
}

type SignUpAuthResponse = {
  tenant: UserTenant | null
}

type SignInAuthResponse = {
  token: string;
  user: {
    name: string;
    role: string;
  }
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthProvider(props: AuthProviderProps){
  const [ userTenant, setUserTenant ] = useState(null)
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
            const response = await api.post<SignUpAuthResponse>('/accounts/sign-up', dataFormatted)

            const { tenant } = response.data
            setUserTenant(tenant)
            
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

          const { token } = response.data

          localStorage.setItem('@user:token', token)
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
        <AuthContext.Provider value={{ handleCreateUser, userTenant , handleSignIn }}>
            {props.children}
        </AuthContext.Provider>
    )
}