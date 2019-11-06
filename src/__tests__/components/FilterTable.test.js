import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import FilterTable from '../../components/TableSorting/FilterTable';
import { get } from 'http';

describe('FilterTable', () => {
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
      roleShortName: 'ENROLADMI',
      roleName: 'Enrollment Administration',
      applicableSystems: 'Membership Quick View',
      effectiveDate: '07/20/2019 - 09/12/2019',
      action: 'acion'
    },
    {
      roleShortName: 'RMSCCPOS',
      roleName: 'MSCC POS',
      applicableSystems: 'Membership Quick View',
      effectiveDate: '07/20/2019 - 09/12/2019',
      action: 'acion'
    }
  ];
  const setFiltered = jest.fn();
  const data = MockData;
  it('should render the filtertable component', () => {
    render(
      <FilterTable data={data} setFiltered={setFiltered} fields={columns} />
    );
  });
  it('should have a dropdown with 6 options including the default', () => {
    const { container } = render(
      <FilterTable data={data} setFiltered={setFiltered} fields={columns} />
    );
    const dropdownOptions = container.querySelectorAll('option').length;
    expect(dropdownOptions).toEqual(6);
  });
  it('should have an input field', () => {
    const { container } = render(
      <FilterTable data={data} setFiltered={setFiltered} fields={columns} />
    );
    const inputField = container.querySelector('input');
    expect(inputField).toBeDefined();
  });
  describe('Search button', () => {
    it('search button should be disabled if inputvalue and dropdown value is null', () => {
      const { getByTestId } = render(
        <FilterTable data={data} setFiltered={setFiltered} fields={columns} />
      );
      const searchButton = getByTestId('searchButton');
      expect(searchButton.disabled).toEqual(true);
    });
    it('search button should be enabled when inputvalue and dropdown value is not null', () => {
      const { getByTestId, getByPlaceholderText } = render(
        <FilterTable data={data} setFiltered={setFiltered} fields={columns} />
      );
      const inputField = getByTestId('inputField');
      fireEvent.change(inputField, { target: { value: 'RMSCCPOS' } });

      const dropdownField = getByTestId('selectField');
      fireEvent.change(dropdownField, { target: { value: 'roleShortName' } });

      const searchButton = getByTestId('searchButton');
      expect(searchButton.disabled).toEqual(false);
    });
    it('should set the input field and select value to null if no results are found on button click', () => {
      const { getByTestId, getByPlaceholderText } = render(
        <FilterTable data={data} setFiltered={setFiltered} fields={columns} />
      );
      const inputField = getByTestId('inputField');
      fireEvent.change(inputField, { target: { value: 'xyz' } });

      const dropdownField = getByTestId('selectField');
      fireEvent.change(dropdownField, { target: { value: 'roleShortName' } });

      const searchButton = getByTestId('searchButton');
      fireEvent.click(searchButton);
      expect(inputField.value).toBe('');
      expect(dropdownField.value).toBe('');
    });
  });
  describe('Remove Filter button', () => {
    it('remove filter button should be disabled if inputvalue and dropdown value is null', () => {
      const { getByTestId } = render(
        <FilterTable data={data} setFiltered={setFiltered} fields={columns} />
      );
      const removeFilter = getByTestId('removeFilter');
      expect(removeFilter.disabled).toEqual(true);
    });
    it('remove filter button should be enabled when inputvalue and dropdown value is not null', () => {
      const { getByTestId, getByPlaceholderText } = render(
        <FilterTable data={data} setFiltered={setFiltered} fields={columns} />
      );
      const inputField = getByTestId('inputField');
      fireEvent.change(inputField, { target: { value: 'RMSCCPOS' } });

      const dropdownField = getByTestId('selectField');
      fireEvent.change(dropdownField, { target: { value: 'roleShortName' } });

      const searchButton = getByTestId('searchButton');
      fireEvent.click(searchButton);

      const removeFilter = getByTestId('removeFilter');
      expect(removeFilter.disabled).toEqual(false);
    });

    it('should set the input field and select value to null and disable remove filter when remove filter button is clicked', () => {
      const { getByTestId, getByPlaceholderText } = render(
        <FilterTable data={data} setFiltered={setFiltered} fields={columns} />
      );
      const inputField = getByTestId('inputField');
      fireEvent.change(inputField, { target: { value: 'RMSCCPOS' } });

      const dropdownField = getByTestId('selectField');
      fireEvent.change(dropdownField, { target: { value: 'roleShortName' } });

      const searchButton = getByTestId('searchButton');
      fireEvent.click(searchButton);

      const removeFilter = getByTestId('removeFilter');
      fireEvent.click(removeFilter);
      expect(inputField.value).toBe('');
      expect(dropdownField.value).toBe('');
      expect(removeFilter.disabled).toEqual(true);
      expect(setFiltered).toHaveBeenCalled();
    });
  });
});
