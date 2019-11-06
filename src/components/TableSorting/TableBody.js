import React, { useState } from 'react';

const TableBody = rowData => {
  const data = rowData.data;
  const accesorName = rowData.columnFields;
  let [showChild, setShowChild] = useState(true);
  let [showMoreLessText, setShowMoreLessText] = useState('Show More');

  const handleClick = () => {
    setShowChild(!showChild);
    showChild
      ? setShowMoreLessText('Show Less')
      : setShowMoreLessText('Show More');
  };
  return (
    <tr data-testid='rowData'>
      {accesorName.map((eachField, i) => {
        let k = eachField.accesor;
        let isExpandable = eachField.expandable;
        return (
          <td data-testid={'dataField'} key={i}>
            {data[k]}
            {isExpandable ? (
              <>
                <span data-testid={'moreMessage'} hidden={showChild}>
                  <br />
                  hello world
                </span>
                <br />
                <a href='#' data-testid={'showMoreLess'} onClick={handleClick}>
                  {showMoreLessText}
                </a>
              </>
            ) : (
              ''
            )}
          </td>
        );
      })}

      {/* <td>{data.id}</td>
        <td>
          {data.name}

          <span hidden={showChild}>
            <br />
            {data.website}
          </span>
          <br />
          <a href='#' onClick={handleClick}>
            {showMoreLessText}
          </a>
        </td>
        <td>{data.username}</td>
        <td>{data.email}</td>
        <td>
          {data.company.name}{' '}
          <div className='tooltip'>
            <button>+</button>
            <span className='tooltiptext'>
              <button>option1</button>
              <br />
              <button>option2</button>
            </span>
          </div>
        </td> */}
    </tr>
  );
};
export default TableBody;
