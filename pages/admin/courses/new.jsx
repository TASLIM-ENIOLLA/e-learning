import {API} from '/config'
import {toast} from '/components/toast'
import {useEffect, useState, useRef} from 'react'
import {parseObjectToFormData} from '/functions'
import Template from '/components/dashboard/Template'
import {JWTVerficationComponent} from '/components/jwt'

export default function Index({jwt_token, account_type}){
    const [mdas, setMDAs] = useState([])
    const [courseData, setCourseData] = useState({
        name: '',
        mda_id: '',
        'features[]': [],
        description: '',
        status: 'active'
    })

    useEffect(() => {
        fetch(API.admin.mdas, {
            method: 'POST',
            body: parseObjectToFormData({jwt_token})
        })
        .then(e => e.json())
        .then(({data}) => setMDAs(data))
    }, [])

    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <Template account_type = 'admin'>
                <div className="row a-i-c">
                    <div className = 'col-12 mb-4'>
                        <h4 className = 'theme-color text-capitalize'>Add Course</h4>
                    </div>
                    <form onSubmit = {(e) => {
                        e.preventDefault()

                        fetch(API.admin.add_course, {
                            method: 'POST',
                            body: parseObjectToFormData(courseData)
                        })
                        .then(e => e.json())
                        .then(({type, message}) => toast({type, message, onSuccess: () => window.location.reload()}))
                    }} className = 'col-lg-9 pt-5'>
                        <div className = 'mb-5'>
                            <p className = 'mb-1 bold letter-spacing-1'>Name</p>
                            <input value = {courseData.name} onChange = {e => setCourseData({
                                ...courseData,
                                name: e.target.value
                            })} className = 'text-capitalize d-block w-100 p-3 rounded-1x border' />
                        </div>
                        <div className = 'mb-5'>
                            <p className = 'mb-1 bold letter-spacing-1'>MDA</p>
                            <select value = {courseData.mda_id} onChange = {e => setCourseData({
                                ...courseData,
                                mda_id: e.target.value
                            })} className = 'text-capitalize d-block w-100 p-3 rounded-1x border'>
                                <option value = ''>---</option>{
                                    mdas.map(({id, name}) => (
                                        <option key = {id} value = {id}>{name}</option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className = 'mb-5'>
                            <p className = 'mb-1 bold letter-spacing-1'>Features</p>
                            <ListComponent value = {courseData.features} onChange = {(e) => setCourseData({
                                ...courseData,
                                'features[]': e
                            })} />
                        </div>
                        <div className = 'mb-5'>
                            <p className = 'mb-1 bold letter-spacing-1'>Description</p>
                            <textarea value = {courseData.description} onChange = {e => setCourseData({
                                ...courseData,
                                description: e.target.value
                            })} rows = '5' className = 'resize-0 text-capitalize d-block w-100 p-3 rounded-1x border'></textarea>
                        </div>
                        <div className = 'mb-5'>
                            <p className = 'mb-1 bold letter-spacing-1'>Status</p>
                            <select value = {courseData.status} onChange = {e => setCourseData({
                                ...courseData,
                                status: e.target.value
                            })} className = 'text-capitalize d-block w-100 p-3 rounded-1x border'>
                                <option value = 'active'>active</option>
                                <option value = 'inactive'>inactive</option>
                            </select>
                        </div>
                        <div className = 'mb-5'>
                            <button type = 'submit' className = 'text-capitalize px-5 theme-bg p-3 rounded-1x text-white border-0'>Add New Course</button>
                        </div>
                    </form>
                </div>
            </Template>
        </JWTVerficationComponent>
    )
}

function ListItem({content, onClick}){
    return (
        <div onClick = {() => typeof onClick === 'function' ? onClick() : false} className = 'd-inline-block p-3 cursor-pointer user-select-0 mr-3 mb-3 half-bold bg-light rounded-2x shadow-sm border text-dark text-sentence break-word'>{content}</div>
    )
}

function ListComponent({onChange, value = []}){
    const ele = useRef()
    const [list, setList] = useState(value)
    const [currentList, setCurrentList] = useState('')

    useEffect(() => {
        if(typeof onChange === 'function') onChange(list)

        ele.current.scrollIntoView(false)
    }, [list])

    return (
        <div className = 'rounded-2x d-flex flex-column border overflow-0'>
            <div className = 'p-3 flex-1 overflow-y-auto' style = {{minHeight: '120px', maxHeight: '200px'}}>
                <div ref = {ele}>{
                    list.map((content, index) => (
                        <ListItem key = {index} onClick = {() => setList(list.filter(each => each !== content))} content = {content} />
                    ))
                }</div>
            </div>
            <div className = 'container-fluid- bg-light border-top'>
                <div className = 'd-flex'>
                    <div className = 'col h-100 px-0'>
                        <input autoFocus = {true} value = {currentList} onChange = {({target: {value}}) => setCurrentList(value)} placeholder = 'Type here...' className = 'p-3 border-0 outline-0 d-block w-100 bg-clear' />
                    </div>
                    <div className = 'col-auto h-100 px-0'>
                        <div onClick = {(e) => {
                            setList([...list, currentList])
                            setCurrentList('')
                        }} type = 'button' className = 'py-3 px-4 text-capitalize theme-bg text-white half-bold border-0 outline-0'>add</div>
                    </div>
                </div>
            </div>
        </div>
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
