import { Navigate } from "react-router-dom";

const getState = ({ getStore, getActions, setStore }) => {

  return {
    store: {
      token: null,
      currentUser: null,
      errorMessage: false,

    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "red");
      },

      getMessage: async () => {
        try {
          const store = getStore();
          const options = {
            headers: {
              "Authorization": "Bearer " + store.token
            }
          }
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello", options);
          const data = await resp.json();
          setStore({ message: data.msg });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      syncTokenFromSessionStorage: () => {
        const token = sessionStorage.getItem("token");
        if (token && token !== "" && token !== undefined) setStore({ token: token })

      },
      checkUser: () => {
        console.log("checkeando usuario");
        if (sessionStorage.getItem("currentUser")) {
          setStore({
            currentUser: JSON.parse(sessionStorage.getItem("currentUser"))
          })
        }
      },
      logout: () => {
        sessionStorage.removeItem("token");
        setStore({ token: null });
        setStore({ errorMessage: false });


      },
      login: async (email, password, navigate) => {
        const options = {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "email": email,
            "password": password
          })
        }
        try {
          const res = await fetch(`${process.env.BACKEND_URL}/api/token`, options)
          if (res.status !== 200) {
            setStore({ errorMessage: true });
            return false;
          }
          const data = await res.json()
          sessionStorage.setItem("token", data.data.access_token)
          setStore({ token: data.data.access_token })
          navigate("/private");
          return true;

        }
        catch (error) {
          console.log("Error login in")
        }

        //

      },

    },
  };
};

export default getState;