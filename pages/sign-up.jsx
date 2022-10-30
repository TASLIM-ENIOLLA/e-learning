import {useEffect, useState} from 'react'
import {TopRibbon, NavBar, SearchBar, Footer, CourseCard} from '../components/pages'
import {toast} from '../components/toast'
import {server} from '../config'
import {cookieStore} from '../functions'

const SignUp = async (formData) => {
    const req = await fetch(`${server.backend.url}/php/processes/newuser/signup.php`, {
        body: JSON.stringify(formData),
        method: 'POST'
    })
    return await req.json()
}

export default function _SignUp({continue_url}){
    const [MDAs, setMDAs] = useState([])
    const [formData, setFormData] = useState({
        empID: '',
        l_name: '',
        f_name: '',
        email: '',
        MDA: '',
        accessCode: '',
        password: '',
        c_password: ''
    })

    useEffect(() => {
        fetch(`${server.backend.url}/php/processes/api/get-mdas.php`)
        .then(res => res.json())
        .then(({data}) => setMDAs(data))
    }, [])

    return (
        <section>
        <TopRibbon />
        <NavBar />
        <div className = "border-top py-5">
            <div className = "col-xs-12 col-sm-10 col-lg-6 mx-auto">
                <div className = "py-5">
                    <h1 className = "h-50px text-orange text-capitalize bold text-c">sign up</h1>
                    <div className = "text-capitalize text-c h5 mt-4">already have an account? <a className = "h5 text-success" href="/log-in">log in</a>.</div>
                </div>
                <div className = "py-5 col-sm-10 mx-auto">
                    <div className = "mb-4">
                        <span className = "text-capitalize bold letter-spacing-1">first name</span>
                        <input value = {formData.f_name} onChange = {(e) => {
                            setFormData({
                                ...formData,
                                f_name: e.target.value
                            })
                        }} type = "text" className = "d-block w-100 mt-2 rounded border border-secondary shadow-sm bg-clear p-3" />
                    </div>
                    <div className = "mb-4">
                        <span className = "text-capitalize bold letter-spacing-1">last name</span>
                        <input value = {formData.l_name} onChange = {(e) => {
                            setFormData({
                                ...formData,
                                l_name: e.target.value
                            })
                        }} type = "text" className = "d-block w-100 mt-2 rounded border border-secondary shadow-sm bg-clear p-3" />
                    </div>
                    <div className = "mb-4">
                        <span className = "text-capitalize bold letter-spacing-1">employee ID</span>
                        <input value = {formData.empID} onChange = {(e) => {
                            setFormData({
                                ...formData,
                                empID: e.target.value
                            })
                        }} type = "text" className = "d-block w-100 mt-2 rounded border border-secondary shadow-sm bg-clear p-3" />
                    </div>
                    <div className = "mb-4">
                        <span className = "text-capitalize bold letter-spacing-1">email address</span>
                        <input value = {formData.email} onChange = {(e) => {
                            setFormData({
                                ...formData,
                                email: e.target.value
                            })
                        }} type = "email" className = "d-block w-100 mt-2 rounded border border-secondary shadow-sm bg-clear p-3" />
                    </div>
                    <div className = "mb-4">
                        <span className = "text-capitalize bold letter-spacing-1">select MDA</span>
                        <select value = {formData.MDA} onChange = {(e) => {
                            setFormData({
                                ...formData,
                                MDA: e.target.value
                            })
                        }} className = "d-block text-capitalize w-100 mt-2 rounded border border-secondary shadow-sm bg-clear p-3">
                            <option value = ''>--- No MDA selected ---</option>
                            {
                                MDAs.sort().map(
                                    (each, key) => (
                                        <option key = {key} value = {each.id}>{each.name}</option>
                                    )
                                )
                            }
                        </select>
                    </div>
                    <div className = "mb-4">
                        <span className = "text-capitalize bold letter-spacing-1">access code</span>
                        <input value = {formData.accessCode} onChange = {(e) => {
                            setFormData({
                                ...formData,
                                accessCode: e.target.value
                            })
                        }} type = "text" className = "d-block w-100 mt-2 rounded border border-secondary shadow-sm bg-clear p-3" />
                    </div>
                    <div className = "mb-4">
                        <span className = "text-capitalize bold letter-spacing-1">password</span>
                        <input value = {formData.password} onChange = {(e) => {
                            setFormData({
                                ...formData,
                                password: e.target.value
                            })
                        }} type = "password" className = "d-block w-100 mt-2 rounded border border-secondary shadow-sm bg-clear p-3" />
                    </div>
                    <div className = "mb-4">
                        <span className = "text-capitalize bold letter-spacing-1">confirm password</span>
                        <input value = {formData.c_password} onChange = {(e) => {
                            setFormData({
                                ...formData,
                                c_password: e.target.value
                            })
                        }} type = "password" className = "d-block w-100 mt-2 rounded border border-secondary shadow-sm bg-clear p-3" />
                    </div>
                    <div className = "mb-4 pt-3">
                        <input value = "Sign up" type = "submit" className = {"d-block w-100 mt-2 rounded border-0 shadow transit bg-dark-blue text-uppercase text-white bold letter-spacing-1 p-3" + (
                            (![formData.empID, formData.accessCode, formData.c_password, formData.email, formData.MDA, formData.password, formData.f_name, formData.l_name].includes(''))
                            ? ""
                            : " disabled"
                        )} onClick = {() => {
                            SignUp(formData).then(res => {
                                if(res.type === 'success'){
                                    cookieStore.set({
                                        name: 'E_LEARNING',
                                        value: JSON.stringify({...res.data, accountType: 'user'}),
                                        expires: (new Date().getTime() + (30 * 24 * 3600 * 1000)),
                                        path: '/'
                                    }).then(() => {
                                        toast({
                                            message: 'Sign up successful. Redirecting...',
                                            duration: 3000,
                                            type: 'success',
                                            callback: () => {
                                                window.location = `/dashboard`
                                            }
                                        })
                                    })
                                }
                                else{
                                    toast({
                                        message: res.data,
                                        duration: 3000,
                                        type: 'danger'
                                    })
                                }
                            })
                        }} />
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </section>
    )
}

export const getServerSideProps = (context) => {
    const {query: {continue_url}} = context

    return {
        props: {
            continue_url: continue_url || null
        }
    }
}
