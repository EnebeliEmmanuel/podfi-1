// src/SearchComponent.js
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';

const SEARCH_QUERY = gql`
  query Search($term: String!) {
    contents(where: { title_contains: $term }) {
      id
      title
      contentUri
    }
  }
`;

const SearchComponent = () => {
  const [term, setTerm] = useState('');
  const { loading, error, data } = useQuery(SEARCH_QUERY, {
    variables: { term },
    skip: !term,
  });

  const handleSearch = (e) => {
    setTerm(e.target.value);
  };

  return (
    <div>
      <input type="text" placeholder="Search..." value={term} onChange={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.contents.map((content) => (
        <div key={content.id}>
          <h3>{content.title}</h3>
          <a href={content.contentUri} target="_blank" rel="noopener noreferrer">
            View Content
          </a>
        </div>
      ))}
    </div>
  );
};

export default SearchComponent;
