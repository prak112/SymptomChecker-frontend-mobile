/**
 * Node modules
*/
import { createContext, useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import propTypes from 'prop-types'

/**
 * Context content
 */
export const UserContext = createContext()


/**
 * Provider component for user context that manages user authentication state.
 * Retrieves authenticated user data from AsyncStorage on mount and provides it to child components.
 * 
 * @component
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components that will have access to user context
 * @returns {JSX.Element} UserProvider component that wraps child components with user context
 */
export function UserProvider({ children }) {
    const [user, setUser] = useState({
        username: '',
        registrationTime: ''
    })
    
    // retrieve authenticated user
    useEffect(() => {
        const fetchUser = async() => {
            const user = await AsyncStorage.getItem('authenticatedUser')
            if(user){
                setUser(JSON.parse(user))
            }
        }
        fetchUser()    
    }, []);

    return(
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: propTypes.node.isRequired,
}






// import AsyncStorage from 'react-native';
 
// // Replace sessionStorage usage with AsyncStorage
// const storeUser = async (user) => {
//     try {
//         await AsyncStorage.setItem('authenticatedUser', JSON.stringify(user));

//     } catch (error) {
//         console.error('Error storing user data:', error);
//     }
// };
