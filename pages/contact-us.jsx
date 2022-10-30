import {
    useEffect, useState
} from 'react'
import {
    TopRibbon, NavBar, SearchBar, Footer
} from '../components/pages'
import {
    server
} from '../config'

export default () => {
    const [contactMssg, setContactMssg] = useState({
        name: '',
        email: '',
        message: ''
    })

    return (
        <section>
            <TopRibbon />
            <NavBar />
            <section className = 'border-top'>
                <div className = 'my-5 py-5'>
                    <div className = 'py-5 px-4'>
                        <h1 className = 'text-c text-capitalize mb-3'>contact <span className = 'text-orange h1'>us</span></h1>
                        <p className = 'fo-s-15 text-c'>
                            Fusce id sem at ligula laoreet hendrerit venenatis sed purus. Ut pellentesque maximus lacus, nec pharetra augue.
                        </p>
                    </div>
                    <div className = 'container'>
                        <div className = 'row px-5'>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 p-3">
                                <div>
                                    <div style = {{height: '35px'}} className = 'col-11 mx-auto mb-3'>
                                        <h4 className = 'text-c bold letter-spacing-1 text-uppercase'>our Services</h4>
                                    </div>
                                    <p className = 'text-c text-capitalize text-muted bold letter-spacing-1'>
                                        We Provide Outsourced Software Development Services To Over 50 Clients From 21 Countries.
                                    </p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 p-3">
                                <div>
                                    <div style = {{height: '35px'}} className = 'col-11 mx-auto mb-3'>
                                        <h4 className = 'text-c bold letter-spacing-1 text-uppercase'>address</h4>
                                    </div>
                                    <p className = 'text-c text-capitalize text-muted bold letter-spacing-1'>
                                        faculty of communication &amp; information sciences, university of ilorin, kwara state, nigeria.
                                    </p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 p-3">
                                <div>
                                    <div style = {{height: '35px'}} className = 'col-11 mx-auto mb-3'>
                                        <h4 className = 'text-c bold letter-spacing-1 text-uppercase'>contact info</h4>
                                    </div>
                                    <p className = 'text-c text-capitalize text-muted bold letter-spacing-1'>
                                        faculty of communication &amp; information sciences, university of ilorin, kwara state, nigeria.
                                    </p>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 p-3">
                                <div>
                                    <div style = {{height: '35px'}} className = 'col-11 mx-auto mb-3'>
                                        <h4 className = 'text-c bold letter-spacing-1 text-uppercase'>website</h4>
                                    </div>
                                    <p className = 'text-c text-capitalize text-muted bold letter-spacing-1'>
                                        faculty of communication &amp; information sciences, university of ilorin, kwara state, nigeria.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className = 'py-5 bg-light border-top'>
                    <div className="container py-5">
                        <div className="row px-5">
                            <div className="col-xs-12 col-lg-6 mx-auto">
                                <div style = {{border: '4px dashed #002147'}} className = 'bg-white p-3 rounded-1x'>
                                    <div className = 'text-c text-orange my-4 fo-s-20 bold letter-spacing-1 text-uppercase'>
                                        send us a message
                                    </div>
                                    <div className = 'p-3'>
                                        <div className = 'mb-4'>
                                            <div className = 'text-capitalize bold letter-spacing-1 mb-2'>name</div>
                                            <input onChange = {(e) => {
                                                setContactMssg({
                                                    ...contactMssg,
                                                    name: e.target.value
                                                })
                                            }} value = {contactMssg.name} type="text" className = 'p-3 d-block w-100 border border-dark rounded outline-0' />
                                        </div>
                                        <div className = 'mb-4'>
                                            <div className = 'text-capitalize bold letter-spacing-1 mb-2'>email address</div>
                                            <input onChange = {(e) => {
                                                setContactMssg({
                                                    ...contactMssg,
                                                    email: e.target.value
                                                })
                                            }} value = {contactMssg.email} type="email" className = 'p-3 d-block w-100 border border-dark rounded outline-0' />
                                        </div>
                                        <div className = 'mb-4'>
                                            <div className = 'text-capitalize bold letter-spacing-1 mb-2'>message</div>
                                            <textarea onChange = {(e) => {
                                                setContactMssg({
                                                    ...contactMssg,
                                                    message: e.target.value
                                                })
                                            }} value = {contactMssg.message} className = 'p-3 d-block w-100 resize-0 border border-dark rounded outline-0' rows = '4'></textarea>
                                        </div>
                                        <div className = 'pt-4 mb-3'>
                                            <input value = 'send message' type="button" className = {'border-0 bg-orange text-white outline-0 rounded shadow bold letter-spacing-1 text-uppercase transit p-3 d-block px-5' + (
                                                ([contactMssg.name, contactMssg.email, contactMssg.message].includes(''))
                                                ? ' disabled'
                                                : ''
                                            )} onClick = {() => {
                                                sendContactMessage(contactMssg).then(res => {
                                                    if(res.type === 'success'){
                                                        setContactMssg({
                                                            name: '',
                                                            email: '',
                                                            message: ''
                                                        })
                                                        toast({
                                                            type: 'success',
                                                            message: res.message,
                                                        })
                                                    }
                                                    else{
                                                        toast({
                                                            type: 'danger',
                                                            message: res.message,
                                                        })
                                                    }
                                                })
                                            }} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
        </section>
    )
}

const sendContactMessage = async (contactMssg) => {
    const req = await fetch(`${server.backend.url}/php/processes/user/SendContactMessage.php`, {
        body: JSON.stringify(contactMssg),
        method: 'POST'
    })
    return await req.json()
}