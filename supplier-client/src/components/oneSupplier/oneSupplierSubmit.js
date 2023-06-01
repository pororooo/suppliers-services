import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_SUPPLIER_QUERY } from '../../graphql';

export const OneSupplier = ({ getOneSupplierInput }) => {
  const { loading, error, data } = useQuery(GET_SUPPLIER_QUERY, {
    variables: { 
        "getOneSupplierInput": {"vatNumber": parseInt(getOneSupplierInput)}
       },
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const supplier = data.getSupplier;

  return (
    <div>
      <h2>Supplier Details</h2>
      <p>VAT Number: {supplier.vatNumber}</p>
      <p>Name: {supplier.name}</p>
      <p>Country: {supplier.country}</p>
      <p>Roles: {supplier.roles}</p>
      <p>Sector: {supplier.sector}</p>
      <p>Certificate Link: {supplier.certificateLink}</p>
    </div>
  );
};

