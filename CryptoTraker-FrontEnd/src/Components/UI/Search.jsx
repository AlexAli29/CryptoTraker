import React from 'react';
import cl from '../../Styles/css/search.module.css'

const Search = ({ ...props }) => {
  return (
    <>
      <input {...props} className={cl.search} type="text" />
    </>
  );
};

export default Search;