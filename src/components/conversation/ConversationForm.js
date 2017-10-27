import React from 'react';



const ConversationForm = ({ handleChange, handleSubmit, message }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="message"
          placeholder="type your message"
          onChange={handleChange}
          value={message}
          className="form-control"
        />
      </div>

      <button className="btn btn-primary">Send</button>
    </form>
  );
};

export default ConversationForm;
