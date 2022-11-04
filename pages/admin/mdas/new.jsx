import {API} from '/config'
import {toast} from '/components/toast'
import {useEffect, useState} from 'react'
import {parseObjectToFormData} from '/functions'
import Template from '/components/dashboard/Template'
import {JWTVerficationComponent} from '/components/jwt'

export default function Index({jwt_token, account_type}){
    const [MDAData, setMDAData] = useState({
        name: '',
        type: '',
        access_code: '',
        description: '',
        status: 'active'
    })

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <Template account_type = 'admin'>
                <div className="row a-i-c">
                    <div className = 'col-12 mb-4'>
                        <h4 className = 'theme-color text-capitalize'>Add MDA</h4>
                    </div>
                    <form onSubmit = {(e) => {
                        e.preventDefault()

                        fetch(API.admin.add_mda, {
                            method: 'POST',
                            body: parseObjectToFormData(MDAData)
                        })
                        .then(e => e.json())
                        .then(({type, message}) => toast({type, message, onSuccess: () => window.location.reload()}))
                    }} className = 'col-lg-9 pt-5'>
                        <div className = 'mb-5'>
                            <p className = 'mb-1 bold letter-spacing-1'>Name</p>
                            <input value = {MDAData.name} onChange = {e => setMDAData({
                                ...MDAData,
                                name: e.target.value
                            })} className = 'text-capitalize d-block w-100 p-3 rounded-1x border' />
                        </div>
                        <div className = 'mb-5'>
                            <p className = 'mb-1 bold letter-spacing-1'>Type</p>
                            <select value = {MDAData.type} onChange = {e => setMDAData({
                                ...MDAData,
                                type: e.target.value
                            })} className = 'text-capitalize d-block w-100 p-3 rounded-1x border'>
                                <option value = ''>---</option>
                                <option value = 'ministry'>ministry</option>
                                <option value = 'department'>department</option>
                                <option value = 'agency'>agency</option>
                            </select>
                        </div>
                        <div className = 'mb-5'>
                            <p className = 'mb-1 bold letter-spacing-1'>Access Code</p>
                            <input value = {MDAData.access_code} onChange = {e => setMDAData({
                                ...MDAData,
                                access_code: e.target.value
                            })} className = 'text-capitalize d-block w-100 p-3 rounded-1x border' />
                        </div>
                        <div className = 'mb-5'>
                            <p className = 'mb-1 bold letter-spacing-1'>Description</p>
                            <textarea value = {MDAData.description} onChange = {e => setMDAData({
                                ...MDAData,
                                description: e.target.value
                            })} rows = '5' className = 'resize-0 text-capitalize d-block w-100 p-3 rounded-1x border'></textarea>
                        </div>
                        <div className = 'mb-5'>
                            <p className = 'mb-1 bold letter-spacing-1'>Status</p>
                            <select value = {MDAData.status} onChange = {e => setMDAData({
                                ...MDAData,
                                status: e.target.value
                            })} className = 'text-capitalize d-block w-100 p-3 rounded-1x border'>
                                <option value = 'active'>active</option>
                                <option value = 'inactive'>inactive</option>
                            </select>
                        </div>
                        <div className = 'mb-5'>
                            <button type = 'submit' className = 'text-capitalize px-5 theme-bg p-3 rounded-1x text-white border-0'>Add New MDA</button>
                        </div>
                    </form>
                </div>
            </Template>
        </JWTVerficationComponent>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}, query: {MDAID}} = context
    const cookie = cookies['E_LEARNING_ADMIN']

    if(!cookie) return {
        redirect: {
            destination: './'
        }
    }

    return {props: {
        jwt_token: cookie,
        account_type: './admin'
    }}
}
