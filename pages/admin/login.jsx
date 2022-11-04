import {API} from '/config'
import {useState, useEffect} from 'react'
import {parseObjectToFormData, cookieStore} from '/functions'
import {toast} from '/components/toast'

export default function Login(){
    const [formData, setFormData] = useState({
        username: 'admin',
        password: '11111111'
    })

    return (
        <section className = 'container-fluid min-vh100 py-5'>
            <div className = 'row py-5'>
                <div className = 'col-12'>
                    <form onSubmit = {(e) => {
                        e.preventDefault()

                        fetch(API.admin.login, {
                            method: 'POST',
                            body: parseObjectToFormData(formData)
                        })
                        .then(e => e.json())
                        .then(({type, data, message}) => toast({type, message, onSuccess: () => cookieStore.set({
                            name: 'E_LEARNING_ADMIN',
                            value: JSON.stringify(data),
                            expires: (new Date().getTime() + (30 * 24 * 3600 * 1000)),
                            path: '/'
                        }).then(() => window.location = './dashboard')}))
                    }} className = 'mx-auto rounded-2x shadow px-4 py-5' style = {{maxWidth: '450px'}}>
                        <div className = 'text-center mb-5'>
                            <a href = '/'>
                                <img src = '/images/logo.png' width = '150' />
                            </a>
                        </div>
                        <div className = 'mb-4'>
                            <p className = 'mb-1 text-capitalize bold text-muted'>username</p>
                            <input value = {formData.username} onChange = {(e) => setFormData({
                                ...formData,
                                username: e.target.value
                            })} type = 'text' className = 'bold text-dark letter-spacing-1 bg-clear d-block w-100 p-3 border rounded-1x' />
                        </div>
                        <div className = 'mb-5'>
                            <p className = 'mb-1 text-capitalize bold text-muted'>password</p>
                            <input value = {formData.password} onChange = {(e) => setFormData({
                                ...formData,
                                password: e.target.value
                            })} type = 'password' className = 'bold text-dark letter-spacing-1 bg-clear d-block w-100 p-3 border rounded-1x' />
                        </div>
                        <div>
                            <input type = 'submit' value = 'log in' className = 'bold text-capitalize px-5 py-3 border rounded-1x theme-bg text-white' />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}} = context
    const cookie = cookies['E_LEARNING_ADMIN']

    if(cookie) return {
        redirect: {
            destination: './dashboard'
        }
    }

    return {props: {}}
}
