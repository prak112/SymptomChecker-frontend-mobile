/**
 * Node modules
*/
import { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PropTypes from 'prop-types'

/**
 * Context content
 */
export const UserContext = createContext({
    user: null,
    setUser: () => {}
})


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
    const [user, setUser] = useState(null)

    return(
        <UserContext.Provider value={{ user, setUser }}>
            { children }
        </UserContext.Provider>
    )
}

UserProvider.propTypes = {
    children: PropTypes.node.isRequired,
}
