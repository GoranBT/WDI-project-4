import React from 'react';


const LoginForm = ({ handleChange, handleSubmit, credentials, errors }) => {
  return (
    <form onSubmit={handleSubmit} className="box rounded col-md-6">
      <div className="form-group">
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={credentials.email}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={credentials.password}
          className="form-control"
        />
        {errors && <small className="has-error">{errors}</small>}
      </div>

      <button className="btn btn-primary">Login</button>
    </form>
  );
};

export default LoginForm;
