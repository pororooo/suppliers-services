import { useState } from "react";
import { DeleteSupplier } from "./deleteSupplierSubmit";
import { FaSearch } from "react-icons/fa";

export const DeleteSupplierInput = () => {
  const [deleteSupplierInput, setDeleteSupplierInput] = useState();
  const [deleteOne, setDelete] = useState();

  const handleDelete = (deleteSupplier) => {
    setDeleteSupplierInput(deleteSupplier);
  };
  const handleDeleteOneSubmit = (e) => {
    e.preventDefault();
    handleDelete(deleteOne);
  };
  return (
    <form onSubmit={handleDeleteOneSubmit}>
      <input
        type="text"
        onChange={(e) => {
          setDelete(e.target.value);
        }}
      />
      <button onClick={handleDeleteOneSubmit}>
        <FaSearch />
      </button>
      <DeleteSupplier deleteSupplierInput={deleteSupplierInput} />
    </form>
  );
};
