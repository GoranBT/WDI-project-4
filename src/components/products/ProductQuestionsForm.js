import React from 'react';

const QuestionsForm = ({handleChange, handleSubmit, question}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Ask me a question"
        onChange={handleChange}
        value={question}
      />
      <button className="hidden">Add</button>
    </form>
  );
};

export default QuestionsForm;
