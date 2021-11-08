import { useForm, SubmitHandler } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

import Link from 'next/link'
import styles from './styles.module.scss'

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
    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(signUpSchema)
    })

    const { errors } = formState

    const handleCreateUser: SubmitHandler<SignupFormData> = (data) => {
        console.log(data)
    }

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
        </div>
    )
}




