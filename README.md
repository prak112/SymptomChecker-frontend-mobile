# Overview
- This repository serves as a Mobile Client for Symptom Checker application.
- Mobile Client is responsible for providing a responsive and smooth UI for mobile users with :
  - authentication prompt to register as user or guest
  - main screen with input and analysis selection for diagnosing symptoms,
  - sidebar navigation with access to auth, profile, FAQs and history,
  - loading screen with approximate response times,
  - diagnosis screen with summarized display under symptom headings with symptom-relative scoring and further reading redirect URLs.
- <em>The application UI clearly displays a disclaimer at all times about the possible inaccuracies this application could generate.</em>

- Prototype, plan and implementation of the Symptom Checker application are defined in the [prototype README](https://github.com/prak112/ICD11-SymptomChecker#overview)
- Tools and Technologies used :
    - `react-native`: Framework for building native mobile apps using JavaScript and React for cross-platform functionality (Andriod, iOS).   
    - `expo`: Platform for building, deploying, and managing React Native apps across web and mobile platforms.
    - `react-native-paper`: Replacement for Material UI components in React Native. Provides components that adhere to Material Design guidelines.
    - `axios` : Establishes communication with server-side application

<hr>
<br>

# Workflow
- Similar to Web Development workflow, except for navigation.
- Mobile Development uses [React Navigation](https://reactnavigation.org/docs/getting-started) instead of [React Router](https://reactrouter.com/home)
- [See workflow](https://github.com/prak112/Symptom-Checker-frontend?tab=readme-ov-file#workflow) 

<hr>
<br>

# Usage
- Make sure you have `node`(v20.11.0) and `npm`(v10.5.0) installed on your machine before running these commands.

- Clone the project
```bash
    git clone https://github.com/prak112/SymptomChecker-frontend-mobile.git
```

- Install dependencies using `npm`
```bash
    cd Symptom-Checker-frontend-mobile/symptom-checker
    npm install
```

- Run the development server
```bash
    npm run web
```

<hr>
<br>

# Credits
- **Coding Assistants** : 
    - Claude 3.5 Sonnet
    - Pieces Copilot
    - GitHub Copilot
- **Documentation Tool** : Mermaid

<hr>
<hr>
