import Template from '/components/dashboard/Template'

export default function Index(){
    const routeArray = [
        'available-courses',
        'registered-courses',
        'completed-courses'
    ]
    return (
        <Template>
            <div className="row a-i-c">
                <div className = 'col-lg-10'>
                    <div className = 'row rounded-1x bg-white py-4 shadow-sm'>
                        <div className = 'col-12 mb-3'>
                            <p className = ''>Are you sure you want to logout?</p>
                        </div>
                        <div className = 'col-auto'>
                            <button className = 'bg-danger px-5 py-3 rounded-1x border-0 shadow-sm bold text-capitalize text-white'>logout</button>
                        </div>
                        <div className = 'col-auto'>
                            <button className = 'px-5 py-3 rounded-1x border-0 shadow-sm bold text-capitalize text-dark'>cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </Template>
    )
}
