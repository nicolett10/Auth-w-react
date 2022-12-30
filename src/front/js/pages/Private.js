import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import land from "../../img/land.jpg";

export default function Private() {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    if (store.token && store.token !== "" && store.token !== undefined) {
      actions.getMessage();
    } else {
      navigate("/");
    }
  }, [store.token]);

  return (
    <>
      {store.token && store.token !== "" && store.token !== undefined && (
        <div className="contenedorPrincipal p-5" id="contenedorPrincipal"style={{ backgroundImage: `url(${land})`, backgroundRepeat: 'no-repeat',
        width: "100%", height: "80vh" }}>
          <div className="container2 bg-light p-5">
            This view is private. The message " {store.message} " comes from an
            authenticated request
          </div>
        </div>
      )}
    </>
  );
}
