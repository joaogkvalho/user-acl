import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import { ToastContainer } from 'react-toastify'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'

import 'react-toastify/dist/ReactToastify.css'

import Link from 'next/link'
import styles from './styles.module.scss'

const signUpSchema = yup.object().shape({
    name: yup.string().required('Nome obrigatório'),
    email: yup.string().required('Email obrigatório').email('Email inválido'),
    password: yup.string().required('Senha obrigatória').length(6, 'Mínimo de 6 caracteres'),
    passwordConfirmation: yup.string().oneOf([
        null, yup.ref('password')
    ], 'As senhas precisam ser iguais'),
    cpfOrCnpj: yup.string().required('CPF obrigatória'),
    adress: yup.string().required('Endereço obrigatório'),
    complement: yup.string(),
    state: yup.string().required('Estado obrigatório'),
    city: yup.string().required('Cidade obrigatória'),
    country: yup.string().required('País obrigatório'),
    cep: yup.string().required('CEP obrigatório'),

})

export default function Signup() {
    const { handleCreateUser } = useContext(AuthContext)

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signUpSchema)
    })

    const { errors } = formState

    return(
        <div className={styles.signupFormWrapper}>
            <form className={styles.signupForm} onSubmit={handleSubmit(handleCreateUser)}>
                <h2>Dados Pessoais</h2>
                <div className={styles.personalData}>                    
                    <div>
                        <input type="text" name="name" placeholder="Nome" {...register('name')} />
                        <p>{errors.name?.message}</p>
                    </div>

                    <div>
                        <input type="email" name="email" placeholder="Email" {...register('email')} />  
                        <p>{errors.email?.message}</p>
                    </div>

                    <div>
                        <input type="password" name="password" placeholder="Senha" {...register('password')} />                     
                        <p>{errors.password?.message}</p>
                    </div>

                    <div>
                        <input
                        type="password"
                        name="passwordConfirmation"
                        placeholder="Confirme sua senha"
                        {...register('passwordConfirmation')} 
                        />
                        <p>{errors.passwordConfirmation?.message}</p>
                    </div>

                    <div>
                        <input type="text" name="cpfOrCnpj" placeholder="CPF / CNPJ" {...register('cpfOrCnpj')} />
                        <p>{errors.cpfOrCnpj ?.message}</p>
                    </div>
                </div>

                <h2>Informações de endereço</h2>
                <div className={styles.adressData}>                    
                    <div>
                        <input type="text" name="adress" placeholder="Endereço" {...register('adress')} />
                        <p>{errors.adress?.message}</p> 
                    </div>
                                       
                    <div>
                        <input type="text"  name="complement" placeholder="Complemento" {...register('complement')} /> 
                        <p>{errors.complement?.message}</p>
                    </div>

                    <div>
                        <input type="text" name="state" placeholder="Estado" {...register('state')} />
                        <p>{errors.state?.message}</p>                     
                    </div>

                    <div>
                        <input type="text" name="city" placeholder="Cidade" {...register('city')} />
                        <p>{errors.city?.message}</p>
                    </div>

                    <div>
                        <input type="text" name="country" placeholder="País" {...register('country')} />
                        <p>{errors.country?.message}</p>                     
                    </div>

                    <div>
                        <input type="text" name="cep" placeholder="CEP" {...register('cep')} />
                        <p>{errors.cep?.message}</p>
                    </div>
                </div>

                <div className={styles.formButtons}>
                    <button type="submit">Cadastrar</button>

                    <Link href="/">
                        <button>Cancelar</button>
                    </Link>
                </div>
            </form>

            <ToastContainer />
        </div>
    )
}




