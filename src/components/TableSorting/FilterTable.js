import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const FilterTable = person => {
  const [inputValue, setInputValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [disableRemoveFilter, setDisableRemoveFilter] = useState(true);

  const columnHeaders = person.fields;

  const handleChange = e => {
    e.target.name === 'inputField'
      ? setInputValue(e.target.value)
      : setSelectValue(e.target.value);
  };

  const handleClick = property => {
    const filteredData = person.data.filter(
      eachData => eachData[property.selectValue] === inputValue
    );

    if (filteredData.length > 0) {
      person.setFiltered(filteredData);
      setDisableRemoveFilter(false);
    } else {
      alert('no match');
      setInputValue('');
      setSelectValue('');
    }
  };

  const removeFilter = () => {
    setDisableRemoveFilter(true);
    setInputValue('');
    setSelectValue('');
    person.setFiltered([]);
  };
  return (
    <div>
      <select
        value={selectValue}
        name={'selectField'}
        data-testid='selectField'
        onChange={handleChange}
      >
        <option value=''>Select an option</option>
        {columnHeaders.map((eachData, index) => (
          <option key={index} value={eachData.accesor}>
            {eachData.header}
          </option>
        ))}
      </select>
      <input
        value={inputValue}
        name='inputField'
        data-testid='inputField'
        onChange={handleChange}
      />
      <button
        data-testid={'searchButton'}
        disabled={inputValue === '' || selectValue === '' ? true : false}
        onClick={() => handleClick({ selectValue })}
      >
        <FaSearch />
      </button>
      <br />

      <button
        data-testid={'removeFilter'}
        disabled={disableRemoveFilter}
        onClick={removeFilter}
      >
        Remove Filter
      </button>
    </div>
  );
};
export default FilterTable;
