import React, { useEffect, useState } from "react";
import { findAll, remove } from "../services/InvoicesService";
import Pagination from "./Pagination";

const STATUS_CLASSES = {
  PAID: "success",
  SENT: "info",
  CANCELLED: "danger",
}

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  const fetchInvoices = async () => {
    try {
      const data = await findAll();
      setInvoices(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleDelete = async (id) => {
    const originalInvoices = [...invoices];

    setInvoices(invoices.filter((invoice) => invoice.id !== id));

    try {
      remove(id);
      console.log("Deleted");
    } catch (error) {
      setInvoices(originalInvoices);
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

  const filteredInvoices = invoices.filter(
    (i) =>
      i.customer.firstName.toLowerCase().includes(query.toLowerCase()) ||
      i.customer.lastName.toLowerCase().includes(query.toLowerCase())
  );

  // Paginate invoices
  const paginatedInvoices = Pagination.getData(
    filteredInvoices,
    itemsPerPage,
    currentPage
  );

  return (
    <div className="p-5 mb-4 bg-light rounded-3">
      <div className="container-fluid py-5">
        <div className="d-flex align-items-center justify-content-between">
          <h1>Invoices</h1>

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
              <th>Number</th>
              <th>Customer</th>
              <th>Sent at</th>
              <th>Status</th>
              <th>Amount</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {paginatedInvoices.map((invoice, index) => {
              return (
                <tr>
                  <td>{index}</td>
                  <td>
                    {invoice.sentat.replace("-", "") +
                      "/#" +
                      invoice.id +
                      "/#" +
                      invoice.customer.id}
                  </td>
                  <td>
                    {invoice.customer.firstName +
                      " " +
                      invoice.customer.lastName}
                  </td>
                  <td>{new date(invoice.sentat).toString()}</td>
                  <td>
                    <span
                      className={
                        "badge bg-" +
                        STATUS_CLASSES[invoice.status.toUpperCase()]
                      }
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td>{invoice.amount}</td>
                  <td>
                    <a
                      className="btn btn-info btn-sm mr-1 "
                      href="#"
                      onClick={() => handleDelete(customer.id)}
                    >
                      Edit
                    </a>
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

        {itemsPerPage < filteredInvoices.length && (
          <Pagination
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            itemsLength={filteredInvoices.length}
            onPageChanged={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Invoices;
