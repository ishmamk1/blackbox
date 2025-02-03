# Project Setup Guide

## Installing Frontend Dependencies (React + Vite + TypeScript)

1. Navigate to the frontend directory:
   ```bash
   cd frontend

2. Install all required packages using npm:
    ```bash
    npm install

3. Start the development server:
    ```bash
    npm run dev

## Installing Backend Dependencies (Flask + Python)

1. Navigate to the backend directory:
   ```bash
   cd backend

2. Create a virtual environment (optional but recommended):
    ```bash
    python -m venv venv


3. Activate the virtual environment:
    ```bash
    source venv/bin/activate

4. Install all required Python packages:

    ```bash
    pip install -r requirements.txt

5. Run the Flask server:
    ```bash
    python run.py


## appContext & appProvider

`AppContext` is a React Context object created using createContext(). It serves as a global store that holds user authentication-related data (like token, email, and username) and provides functions (actions) to update and retrieve these values.

### It defines:

- **State:** Contains user authentication information (`token`, `email`, `username`).
- **Actions:** Provides functions for updating the state, logging out, and fetching data from an API.

`AppProvider` is a React component that wraps the application and provides the `AppContext` to all its child components. It manages the state and functions defined in `AppContext`, ensuring they persist across the app.

It defines:

- Initializes state with values stored in `sessionStorage` (to persist across page reloads).
- Defines functions to update state and store values in `sessionStorage`.
- Provides getter functions for retrieving the current user token and username.
- Implements a logout function to clear stored user data.

## How To Create Components Integrating User-Auth


### Creating Backend Endpoint

When creating the backend endpoint, create a folder inside the `api` directory.

Include statements such as: 

Define blueprint:
```bash
# Specify the blueprint name
blueprint_name = Blueprint('name', __name__)
```

Add `jwt_required()` tag to ensure that the endpoint can be accessed only with a form of authentication.

```bash
@jwt_required()
@bp_example.route("/example", methods=["GET"])
def endpoint():
    return jsonify({"test": "hello"}), 500
```

In `__init__.py`, make sure you import the blueprint as followed

```bash
from .auth import auth
# import other routes here

app.register_blueprint(auth, url_prefix="/")
```

### Adding User-Specific Components In The Frontend

In `frontend/src/components`, define a new component to use.

Make sure to import:

```bash
# To use the specific appContext
import { AppContext } from '../store/appContext';

# For the useContext function
import React, { useContext } from 'react';
```

In your component, define the AppContext along with your states like this:

```bash
const { state, actions } = useContext(AppContext);
```

Think of `state` as a variable that can access the username, email, or token by `state.email`, etc. `actions` is more like a class where you need to use functions to get the info.

To send data over, you will need to follow a function similar to this that sends over the bearer token.

```tsx
const handleSubmit = async () => {

    try {
      const response = await axios.post('http://127.0.0.1:5000/test', {state.username}, {
        headers: {
          "Authorization": "Bearer " + state.token,  // Include the Bearer token
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Post created successfully:", response.data);
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };
```

Back to integrating or adding any state-specific information to your "html" for the component, you can follow this. This is a simple conditional that checks if the state.token is valid, if so we display the user info, or else we don't (CAN BE FOUND IN `LandingPage.tsx`)

```tsx
{state.token != null ? (
        <div>
            <h1>Hello, {state.username}</h1>
            <h1>{state.token}</h1>
            <h1>{state.email}</h1>
        </div>
    ) : (
        <div>
            <h1>You are not authenticated.</h1>
        </div>
    )
}
```

## Set Up 'Keys' That Holds Sensitive Data

All keys are stored in `backend/keys`.

Most notably is the `service-account.json` file which should store your FireBase FireStore credentials in a JSON format.