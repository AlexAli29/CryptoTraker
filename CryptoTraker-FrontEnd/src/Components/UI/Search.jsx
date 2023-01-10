import React from 'react';
import cl from '../../Styles/scss/search.module.scss'

const Search = ({ ...props }) => {
  return (
    <>
      <input {...props} className={cl.search} type="text" />
    </>
  );
};

export default Search;