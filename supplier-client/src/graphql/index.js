import { gql } from "apollo-boost";

export const GET_ALL_SUPPLIERS_QUERY = gql`
  query GetAllSuppliers {
    getAllSuppliers {
      vatNumber
      name
      country
      roles
      sector
      certificateLink
    }
  }
`;

export const GET_SUPPLIER_QUERY = gql`
  query GetSupplier($getOneSupplierInput: DeleteSupplierInput!) {
    getSupplier(getOneSupplierInput: $getOneSupplierInput) {
      vatNumber
      name
      country
      roles
      sector
      certificateLink
    }
  }
`;

export const CREATE_SUPPLIER_MUTATION = gql`
  mutation CreateSupplier($createSupplierInput: CreateSupplierInput!) {
    createSupplier(createSupplierInput: $createSupplierInput) {
      vatNumber
      name
      country
      roles
      sector
      certificateLink
    }
  }
`;

export const UPDATE_SUPPLIER_MUTATION = gql`
  mutation UpdateSupplier($updateSupplierInput: UpdateSupplierInput!) {
    updateSupplier(updateSupplierInput: $updateSupplierInput) {
      vatNumber
      name
      country
      roles
      sector
      certificateLink
    }
  }
`;

export const DELETE_SUPPLIER_MUTATION = gql`
  mutation DeleteSupplier($deleteSupplierInput: DeleteSupplierInput!) {
    deleteSupplier(deleteSupplierInput: $deleteSupplierInput) {
      status
    }
  }
`;
