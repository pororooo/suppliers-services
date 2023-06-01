import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { DELETE_SUPPLIER_MUTATION } from "../../graphql";

export const DeleteSupplier = (vatNumber) => {
  const [deleteSupplier] = useMutation(DELETE_SUPPLIER_MUTATION);
  const handleDelete = async () => {
    debugger
    try {
      const { data } = await deleteSupplier({
        variables: {
          deleteSupplierInput: {
            vatNumber: parseInt(vatNumber.deleteSupplierInput),
          },
        },
      });
      console.log(data.deleteSupplier.status);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Delete Supplier with vatNumber {vatNumber.deleteSupplierInput}</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
