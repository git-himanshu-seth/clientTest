import { memo } from "react";
import PropTypes from "prop-types";
import { Table, Button } from "react-bootstrap";

const TableComponent = ({ items, removeItem, editItem }) => {
  return (
    <>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Product</th>
            <th>Rate</th>
            <th>Unit</th>
            <th>Qty</th>
            <th>Disc%</th>
            <th>Net Amt.</th>
            <th>Total Amt.</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td>{item.productName}</td>
              <td>{item.rate}</td>
              <td>{item.unit}</td>
              <td>{item.quantity}</td>
              <td>{item.discount}</td>
              <td>{item.netAmount}</td>
              <td>{item.totalAmount}</td>
              <td>
                <Button
                  variant="danger"
                  className="me-2"
                  onClick={() => removeItem(index)}
                >
                  Delete
                </Button>
                <Button variant="warning" onClick={() => editItem(index)}>
                  Edit
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

TableComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      customerName: PropTypes.string.isRequired,
      product: PropTypes.string.isRequired,
      rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      unit: PropTypes.string.isRequired,
      quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      netAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      totalAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
    })
  ).isRequired,
  editItem: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};

export default memo(TableComponent);
