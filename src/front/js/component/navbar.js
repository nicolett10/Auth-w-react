import React, {useContext} from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Navbar = () => {
	const { store, actions } = useContext(Context);
	return (
		<nav className="navbar navbar-light sticky-top" style={{background: "#9c94db"}}>
			<div className="container-fluid">
				<Link to="/" className="text-decoration-none">
					<span className="navbar-brand mb-0 h1"style={{ color: 'white'}}>Welcome</span>
				</Link>
				<div className="ml-auto">
					{!store.token ? 
					<Link to="/">
						<button className="btn " style={{ backgroundColor: '#8b64bc', color: 'white' }}>Login</button>
					</Link> : 
					<button onClick={() => actions.logout()} className="btn "style={{ backgroundColor: '#8b64bc', color: 'white' }}>Log out</button>		
					}
				</div>
			</div>
		</nav>
	);
};
