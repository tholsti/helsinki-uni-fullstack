import React from 'react';
import { connect } from 'react-redux';
import { changeFilterValue } from '../reducers/filterReducer';

const Filter = ({ changeFilterValue, filter }) => {
  const handleChange = (event) => {
    // input-kentän arvo muuttujassa event.target.value
    changeFilterValue(event.target.value);
  };

  const style = {
    marginBottom: 10
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
}

const mapStateToProps = ({ filter }) => ({ filter });
    

export default connect(mapStateToProps, { changeFilterValue })(Filter);
