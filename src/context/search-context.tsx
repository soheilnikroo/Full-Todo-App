import { createContext, useState } from 'react';

export const SearchContext = createContext({
  searchTerm: '',
  handleSearchTermChange: (searchTerm: string) => {},
});

const SearchProvider: React.FC = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchTermChange = (searchTerm: string) => {
    setSearchTerm(searchTerm);
  };

  return (
    <SearchContext.Provider
      value={{
        searchTerm,
        handleSearchTermChange,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
