import { IonIcon, IonSearchbar } from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { searchIcon } from '../../assets';
import { SearchContext } from '../../context/search-context';

// import css
import classes from './style/Search.module.css';

const Search: React.FC = () => {
  const { handleSearchTermChange, searchTerm } = useContext(SearchContext);
  const [serachOpen, setSearchOpen] = useState(false);
  // const [searchTerm, setSearchTerm] = useState('Search');

  const openSearchBar = () => {
    setSearchOpen(true);
  };

  const closeSearchBar = () => {
    setSearchOpen(false);
  };

  const handleSearch = (e: CustomEvent) => {
    // setSearchTerm(e.detail.value);
    handleSearchTermChange(e.detail.value);
  };

  useEffect(() => {
    if (searchTerm === '' && !serachOpen) {
      // setSearchTerm('Search');
      handleSearchTermChange('Search');
    }
  }, [searchTerm, serachOpen]);

  return (
    <div onClick={openSearchBar} className={classes['search']}>
      {serachOpen && (
        <IonSearchbar
          inputMode="search"
          mode="ios"
          animated={true}
          onIonChange={handleSearch}
          onBlur={closeSearchBar}
          type="search"
          searchIcon={searchIcon}
          value={searchTerm}
          className={classes['search-bar']}
        ></IonSearchbar>
      )}
      {!serachOpen && (
        <IonIcon className={classes['search-icon']} src={searchIcon} />
      )}
    </div>
  );
};

export default Search;
