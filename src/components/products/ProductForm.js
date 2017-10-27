import React from 'react';



function ProductForm({ handleSubmit, handleChange, product, errors }) {
  return (
    
    <div className="row">
      <form onSubmit={handleSubmit} className="col-md-6">
        <div className={errors.name ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          {errors.name && <small className="has-error">{errors.name}</small>}
        </div>
        <div className={errors.description ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
          {errors.description && <small className="has-error">{errors.description}</small>}
        </div>
        <div className={errors.description ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="price">Price</label>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
          {errors.price && <small className="has-error">{errors.price}</small>}
        </div>
        <div className={errors.image ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="image">Image</label>
          <input
            type="text"
            className="form-control"
            id="image"
            name="image"
            value={product.image}
            onChange={handleChange}
          />
          {errors.image && <small className="has-error">{errors.image}</small>}
        </div>
        <div className={errors.condition ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="condition">Condition</label>
          <input
            type="text"
            className="form-control"
            id="condition"
            name="condition"
            value={product.condition}
            onChange={handleChange}
          />
          {errors.condition && <small className="has-error">{errors.condition}</small>}
        </div>
        <div className={errors.condition ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="condition">Condition</label>
          <input
            type="text"
            className="form-control"
            id="condition"
            name="condition"
            value={product.condition}
            onChange={handleChange}
          />
          {errors.condition && <small className="has-error">{errors.condition}</small>}
        </div>
        <div className={errors.condition ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="condition">Condition</label>
          <input
            type="text"
            className="form-control"
            id="condition"
            name="condition"
            value={product.condition}
            onChange={handleChange}
          />
          {errors.condition && <small className="has-error">{errors.condition}</small>}
        </div>
        <div className={errors.category ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="category">Category</label>
          <select
            className="form-control"
            id="category"
            name="category"
            value={product.category}
            onChange={handleChange}
          >
            <option value="" disabled>Please Select</option>
            <option>Breakfast</option>
            <option>Lunch</option>
            <option>Dinner</option>
            <option>Desert</option>
          </select>
          {errors.category && <small className="has-error">{errors.category}</small>}
        </div>
        <div>
          <button className="save-button">Save</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
