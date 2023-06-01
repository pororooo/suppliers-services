import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { UPDATE_SUPPLIER_MUTATION } from "../../graphql";

export const UpdateSupplier = (formData) => {
  console.log(formData)
    
  const [updateSupplier, { data, loading, error }] = useMutation(UPDATE_SUPPLIER_MUTATION);
  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;
  const handleUpdate = async () => {
    try {
      const { data } = await updateSupplier({
        variables: {
          updateSupplierInput: {
            vatNumber: parseInt(formData.updateSupplierInput.vatNumber),
            name: formData.updateSupplierInput.name,
            country: formData.updateSupplierInput.country,
            roles: formData.updateSupplierInput.roles,
            sector: formData.updateSupplierInput.sector,
            certificateLink: formData.updateSupplierInput.certificateLink,
          },
        },
      });
      console.log(data.updateSupplier.vatNumber);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>update Supplier</h2>
      <button onClick={handleUpdate}>update</button>
    </div>
  );
};
