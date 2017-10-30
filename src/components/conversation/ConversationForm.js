import React from 'react';



const ConversationForm = ({ handleChange, handleSubmit, message }) => {
  return (
    <div>
      <form className=" col-sm-11 col-xs-12" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="message"
            placeholder="type your message"
            onChange={handleChange}
            value={message}
            className="form-control"
          />
          <button id="hidden" className="btn btn-primary">Send</button>
        </div>

      </form>
    </div>
  );
};

export default ConversationForm;
