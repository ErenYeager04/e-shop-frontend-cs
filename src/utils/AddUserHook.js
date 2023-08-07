import { useDispatch } from 'react-redux'
import { addUser } from '../store/userSlice'
import jwt_decode from 'jwt-decode'

export const AddUserHook = () => {
    const dispatch = useDispatch()

    const userHook = (token) => {
        const decodedToken = jwt_decode(token)
        // Assigning variables
        const userId = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'];
        const email = decodedToken['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];
        const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

        localStorage.setItem('user', token)
        dispatch(addUser({userId: userId, email: email, role: role, token: token}))
    }

    return { userHook }
}