import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import TableBody from '../../components/TableSorting/TableBody';

describe('Table Body', () => {
  const mockData = {
    roleShortName: 'ENROLADMI',
    roleName: 'Enrollment Administration',
    applicableSystems: 'Membership Quick View',
    effectiveDate: '07/20/2019 - 09/12/2019',
    action: 'acion'
  };
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
  it('should render the component', () => {
    render(<TableBody data={mockData} columnFields={columns} />);
  });

  it('should have 5 data columns', () => {
    const { getAllByTestId } = render(
      <TableBody data={mockData} columnFields={columns} />
    );

    const totalDatColumns = getAllByTestId('dataField').length;
    expect(totalDatColumns).toBe(5);
  });
  it('data should match the mockData content', () => {
    const { getAllByTestId } = render(
      <TableBody data={mockData} columnFields={columns} />
    );
    let totalDataColumns = [];
    totalDataColumns = getAllByTestId('dataField');

    for (let i = 0; i < totalDataColumns.length; i++) {
      expect(totalDataColumns[i].textContent).toContain(
        mockData[columns[i].accesor]
      );
    }
  });
  it('should toggle extra message when show more is clicked', () => {
    const { getByTestId } = render(
      <TableBody data={mockData} columnFields={columns} />
    );
    const showMoreMessage = getByTestId('moreMessage');
    expect(showMoreMessage.hidden).toBe(true);
    const showMoreLessLink = getByTestId('showMoreLess');
    fireEvent.click(showMoreLessLink);
    expect(showMoreMessage.hidden).toBe(false);
    expect(showMoreLessLink.textContent).toBe('Show Less');
    fireEvent.click(showMoreLessLink);
    expect(showMoreMessage.hidden).toBe(true);
    expect(showMoreLessLink.textContent).toBe('Show More');
  });
});
