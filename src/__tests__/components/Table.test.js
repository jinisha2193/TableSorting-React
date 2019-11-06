import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Table from '../../components/TableSorting/Table';

describe('Table', () => {
  const columns = [
    {
      header: 'Role Short Name',
      accesor: 'roleShortName'
    },
    {
      header: 'Role Name',
      accesor: 'roleName'
    },
    {
      header: 'Applicable Systems',
      accesor: 'applicableSystems',
      expandable: true
    },
    {
      header: 'Effective Date',
      accesor: 'effectiveDate'
    },
    {
      header: 'Action',
      accesor: 'action'
    }
  ];

  const MockData = [
    {
      roleShortName: 'RMSCCPOS',
      roleName: 'Enrollment Administration',
      applicableSystems: 'Membership Quick View',
      effectiveDate: '07/20/2019 - 09/12/2019',
      action: 'acion'
    },
    {
      roleShortName: 'ENROLADMI',
      roleName: 'MSCC POS',
      applicableSystems: 'Membership Quick View',
      effectiveDate: '07/20/2019 - 09/12/2019',
      action: 'acion'
    }
  ];

  it('should render table component', () => {
    render(<Table data={MockData} column={columns} />);
  });

  it('should have 5 header columns', () => {
    const { getAllByTestId } = render(
      <Table data={MockData} column={columns} />
    );
    let columnData = [];
    columnData = getAllByTestId('headerName');

    for (let i = 0; i < columnData.length; i++) {
      expect(columnData[i].textContent).toContain(columns[i].header);
    }
  });

  it('should have 2 rows of data', () => {
    const { getAllByTestId } = render(
      <Table data={MockData} column={columns} />
    );
    let numberOfRows = [];
    numberOfRows = getAllByTestId('rowData').length;
    expect(numberOfRows).toEqual(2);
  });

  it('should sort the data when sort button is clicked based on roleshortname', () => {
    const { container, getByTestId } = render(
      <Table data={MockData} column={columns} />
    );
    let tdLentgh = [];
    tdLentgh = container.querySelectorAll("[data-testid='rowData'] td");

    const sortButtonRoleShortName = getByTestId('sortButton-roleShortName');
    fireEvent.click(sortButtonRoleShortName);
    expect(tdLentgh[0].textContent).toEqual('ENROLADMI');
    fireEvent.click(sortButtonRoleShortName);
    expect(tdLentgh[0].textContent).toEqual('RMSCCPOS');
  });

  it('should show filtered data when filter button is pressed', () => {
    const { getByTestId, getAllByTestId } = render(
      <Table data={MockData} column={columns} />
    );
    const inputField = getByTestId('inputField');
    fireEvent.change(inputField, { target: { value: 'ENROLADMI' } });

    const dropdownField = getByTestId('selectField');
    fireEvent.change(dropdownField, { target: { value: 'roleShortName' } });

    const searchButton = getByTestId('searchButton');
    fireEvent.click(searchButton);
    let numberOfRows = [];
    numberOfRows = getAllByTestId('rowData').length;
    expect(numberOfRows).toEqual(1);
  });
  it('should reset the table when remove filter button is clicked', () => {
    const { getByTestId, getAllByTestId } = render(
      <Table data={MockData} column={columns} />
    );
    const inputField = getByTestId('inputField');
    fireEvent.change(inputField, { target: { value: 'ENROLADMI' } });

    const dropdownField = getByTestId('selectField');
    fireEvent.change(dropdownField, { target: { value: 'roleShortName' } });

    const searchButton = getByTestId('searchButton');
    fireEvent.click(searchButton);

    const removeFilter = getByTestId('removeFilter');
    fireEvent.click(removeFilter);
    let numberOfRows = [];
    numberOfRows = getAllByTestId('rowData').length;
    expect(numberOfRows).toEqual(2);
  });
});
