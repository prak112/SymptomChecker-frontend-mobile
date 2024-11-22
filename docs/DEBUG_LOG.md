
## 1 - Building Navigation structure with Stack and Drawer
- Navigating from home/main screen to other additional screens in `react-native` was a challenge to implement when compared to `react`.
- The solution rested in importing two important sub-libraries from `react-navigation` 
    - `stack`
    - `drawer` 

- Home/main screen was defined using `createStackNavigator` and nested inside Drawer Navigation as `HomeStackNavigator`.
- All screens including home/main screen, as `HomeStackNavigator` were defined using `createDrawerNavigator`.

- This process allows the smooth navigation from different screens back to the home/main screen.


<hr>
</br>


## 2 - Symptom Form input autofocus and refocus
- `useRef` hook creates a reference to the `<TextInput>` component which allows direct interaction with the DOM element.
- In the current situation it provides autofocus to the input field.
- `useRef` calls the `focus` method on the `<TextInput>` component through `useEffect` hook to autofocus cursor in the input field when the component is mounted.

- Props within `<TextInput>` component reinforce the autofocus and refocus of the cursor back to the input field.

```javascript
    // screens/SymptomForm.jsx
    ...
    
    const inputRef = useRef(null);

    // Autofocus cursor in TextInput
    useEffect(() => {
        inputRef.current.focus();
    }, []);

    ...

    <TextInput
        ref={inputRef}
        ...
        returnKeyType="done"
        blurOnSubmit={false}
        autoCapitalize="none"
    >
        //text
    </TextInput>
    ...

    // rest of the components
```


<hr>
</br>


## 3 - Integration with Backend
- Importing `.env` variables to `api` service functions was handled in complex ways but missed the **Most suggested and simplest method -** to check the documentation.

- Voila! There it was, the Expo Documentation on [how to import environment variables](https://docs.expo.dev/guides/environment-variables/).

- The missing ingredient was the keyword format - `EXPO_PUBLIC_[NAME]`.


<hr>
</br>

## 4 - Implementing User Context with AsyncStorage
- **ERROR** : 
```bash
    D:\GitHub_Projects\SymptomChecker-frontend-mobile\symptom-checker\contexts\UserContext.jsx:31 
    Uncaught ReferenceError: useEffect is not defined
    at UserProvider (D:\GitHub_Projects\SymptomChecker-frontend-mobile\symptom-checker\contexts\UserContext.jsx:31:24)

    hook.js:608 The above error occurred in the <UserProvider> component:
    at UserProvider 
```

- **SOLUTION**:
    - Remove `<UserProvider />` wrapping around `<DrawerNavigator />`
    - Add import for `useEffect` hook in `UserContext`
    - Update `user` state definition from `object` to `null`

<hr>
</br>

## 5 - Login, Logout navigation errors
- **ERROR** :
    1. Login frontend is non-responsive and does not navigate to `Home`
    2. `user` state is not updated after login / signup / guest login
    3. `user` state is not cleared after logout
    4. `UserContext` consumption error or `user` state handling at authentication is not updating
        - To resolve start from : `UserContext.jsx`
- **SOLUTION** :
    1. Added `useNavigation` using `route.name` through `<DrawerNavigator />` pathway in user login and guest login event handlers
    2. Updated via `AsyncStorage` to set local storage. Reflected in `<Profile />` screen 
    3. Cleared, after handling `cookie` .
    4. `UserContext` consumption resolved by adding `<UserProvider />` around `<DrawerNavigator />`

<hr>
</br>

## 6 - `cookie` header to setup by using Axios Interceptor
- **ERROR** :
    - Symptoms data does not get accessed by backend since JWT is missing in the Request Headers.
    1. Client service `setup.js` has headers defined explicitly, hence need arises to set `auth_token` manually.
        - Start by undoing manual setup and see if it can be automated.
- **WIP** :
    1. In web apps, authentication process is handled by the server and sends the JWT as a 'cookie' in its response header, 'set-cookie'
        - Browsers automatically retrieve the cookie stored in 'set-cookie' header and stored in client request headers as 'cookie'
        - In mobile apps, the browser does not automate this process. This has to be manually handled by intercepting the client requests and server responses.
        - The main difference can be noticed via the 'User-Agent' header :
            
            - Mobile App
            ```json
                ...
                user-agent: Mozilla/5.0 (iPhone; CPU iPhone OS 16_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.6 Mobile/15E148 Safari/604.1
                ...
            ```

            - Web App
            ```json
                ...
                user-agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36
                ...
            ```
    2. Event after manually setting up the API service configuration by intercepting server responses at [auth.js](/symptom-checker/api/auth.js) and intercepting client requests at [symptoms.js](/symptom-checker/api/symptoms.js), the 'cookie' header does not show up in the client requests at the browser console (Network conditions).
        - Backend error persists, since the `auth_token` is not being supplied in the client request :
        ```
            ERROR during User identification :  JsonWebTokenError: jwt must be provided
        ```

- **SOLUTION** :
    2. **CORS setup** on the server side and the client side were overlooked. 
        - On the server-side config, the headers were supposed to be exposed to the client to retrieve the `set-cookie` header as follows :
        ```javascript
            // app.js
            ...
            // CORS - config frontend (web, mobile) for secure communication
            app.use(cors({
                origin: ['http://localhost:5173/','http://localhost:8081'],
                credentials: true,
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
            }))
            ...
        ```

        - On the client-side config, the request headers setup in [setup.js](/symptom-checker/api/utils/setup.js) was supposed to accept the server-side response headers as follows : 
        ```javascript
            ...
            // Setup client config
            export const client = axios.create({
            baseURL: NODE_BACKEND_URL,
            headers: {
                'Content-Type': 'application/json',
            },
            withCredentials: true,  // Ensure cookies are included in requests
            });
        ```


## 7 - Drawer Navigator conditional rendering of Logout or Login option
- **ERROR** :
    1. Conditional rendering of the option 'Logout' and 'Login' options in Drawer Navigator is based on the condition,
    ```javascript
        ...
            {user !== undefined ? 
            (
                ...
            ) : (
                ...
            )}        ...
    ```
    However, `UserContext` does not seem to be noticed for this particular render.
    
    2.`visible` status of the `<Modal />` component of 'Logout' and 'Authentication' do not switch between `true` and `false`.
        - Once the state is changed from `true` --> `false`, it does not switch back
        - This could probably handled better if state is lifted to `<App />` from `<ModalWrapper />`
        - Currently, react-native throws an error :
        ```
            Got both 'component' and 'children' props for the screen 'Logout'. You must pass only one of them.
        ```
        - UN-DID the prop-drilling process from `App` through `DrawerNavigator` to `ModalWrapper`
        - Conditional render in `DrawerNavigator` is defective, BUT, `<Profile />` recieves `user` updated state

- **SOLUTION** :
    1. Conditional rendering resolved by wrapping the `<NavigationContainer />` in `<App />` component with `<UserProvider />` component
        - Removed context wrapper (`<UserProvider />`) around `DrawerNavigator`
        - `DrawerNavigator` conditional rendering resolved by improving condition syntax :
        ```javascript
            ...
            {!user ? 
            (
                ...
            ) : (
                ...
            )}
            ...
        ```
        - Additionally, conditionally rendered a `Login`, `Logout` button in `<Profile />` component
    2. *WIP*
    - Tried internal state management inside `LogoutModal`
    - Tried lifting state up to `<App />` component to manage state from top-level
    - Tried multiple strategies to lift state up and manage from `<App />` component
    - BUG persists! `visible` remains undefeated, unchanged after 1st render and 1st state update!!