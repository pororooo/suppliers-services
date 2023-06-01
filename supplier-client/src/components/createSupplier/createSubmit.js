import React from "react";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_SUPPLIER_MUTATION } from "../../graphql";

export const CreateSupplier = (formData) => {
  const supplier = formData.createSupplierInput
  console.log(supplier)

  const [createSupplier] = useMutation(CREATE_SUPPLIER_MUTATION);
  const handleCreate = async () => {
    debugger

    try {
      const { data } = await createSupplier({
        variables: {
          createSupplierInput: {
            vatNumber: parseInt(supplier.vatNumber),
            name: supplier.name,
            country: supplier.country,
            roles: supplier.roles,
            sector: supplier.sector,
            certificateLink: supplier.certificateLink,
          },
        },
      });
      console.log(data.createSupplier.vatNumber);
    } catch (error) {
      console.error("Create Supplier Error:", ...error);

    }
  };

  return (
    <div>
      <h2>Create Supplier</h2>
      <button onClick={handleCreate}>Create</button>
    </div>
  );
};

