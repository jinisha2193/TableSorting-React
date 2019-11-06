import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import Pagination from '../../components/TableSorting/Pagination';

describe('Pagination', () => {
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
    },
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
    },
    {
      roleShortName: 'RMSCCPOS',
      roleName: 'MSCC POS',
      applicableSystems: 'Membership Quick View',
      effectiveDate: '07/20/2019 - 09/12/2019',
      action: 'acion'
    },
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
    },
    {
      roleShortName: 'ENROLADMI',
      roleName: 'Enrollment Administration',
      applicableSystems: 'Membership Quick View',
      effectiveDate: '07/20/2019 - 09/12/2019',
      action: 'acion'
    }
  ];
  const setPeople = jest.fn();

  it('shoud render component', () => {
    render(<Pagination totalPages={MockData} perPageData={setPeople} />);
  });

  it('should have 4 buttons for page numbers', () => {
    const { getAllByTestId } = render(
      <Pagination totalPages={MockData} perPageData={setPeople} />
    );
    const numberOfButtons = getAllByTestId('pageNumbers').length;
    expect(numberOfButtons).toEqual(4);
  });
  it('should have page number 1 as current page and classname should be active', () => {
    const { getAllByTestId } = render(
      <Pagination totalPages={MockData} perPageData={setPeople} />
    );
    const numberOfButtons = getAllByTestId('pageNumbers');
    expect(numberOfButtons[0].className).toBe('active');
    for (let i = 1; i < numberOfButtons.length; i++) {
      expect(numberOfButtons[i].className).toBe('');
    }
  });
  describe('previous button', () => {
    it('prev button should be disabled if current active page is 1', () => {
      const { getAllByTestId, getByTestId } = render(
        <Pagination totalPages={MockData} perPageData={setPeople} />
      );
      const numberOfButtons = getAllByTestId('pageNumbers');
      const previousButton = getByTestId('prevButton');
      expect(numberOfButtons[0].className).toBe('active');
      expect(previousButton.disabled).toBe(true);
    });
    it('prev button should be enabled if current active page is not 1', () => {
      const { getAllByTestId, getByTestId } = render(
        <Pagination totalPages={MockData} perPageData={setPeople} />
      );
      const numberOfButtons = getAllByTestId('pageNumbers');
      const previousButton = getByTestId('prevButton');
      fireEvent.click(numberOfButtons[3]);
      expect(previousButton.disabled).toBe(false);
    });
    it('should go to previous page if previous button is clicked', () => {
      const { getAllByTestId, getByTestId } = render(
        <Pagination totalPages={MockData} perPageData={setPeople} />
      );
      const numberOfButtons = getAllByTestId('pageNumbers');
      fireEvent.click(numberOfButtons[3]);
      const previousButton = getByTestId('prevButton');
      fireEvent.click(previousButton);
      expect(numberOfButtons[2].className).toBe('active');
    });
  });
  describe('next button', () => {
    it('next button should be enabled if current page is not last page', () => {
      const { getAllByTestId, getByTestId } = render(
        <Pagination totalPages={MockData} perPageData={setPeople} />
      );
      const numberOfButtons = getAllByTestId('pageNumbers');
      const nextButton = getByTestId('nextButton');
      expect(numberOfButtons[0].className).toBe('active');
      expect(nextButton.disabled).toBe(false);
    });
    it('next button should be disabled if current active page is last', () => {
      const { getAllByTestId, getByTestId } = render(
        <Pagination totalPages={MockData} perPageData={setPeople} />
      );
      const numberOfButtons = getAllByTestId('pageNumbers');
      const nextButton = getByTestId('nextButton');
      fireEvent.click(numberOfButtons[3]);
      expect(nextButton.disabled).toBe(true);
    });
    it('should go to next page if next button is clicked', () => {
      const { getAllByTestId, getByTestId } = render(
        <Pagination totalPages={MockData} perPageData={setPeople} />
      );
      const numberOfButtons = getAllByTestId('pageNumbers');
      fireEvent.click(numberOfButtons[2]);
      const nextButton = getByTestId('nextButton');
      fireEvent.click(nextButton);
      expect(numberOfButtons[3].className).toBe('active');
    });
  });
});
