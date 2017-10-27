import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Auth from '../../lib/Auth';

const Navbar = ({ history }) => {

  function logout(e) {
    e.preventDefault();

    Auth.logout();
    history.push('/');
  }

  return(

    <nav className="navbar navbar-light bg-light">
      {Auth.isAuthenticated() && <Link className="nav-item nav-link my-2" to="/">Home</Link>}
      {Auth.isAuthenticated() && <Link className="nav-item nav-link my-2" to="/products">Products</Link>}
      {Auth.isAuthenticated() && <Link className="nav-item nav-link my-2" to="/conversations">Conversations</Link>}
      {Auth.isAuthenticated() && <Link className="nav-item nav-link" to="/new">Add Product</Link>}
      {!Auth.isAuthenticated() && <Link to="/login" className="nav-item nav-link">Login</Link>}
      {!Auth.isAuthenticated() && <Link to="/register" className="nav-item nav-link">Register</Link>}
      {Auth.isAuthenticated() && <a href="#" onClick={logout} className="nav-item nav-link">Logout</a>}
    </nav>
  );
};

export default withRouter(Navbar);
