import React from 'react';



const ConversationForm = ({ handleChange, handleSubmit, message, errors }) => {
  return (
    <div>
      <form className=" col-sm-11 col-xs-12" onSubmit={handleSubmit}>
        <div className={errors.message ? 'form-group has-error' : 'form-group'}>
          <input
            type="text"
            name="message"
            placeholder="type your message"
            onChange={handleChange}
            value={message}
            className="form-control"
          />
          {errors.message && <small className="has-error">{errors.message}</small>}
          <button  className="btn btn-primary hidden">Send</button>
        </div>
      </form>
    </div>
  );
};

export default ConversationForm;
