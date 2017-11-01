import React from 'react';
import { Row, Col, FormGroup, FormControl } from 'react-bootstrap';


const SearchBar = ({ handleSort, handleSearch, categories, handleOrigin }) => {

  return(
    <Row>
      <Col md={12}>
        <FormGroup>
          <FormControl componentClass="select" onChange={handleOrigin}>
            <option className="dropdown-item" value="">Select</option>
            {categories.map((category)=>
              <option className="dropdown-item" key={category.id} default={''} value={category.name}>{category.name}</option>
            )}
          </FormControl>
        </FormGroup>
      </Col>
      <Col md={12}>
        <FormGroup>
          <FormControl componentClass="select" onChange={handleSort}>
            <option value="price|desc">Price (High - Low)</option>
            <option value="price|asc">Price (Low - High)</option>
            <option value="name|asc">Name (A - Z)</option>
            <option value="name|desc">Name (Z - A)</option>
          </FormControl>
        </FormGroup>
      </Col>
      <Col md={12}>
        <FormGroup>
          <FormControl type="text" placeholder="Search" onChange={handleSearch} />
        </FormGroup>
      </Col>
    </Row>
  );
};

export default SearchBar;
