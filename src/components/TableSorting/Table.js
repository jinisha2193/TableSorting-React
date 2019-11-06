import React, { useState } from 'react';
import FilterTable from './FilterTable';
import Pagination from './Pagination';
import './Table.scss';
import TableBody from './TableBody';

const Table = peopleInfo => {
  const allPeopleData = peopleInfo.data;
  const headers = peopleInfo.column;

  const [people, setPeople] = useState(allPeopleData);

  const [ascending, setAscending] = useState(true);
  const [numberOfPeople, setNumberOfPeople] = useState(allPeopleData);

  const sortData = objKey => {
    let sortedData = [];
    if (ascending) {
      sortedData = people.sort((a, b) =>
        a[objKey]
          .toString()
          .localeCompare(b[objKey])
          .toString()
      );
    } else {
      sortedData = people.sort((a, b) =>
        b[objKey].toString().localeCompare(a[objKey].toString())
      );
    }
    setAscending(!ascending);
    setPeople(sortedData);
  };

  const checkPeople = val => {
    if (val.length > 0) {
      setNumberOfPeople(val);
      setPeople(val);
    } else {
      setNumberOfPeople(allPeopleData);
      setPeople(allPeopleData);
    }
  };

  return (
    <div className='tableContainer' data-testid={'tableContainer'}>
      <FilterTable
        data={allPeopleData}
        setFiltered={checkPeople}
        fields={headers}
      />
      <h2>Search Results</h2>
      <table>
        <thead>
          <tr>
            {headers.map((eachData, index) => (
              <th key={index} data-testid={'headerName'}>
                {eachData.header}
                <button
                  data-testid={'sortButton-' + eachData.accesor}
                  onClick={() => sortData(eachData.accesor)}
                >
                  sort
                </button>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {people.map((value, i) => (
            <TableBody key={i} data={value} columnFields={headers} />
          ))}
        </tbody>
      </table>
      <Pagination totalPages={numberOfPeople} perPageData={setPeople} />
    </div>
  );
};
export default Table;
