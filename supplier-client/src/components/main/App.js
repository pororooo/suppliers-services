import { SupplierList } from "../supplierList";
import { CreateInput } from "../createSupplier/createInput";
import { UpdateInput } from "../updateSupplier/updateInput";
import { OneSupplierInput } from "../oneSupplier/oneSupplierInput";
import { DeleteSupplierInput } from "../deleteSupplier/deleteSupplierInput";

const App = () => {
  return (
    <div>
      <h1>Supplier Management System</h1>
      <div>
        <SupplierList />
        <OneSupplierInput />
        <CreateInput />
        <UpdateInput />
        <DeleteSupplierInput />
      </div>
    </div>
  );
};

export default App;
