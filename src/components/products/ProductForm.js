import React from 'react';
import DragDrop from '../utility/DragDrop';
import AutoComplete from '../utility/AutoComplete';

function ProductForm({ categories, handleSubmit, handleChange, handleLocationChange, product, errors, getAutocompleteInfo }) {
  console.log(product);
  return (

    <div className="row justify-content-around">

      <form onSubmit={handleSubmit} className="newProduct shaddow white box rounded col-md-9">

        <label htmlFor="name"><strong>Name</strong></label>
        <div className={errors.name ? 'form-group has-warning' : 'form-group'}>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={product.name}
            onChange={handleChange}
          />
          {errors.name && <small className="has-warning">{errors.name}</small>}
        </div>

        <label htmlFor="description"><strong>Description</strong></label>
        <div className={errors.description ? 'form-group has-warning' : 'form-group'}>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={product.description}
            onChange={handleChange}
          />
          {errors.description && <small className="has-warning">{errors.description}</small>}
        </div>

        <label htmlFor="price"><strong>Price</strong></label>
        <div className={errors.price ? 'form-group has-warning' : 'form-group'}>
          <input
            type="text"
            className="form-control"
            id="price"
            name="price"
            value={product.price}
            onChange={handleChange}
          />
          {errors.price && <small className="has-warning">{errors.price}</small>}
        </div>

        <label htmlFor="image"><strong>Image</strong></label>
        <div className={errors.image ? 'form-group has-warning' : 'form-group'}>
          <DragDrop
            onChange={handleChange}
            value={product.base64 || product.imageSRC}
          />
          {errors.image && <small className="has-warning">{errors.image}</small>}
        </div>

        <label htmlFor="condition"><strong>Condition</strong></label>
        <div className={errors.condition ? 'form-group has-warning' : 'form-group'}>
          <input
            type="text"
            className="form-control"
            id="condition"
            name="condition"
            value={product.condition}
            onChange={handleChange}
          />
          {errors.condition && <small className="has-warning">{errors.condition}</small>}
        </div>
        <label htmlFor="location"><strong>Location</strong></label>
        <AutoComplete getAutocompleteInfo={getAutocompleteInfo} value={location}  />
        <div className="hid-location form-group">
          <label htmlFor="lat">Location Lat</label>
          <input
            type="text"
            className="form-control"
            id="lat"
            name="lat"
            value={product.location.lat}
            onChange={handleLocationChange}
          />
        </div>
        <div className="form-group hid-location">
          <label htmlFor="location.lng">Location Lng</label>
          <input
            type="text"
            className="form-control"
            id="location.lng"
            name="lng"
            value={product.location.lng}
            onChange={handleLocationChange}
          />
        </div>

        <label htmlFor="category"><strong>Category</strong></label>
        <div className={errors.category ? 'form-group has-warning' : 'form-group'}>
          <select
            className="form-control"
            id="category"
            name="category"
            defaultValue=""
            onChange={handleChange}
          >
            <option value="" disabled>Please Select</option>
            {categories.map((category)=>
              <option key={category.id} value={category.id}>{category.name}</option>
            )}
          </select>
          {errors.category && <small className="has-warning">{errors.category}</small>}
        </div>
        <div>
          <button className="btn btn-outline-success">Save</button>
        </div>
      </form>
    </div>
  );
}

export default ProductForm;
