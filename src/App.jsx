import { useState, useCallback, useMemo, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Button, Col } from "react-bootstrap";
import TableComponent from "./components/table";
import FormComponent from "./components/form";
import { getProductList } from "./redux/features/product/productSlice";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { gnerateInvoice } from "./redux/features/invoice/invoiceSlice";

function App() {
  const products = useSelector((state) => state.products.value);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    customerName: "",
    product: "",
    rate: "",
    unit: "",
    quantity: "",
    discount: 0,
    netAmount: "",
    totalAmount: "",
    productName: "",
  });
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const [items, setItems] = useState([]);
  const [errors, setErrors] = useState({});
  console.log(formData);
  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      if (name === "product") {
        let product;
        if (value !== "") {
          product = products.find((prod) => value === prod.value);
          // setSelectedProduct(product);
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            productName: product.label,
            unit: product?.unit || "",
            rate: product?.rate || "",
          }));
        } else {
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            unit: "",
            rate: "",
          }));
        }
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      }
    },
    [products]
  );

  function calculateAmounts(rate, quantity = 1, discount = 0) {
    rate = parseFloat(rate);
    quantity = parseFloat(quantity);
    discount = parseFloat(discount);
    if (!isNaN(rate) && !isNaN(quantity)) {
      const grossAmount = rate * quantity;
      const netAmount = grossAmount - grossAmount * (discount / 100);
      const totalAmount = netAmount;
      return {
        netAmount: netAmount.toFixed(2),
        totalAmount: totalAmount.toFixed(2),
      };
    }
    return { netAmount: "", totalAmount: "" };
  }

  useEffect(() => {
    dispatch(getProductList());
  }, [dispatch]);

  useEffect(() => {
    const { rate, quantity, discount } = formData;
    const result = calculateAmounts(rate, quantity, discount || 0);
    setFormData((prevData) => ({
      ...prevData,
      totalAmount: result.totalAmount,
      netAmount: result.netAmount,
    }));
  }, [formData.rate, formData.quantity, formData.discount]);

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.customerName)
      newErrors.customerName = "Customer Name is required";
    if (!formData.product) newErrors.product = "Product is required";
    if (!formData.quantity || isNaN(formData.quantity))
      newErrors.quantity = "Valid Quantity is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const addItem = useCallback(() => {
    if (validateForm()) {
      if (selectedIndex > -1) {
        items[selectedIndex] = formData;
        setItems([...items]);
        setSelectedIndex(-1);
      } else {
        setItems((prevItems) => [...prevItems, formData]);
      }
      setFormData({
        customerName: "",
        product: "",
        rate: "",
        unit: "",
        quantity: "",
        discount: "",
        netAmount: "",
        totalAmount: "",
      });
      setErrors({});
    }
  }, [validateForm, selectedIndex, items, formData]);

  const removeItem = useCallback((index) => {
    setItems((prevItems) => prevItems.filter((_, i) => i !== index));
  }, []);

  const editItem = useCallback(
    (index) => {
      setSelectedIndex(index);
      setFormData({ ...items[index] });
    },
    [items]
  );

  const formProps = useMemo(
    () => ({
      formData,
      errors,
      handleChange,
      addItem,
      selectedIndex,
      products,
    }),
    [formData, errors, handleChange, addItem, selectedIndex, products]
  );

  const tableProps = useMemo(
    () => ({ items, removeItem, editItem }),
    [items, removeItem, editItem]
  );

  const handleSubmit = () => {
    let data = items.map((item) => {
      return {
        customerName: item.customerName,
        product: item.product,
        rate: item.rate,
        unit: item.unit,
        quantity: Number(item.quantity),
        discount: Number(item.discount).toFixed(2),
        netAmount: Number(item.netAmount).toFixed(2),
        totalAmount: Number(item.totalAmount).toFixed(2),
      };
    });
    dispatch(gnerateInvoice(data));
    setItems([]);
  };

  return (
    <Container className="mb-5">
      <h1 className="mt-5">Create Invoice</h1>
      <FormComponent {...formProps} />
      <TableComponent {...tableProps} />
      <Col>
        {" "}
        <Button
          variant="primary"
          disabled={items.length === 0}
          onClick={handleSubmit}
          className="padded-button mt-3 btn-lg btn-block bordered-input"
        >
          SUBMIT
        </Button>
      </Col>
    </Container>
  );
}

export default App;
