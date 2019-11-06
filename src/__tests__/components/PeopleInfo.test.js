// import '@testing-library/jest-dom/extend-expect';
import { render, wait } from '@testing-library/react';
// import axiosMock from 'axios';
// import API from '../../api';
import React from 'react';
import PeopleInfo from '../../components/TableSorting/PeopleInfo';
import mockAxios from '../../__mocks__/axios';

describe('People Info', () => {
  const peopleData = [
    {
      id: 1,
      name: 'Jinisha Joseph',
      website: 'jj@jj.com',
      username: 'jjoseph',
      phone: '456-789-223'
    },
    {
      id: 2,
      name: 'aamir majeed',
      website: 'am@am.com',
      username: 'amajeed',
      phone: '556-887-254'
    },
    {
      id: 1,
      name: 'John Doe',
      website: 'jd@jd.com',
      username: 'jdoe',
      phone: '444-555-111'
    }
  ];

  // beforeEach(() => {
  //   axiosMock.get.mockResolvedValueOnce({
  //     data: peopleData
  //   });
  // });
  it('should render the component', () => {
    mockAxios.create();
    mockAxios.get.mockResolvedValueOnce({
      data: {
        peopleData
      }
    });
    render(<PeopleInfo />);
  });
  it('should show error component in axios fails', async () => {
    mockAxios.create();
    mockAxios.get.mockRejectedValueOnce('some error');
    const { getByText } = render(<PeopleInfo />);
    await wait(() => expect(getByText('error occurred')).toBeDefined());
  });
});
