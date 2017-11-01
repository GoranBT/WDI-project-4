import React from 'react';

const CommentsForm = ({handleChange, handleSubmit, comment}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="comment"
        onChange={handleChange}
        value={comment}
      />
      <button>Add</button>
    </form>
  );
};

export default CommentsForm;
