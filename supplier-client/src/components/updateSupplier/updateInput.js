import { useState } from "react";
import { UpdateSupplier } from "./updateSubmit";
import { FaSearch } from "react-icons/fa";

export const UpdateInput = () => {
  const [formData, setFormData] = useState({
    vatNumber: 0,
    name: "",
    country: "",
    roles: "",
    sector: "",
    certificateLink: "",
  });
  const [updateSupplierInput, setUpdateSupplierInput] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    setUpdateSupplierInput({
      vatNumber: parseInt(formData.vatNumber),
      name: formData.name,
      country: formData.country,
      roles: formData.roles,
      sector: formData.sector,
      certificateLink: formData.certificateLink,
    });
  };

  return (
    <form onSubmit={handleUpdateSubmit}>
      <label>
        VAT Number:
        <input
          type="number"
          name="vatNumber"
          value={formData.vatNumber}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Country:
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Roles:
        <input
          type="text"
          name="roles"
          value={formData.roles}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Sector:
        <input
          type="text"
          name="sector"
          value={formData.sector}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        Certificate Link:
        <input
          type="text"
          name="certificateLink"
          value={formData.certificateLink}
          onChange={handleChange}
        />
      </label>
      <br />
      <button onClick={handleUpdateSubmit}>
        <FaSearch />
      </button>
      <UpdateSupplier updateSupplierInput={updateSupplierInput} />{" "}
    </form>
  );
};
