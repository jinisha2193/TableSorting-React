import React, { useState, useEffect } from 'react';
import API from '../../api';
import MockData from '../../MockData';
import Table from './Table';

const LoadingMessage = () => {
  return <span className='d-flex m-auto'>Loading...</span>;
};
const ErrorMessage = () => {
  return <span className='d-flex m-auto'>error occurred</span>;
};

const PeopleInfo = data => {
  //const columnData = MockData;
  const [personList, setPersonList] = useState([]);
  const [errorRes, setErrorRes] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    API.get(`users`)
      .then(res => {
        const persons = res.data;
        setPersonList(persons);
        setLoading(false);
      })
      .catch(errors => {
        setErrorRes(true);
        setLoading(false);
      });
  }, []);

  const isLoading = loading;
  const showError = errorRes;
  const personData = personList;
  //const personData = columnData;
  // const columns = [
  //   {
  //     header: 'Role Short Name',
  //     accesor: 'roleShortName'
  //   },
  //   {
  //     header: 'Role Name',
  //     accesor: 'roleName'
  //   },
  //   {
  //     header: 'Applicable Systems',
  //     accesor: 'applicableSystems',
  //     expandable: true
  //   },
  //   {
  //     header: 'Effective Date',
  //     accesor: 'effectiveDate'
  //   },
  //   {
  //     header: 'Action',
  //     accesor: 'action'
  //   }
  // ];
  const columns = [
    {
      header: 'ID',
      accesor: 'id'
    },
    {
      header: 'Name',
      accesor: 'name'
    },
    {
      header: 'Website',
      accesor: 'website',
      expandable: true
    },
    {
      header: 'Username',
      accesor: 'username'
    },
    {
      header: 'Phone',
      accesor: 'phone'
    }
  ];
  return (
    <>
      <h1>User Profile</h1>
      {isLoading ? (
        <LoadingMessage />
      ) : showError ? (
        <ErrorMessage />
      ) : (
        <Table data={personData} column={columns} />
      )}
    </>
  );
  // return <Table data={personData} column={columns} />;
};
export default PeopleInfo;
