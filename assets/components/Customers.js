import React, { useEffect, useState } from "react";
import { findAll, remove } from "../services/CustomerService";
import Pagination from "./Pagination";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchCustomers = async () => {
    try {
      const data = await findAll();
      setCustomers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleDelete = async (id) => {
    const originalCustomers = [...customers];

    setCustomers(customers.filter((customer) => customer.id !== id));

    try {
      remove(id);
      console.log("Deleted");
    } catch (error) {
      setCustomers(originalCustomers);
      console.log(error);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearch = (event) => {
    setQuery(event.target.value);
    setCurrentPage(1);
  };

  const itemsPerPage = 10;

  const filteredCustomers = customers.filter(
    (c) =>
      c.firstName.toLowerCase().includes(query.toLowerCase()) ||
      c.lastName.toLowerCase().includes(query.toLowerCase()) ||
      c.email.toLowerCase().includes(query.toLowerCase()) ||
      (c.company && c.company.toLowerCase().includes(query.toLowerCase()))
  );

  // Paginate cutomers
  const paginatedCustomers = Pagination.getData(
    filteredCustomers,
    itemsPerPage,
    currentPage
  );

  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Customers</h1>

          <form>
            <div className="form-group">
              <input
                type="search"
                className="form-control"
                value={query}
                placeholder="Search..."
                onChange={handleSearch}
              />
            </div>
          </form>
        </div>

        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Company</th>
              <th>Invoices</th>
              <th>Total amount</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {paginatedCustomers.map((customer, index) => {
              return (
                <tr key={customer.id}>
                  <td>{index}</td>
                  <td>{customer.firstName + " " + customer.lastName}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.company}</td>
                  <td className="text-center">
                    <span className="badge bg-primary">
                      {customer.invoices.length}
                    </span>
                  </td>
                  <td>2,000,000.00</td>
                  <td>
                    <a
                      className="btn btn-danger btn-sm"
                      href="#"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Delete
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {itemsPerPage < filteredCustomers.length && (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            itemsLength={filteredCustomers.length}
            onPageChanged={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Customers;
