import React from 'react';
import DragDrop from '../utility/DragDrop';
import AutoComplete from '../utility/AutoComplete';

function ProductForm({ categories, handleSubmit, handleChange, handleLocationChange, product, errors, getAutocompleteInfo }) {
  return (

    <div className="row justify-content-around">

      <form onSubmit={handleSubmit} className="white box rounded col-md-7">
        <div className={errors.name ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="name"><strong>Name</strong></label>
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
          <label htmlFor="description"><strong>Description</strong></label>
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
        <div className={errors.price ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="price"><strong>Price</strong></label>
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
          <label htmlFor="image"><strong>Image</strong></label>
          <DragDrop
            onChange={handleChange}
            value={product.base64 || product.imageSRC}
          />
          {errors.image && <small className="has-error">{errors.image}</small>}
        </div>
        <div className={errors.condition ? 'form-group has-error' : 'form-group'}>
          <label htmlFor="condition"><strong>Condition</strong></label>
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
        <AutoComplete getAutocompleteInfo={getAutocompleteInfo} value={location}  />
        <div className="form-group">
          <label htmlFor="lat">Location Lat</label>
          <input
            type="text"
            className="form-control"
            id="lat"
            name="lat"
            value={product.location.lat}
            onChange={handleLocationChange}
          />
          {/* {errors.location.lat && <small className="has-error">{errors.location.lat}</small>} */}
        </div>
        <div className="form-group">
          <label htmlFor="location.lng">Location Lng</label>
          <input
            type="text"
            className="form-control"
            id="location.lng"
            name="lng"
            value={product.location.lng}
            onChange={handleLocationChange}
          />
          {/* {errors.location.lng && <small className="has-error">{errors.location.lng}</small>} */}
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
            {categories.map((category)=>
              <option key={category.id} value={category.id}>{category.name}</option>
            )}
          </select>
          {errors.category && <small className="has-error">{errors.category}</small>}
        </div>
        <div>
          <button className="btn btn-outline-success">Save</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
