import React from 'react';
import DragDrop from '../utility/DragDrop';


const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className={errors.username ? 'form-group has-warning' : 'form-group'}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          value={user.username}
          className="form-control"
        />
        {errors.username && <small className="has-warning">{errors.username}</small>}
      </div>

      <div className={errors.email ? 'form-group has-warning' : 'form-group'}>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
          className="form-control"
        />
        {errors.email && <small className="has-warning">{errors.email}</small>}
      </div>

      <div className={errors.image ? 'form-group has-warning' : 'form-group'}>
        <label htmlFor="image"><strong>Image</strong></label>
        <DragDrop
          onChange={handleChange}
          value={user.base64 || user.imageSRC}
        />
        {errors.image && <small className="has-warning">{errors.image}</small>}
      </div>


      <div className={errors.password ? 'form-group has-warning' : 'form-group'}>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
          className="form-control"
        />
        {errors.password && <small className="has-warning">{errors.password}</small>}
      </div>

      <div className={errors.passwordConfirmation ? 'form-group has-warning' : 'form-group'}>
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={user.passwordConfirmation}
          className="form-control"
        />
        {errors.passwordConfirmation && <small className="has-warning">{errors.passwordConfirmation}</small>}
      </div>

      <button className="btn btn-primary">Register</button>
    </form>
  );
};

export default RegisterForm;
