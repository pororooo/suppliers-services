import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { GET_ALL_SUPPLIERS_QUERY } from '../../graphql';
import style from './style.module.css'; 

export const SupplierList = () => {
  const { loading, error, data, refetch } = useQuery(GET_ALL_SUPPLIERS_QUERY);

  const handleRefresh = () => {
    refetch();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


  return (
    <div>
      <h2 className={style.name}>Supplier List</h2>
      <button className={style.refreshButton} onClick={handleRefresh}>Refresh</button>
      <table className={style['supplier-table']}>
        <thead>
          <tr>
            <th>VAT Number</th>
            <th>Name</th>
            <th>Country</th>
            <th>Roles</th>
            <th>Sector</th>
            <th>Certificate Link</th>
          </tr>
        </thead>
        <tbody>
          {data.getAllSuppliers.map((supplier) => (
            <tr key={supplier.vatNumber}>
              <td>{supplier.vatNumber}</td>
              <td>{supplier.name}</td>
              <td>{supplier.country}</td>
              <td>{supplier.roles}</td>
              <td>{supplier.sector}</td>
              <td>{supplier.certificateLink}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
