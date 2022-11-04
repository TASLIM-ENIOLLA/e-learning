import Template from '/components/dashboard/Template'
import {JWTVerficationComponent} from '/components/jwt'

export default function Index({jwt_token, account_type}){
    return (
        <JWTVerficationComponent jwt_token = {jwt_token}>
            <Template account_type = 'admin'>
                <div className="row a-i-c">
                    <div className = 'col-12 mb-4'>
                        <h4 className = 'theme-color'>Dashboard</h4>
                    </div>
                </div>
            </Template>
        </JWTVerficationComponent>
    )
}

export function getServerSideProps(context){
    const {req: {cookies}} = context
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
