import { memo } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import PropTypes from "prop-types";

const FormComponent = ({
  formData,
  errors,
  handleChange,
  addItem,
  selectedIndex,
  products,
}) => {
  return (
    <Form className="form">
      <Row className="mb-3">
        <Col sm={4} className="d-flex align-items-center">
          <Form.Label htmlFor="customerName" className="fw-bold mb-0">
            Customer Name
          </Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Group controlId="customerName">
            <Form.Control
              type="text"
              name="customerName"
              value={formData.customerName}
              onChange={handleChange}
              isInvalid={!!errors.customerName}
              className="bordered-input "
            />
            <Form.Control.Feedback type="invalid">
              {errors.customerName}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={4} className="d-flex align-items-center">
          <Form.Label htmlFor="product" className="fw-bold mb-0">
            Product
          </Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Group controlId="product">
            <Form.Control
              as="select"
              name="product"
              value={formData.product}
              onChange={handleChange}
              isInvalid={!!errors.product}
              className="bordered-input"
            >
              <option value="">Select a product</option>
              {products.map((product, index) => (
                <option value={product.value} key={`product-${index}`}>
                  {product.label}
                </option>
              ))}
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {errors.product}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={4} className="d-flex align-items-center">
          <Form.Label htmlFor="rate" className="fw-bold mb-0">
            Rate
          </Form.Label>
        </Col>
        <Col sm={8}>
          <Col className="border-values ">{formData.rate}</Col>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={4} className="d-flex align-items-center">
          <Form.Label htmlFor="unit" className="fw-bold mb-0">
            Unit
          </Form.Label>
        </Col>
        <Col sm={8}>
          <Col className="border-values ">{formData.unit}</Col>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={4} className="d-flex align-items-center">
          <Form.Label htmlFor="quantity" className="fw-bold mb-0">
            Qty.
          </Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Group controlId="quantity">
            <Form.Control
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              isInvalid={!!errors.quantity}
              className="bordered-input"
            />
            <Form.Control.Feedback type="invalid">
              {errors.quantity}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={4} className="d-flex align-items-center">
          <Form.Label htmlFor="discount" className="fw-bold mb-0">
            Discount (%)
          </Form.Label>
        </Col>
        <Col sm={8}>
          <Form.Group controlId="discount">
            <Form.Control
              type="number"
              name="discount"
              value={formData.discount}
              onChange={handleChange}
              isInvalid={!!errors.discount}
              className="bordered-input"
            />
            <Form.Control.Feedback type="invalid">
              {errors.discount}
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={4} className="d-flex align-items-center">
          <Form.Label htmlFor="netAmount" className="fw-bold mb-0">
            Net Amount
          </Form.Label>
        </Col>
        <Col sm={8}>
          <Col className="border-values ">{formData.netAmount}</Col>
        </Col>
      </Row>

      <Row className="mb-3">
        <Col sm={4} className="d-flex align-items-center">
          <Form.Label htmlFor="totalAmount" className="fw-bold mb-0">
            Total Amount
          </Form.Label>
        </Col>
        <Col sm={8}>
          <Col className="border-values ">{formData.totalAmount}</Col>
        </Col>
      </Row>

      <Row className="justify-content-end">
        <Col sm={8} className="text-end h-50">
          <Button
            variant="primary"
            onClick={addItem}
            className="padded-button mt-3 w-100 btn-lg btn-block bordered-input btn btn-primary"
          >
            {selectedIndex > -1 ? "UPDATE" : "+ ADD"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

FormComponent.propTypes = {
  formData: PropTypes.shape({
    customerName: PropTypes.string.isRequired,
    product: PropTypes.string.isRequired,
    rate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    unit: PropTypes.string.isRequired,
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    discount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    netAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    totalAmount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
  }).isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  selectedIndex: PropTypes.number,
  products: PropTypes.array,
};

export default memo(FormComponent);
