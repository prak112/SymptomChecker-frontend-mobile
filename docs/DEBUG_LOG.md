
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

