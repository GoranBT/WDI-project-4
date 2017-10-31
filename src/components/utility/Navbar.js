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


    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
          <Link className="brand font-lobster display-4 nav-link" to="/products  "><i className="fa fa-shopping-cart" aria-hidden="true"></i> eShopper
          </Link>
        </div>
        <div className="navbar-right">
          {Auth.isAuthenticated() && <Link className="navbar-brand" to="/products">Products</Link>}
          {Auth.isAuthenticated() && <Link className="navbar-brand" to="/products/new">Add Product</Link>}
          {Auth.isAuthenticated() && <Link className="navbar-brand" to="/conversations"><i className="fa fa-envelope" aria-hidden="true"></i></Link>}
          {Auth.isAuthenticated() && <a href="#" onClick={logout} className="navbar-brand"><i className="fa fa-sign-out" aria-hidden="true"></i> Logout</a>}
          {!Auth.isAuthenticated() && <Link to="/login" className="navbar-brand"><i className="fa fa-sign-in" aria-hidden="true"></i> Login</Link>}
          {!Auth.isAuthenticated() && <Link to="/register" className="navbar-brand"><i className="icon-chevron-sign-up" aria-hidden="true"></i> Register</Link>}
          {Auth.isAuthenticated() && <Link to={`/users/${Auth.getPayload().userId}`} className="navbar-brand"><i className="fa fa-user-o" aria-hidden="true"></i></Link>}
        </div>
      </div>
    </nav>

  );
};

export default withRouter(Navbar);
