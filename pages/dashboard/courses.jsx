import Template from '/components/dashboard/Template'
import {
    useState, useEffect
} from 'react'
import {
    server
} from '/config'

export default ({userData}) => {
    const [courseData, setCourseData] = useState()

    useEffect(() => {
        fetch(`${server.backend.url}/php/processes/User/GetUserLectures.php?userID=${userData.id}`)
        .then(res => res.json())
        .then(({data}) => setCourseData(data))
    }, [])

    return (
        <Template>
            <div className="row a-i-c">
				<div className="col-12">
					<div className = 'bg-white rounded-1x shadow-sm py-4'>
						<div className="row a-i-c">
                            <div className = 'col pt-2 pb-3'>
                                <div className = 'bold text-dark text-uppercase flex-h'>
                                    <span className = 'flex-1 single-line'>courses</span>
                                </div>
                            </div>
                            <div className = 'col-12 px-0 overflow-x-auto'>
                                <div style = {{minWidth: '920px'}} className = 'row bg-light a-i-c p-3'>
                                    <div className = 'col-1'>
                                        <div className = 'text-capitalize text-muted bold flex-h'>
                                            <span className = 'flex-1 single-line'>S/N</span>
                                        </div>
                                    </div>
                                    <div className = 'col-2'>
                                        <div className = 'text-capitalize text-muted bold flex-h'>
                                            <span className = 'flex-1 single-line'>title</span>
                                        </div>
                                    </div>
                                    <div className = 'col-3'>
                                        <div className = 'text-capitalize text-muted bold flex-h'>
                                            <span className = 'flex-1 single-line'>description</span>
                                        </div>
                                    </div>
                                    <div className = 'col-2'>
                                        <div className = 'text-capitalize text-muted bold flex-h'>
                                            <span className = 'flex-1 single-line'>MDA</span>
                                        </div>
                                    </div>
                                    <div className = 'col-2'>
                                        <div className = 'text-capitalize text-muted bold flex-h'>
                                            <span className = 'flex-1 single-line'>modules</span>
                                        </div>
                                    </div>
                                    <div className = 'col-2'>
                                        <div className = 'text-capitalize text-muted bold flex-h'>
                                            <span className = 'flex-1 single-line'>progress</span>
                                        </div>
                                    </div>
                                </div>{
                                    courseData && courseData.map(({course_data: {id, name, mda_name, description}, modules, module_progress: {total}}, index) => (
                                        <div key = {id} style = {{minWidth: '920px'}} className = 'row a-i-c p-3'>
                                            <div className = 'col-1'>
                                                <div className = 'text-capitalize text-muted bold flex-h'>
                                                    <span className = 'flex-1 single-line'>{++index}</span>
                                                </div>
                                            </div>
                                            <div className = 'col-2'>
                                                <div className = 'text-capitalize text-muted bold flex-h'>
                                                    <a href = {`./courses/${id}`} className = 'flex-1 single-line underline text-primary'>{name}</a>
                                                </div>
                                            </div>
                                            <div className = 'col-3'>
                                                <div className = 'text-capitalize text-muted bold flex-h'>
                                                    <span className = 'flex-1 single-line'>{description}</span>
                                                </div>
                                            </div>
                                            <div className = 'col-2'>
                                                <div className = 'text-capitalize text-muted bold flex-h'>
                                                    <span className = 'flex-1 single-line'>{mda_name}</span>
                                                </div>
                                            </div>
                                            <div className = 'col-2'>
                                                <div className = 'text-capitalize text-muted bold flex-h'>
                                                    <span className = 'flex-1 single-line'>{modules.length}</span>
                                                </div>
                                            </div>
                                            <div className = 'col-2'>
                                                <div className = 'text-capitalize text-muted bold flex-h'>
                                                    <span className = 'flex-1 single-line'>{total === modules.length ? 'completed' : 'in progress'}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
					</div>
				</div>
			</div>
        </Template>
    )
}

export const getServerSideProps = (context) => {
    const {req: {cookies}} = context
    const cookie = (cookies['E_LEARNING'] ? JSON.parse(cookies['E_LEARNING']) : undefined) || undefined

    if(typeof cookie !== 'object' || cookie.accountType !== 'user'){
        return {
            notFound: true
        }
    }

    return {
        props: {
            userData: cookie
        }
    }
}