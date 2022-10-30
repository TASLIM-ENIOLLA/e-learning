import Template from '/components/dashboard/Template'

export default function Index(){
    const routeArray = [
        'available-courses',
        'registered-courses',
        'completed-courses'
    ]
    return (
        <Template>
            <div className="row a-i-c">{
                routeArray.map(category => (
                    <div className="col-lg-3 mb-4">
                        <CoursesCards category = {category} />
    				</div>
                ))
            }</div>
        </Template>
    )
}

function CoursesCards({category = ''}){
    return (
        <a href = {`./dashboard/courses?c=${category}`} style = {{minHeight: '200px'}} className = 'bg-white rounded-1x shadow-sm py-4 px-2 d-block w-100 underline-0'>
            <div className="row a-i-c">
                <div className="col">
                    <div className="text-muted text-capitalize mb-2 one-line">{category.replace('-', ' ')}</div>
                    <h4 className="text-primary bold m-0 one-line">{new Intl.NumberFormat().format(46257)}</h4>
                </div>
                <div className="col-auto">
                    <div className="bg-light px-3 py-2 border rounded-lg">
                        <div className="bi bi-journals fa-2x text-muted"></div>
                    </div>
                </div>
            </div>
        </a>
    )
}
