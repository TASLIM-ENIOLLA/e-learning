import {
    useEffect, useState
} from 'react'
import {
    TopRibbon, NavBar, SearchBar, Footer, CourseCard
} from '/components/pages'
import {
    toast
} from '/components/toast'
import {
    server
} from '/config'
import {
    cookieStore
} from '/functions'

export default ({continue_url}) => {
    const [formData, setFormData] = useState({
        empID: '',
        password: ''
    })

    async function Login(formData){
        const req = await fetch(`${server.backend.url}/php/processes/newuser/login.php`, {
            body: JSON.stringify(formData),
            method: 'POST'
        })
        return await req.json()
    }

    return (
        <section>
            <TopRibbon />
            <NavBar />
            <div className = "border-top py-5">
                <div className = "col-xs-12 col-sm-10 col-lg-5 mx-auto">
                    <div className = "py-5">
                        <h1 className = "h-50px text-capitalize text-orange bold text-c">log in</h1>
                        <div className = "text-capitalize text-c h5 mt-4">don't have an account? <a className = "h5 text-dark underline" href="/sign-up">sign up</a>.</div>
                    </div>
                    <div className = "py-5 col-sm-10 mx-auto">
                        <div className = "mb-4">
                            <span className = "text-capitalize bold letter-spacing-1">employee ID</span>
                            <input value = {formData.empID} onChange = {function(e){
                                setFormData({
                                    ...formData,
                                    empID: e.target.value
                                })
                            }} type = "text" className = "d-block w-100 mt-2 rounded border border-secondary shadow-sm bold letter-spacing-1 text-uppercase bg-clear p-3" />
                        </div>
                        <div className = "mb-4">
                            <span className = "text-capitalize bold letter-spacing-1">password</span>
                            <input value = {formData.password} onChange = {function(e){
                                setFormData({
                                    ...formData,
                                    password: e.target.value
                                })
                            }} type = "password" className = "d-block w-100 mt-2 rounded border border-secondary shadow-sm bg-clear p-3" />
                        </div>
                        <div className = "mb-4 pt-3">
                            <input value = "log in" type = "submit" className = {"d-block w-100 mt-2 rounded border-0 shadow transit bg-dark-blue text-uppercase text-white bold letter-spacing-1 p-3" + (
                                (formData.empID !== '' && formData.password.length >= 8)
                                ? ''
                                : ' disabled'
                            )} onClick = {() => {
                                Login(formData).then(res => {
                                    if(res.type === 'success'){
                                        cookieStore.set({
                                            name: 'E_LEARNING',
                                            value: JSON.stringify({...res.data, accountType: 'user'}),
                                            expires: (new Date().getTime() + (30 * 24 * 3600 * 1000)),
                                            path: '/'
                                        }).then(() => {
                                            toast({
                                                message: 'Log in successful. Redirecting...',
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