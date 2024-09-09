import {  useState } from "react"
import { ProductType, updateProductDetails } from "../../features/Product/productSlice"
import { useDispatch } from "react-redux"
import { AppDispatch } from "../../store/store"
import './EditProductModa.css';

type Props = {
  isOpen: boolean,
  onClose: () => void,
  product: ProductType
}

export const EditProductModal:React.FC<Props> = ({ isOpen, onClose, product}) => {
  const dispatch = useDispatch<AppDispatch>()
  const [productData, setProductData] = useState<ProductType>(product)

  const handleSave = () => {
    dispatch(updateProductDetails(productData))
    setProductData(productData)
    onClose();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProductData({
      ...productData,
      [id]: value
    });

  };
  if (!isOpen) {
    return null
  }
  return (
    <>
    <div className="modal">
  <div className="modal-content">
    <h2>Edit Product</h2>
    <form className="modal-form">
      <label className="modal-label">
        Name:
        <input
          id="name"
          className="modal-input"
          value={productData.name}
          onChange={handleChange}
        />
      </label>
      <label className="modal-label">
        Count:
        <input
          id="count"
          type="number"
          className="modal-input"
          value={productData.count}
          onChange={handleChange}
        />
      </label>
      <label className="modal-label">
        Weight:
        <input
          id="weight"
          className="modal-input"
          value={productData.weight}
          onChange={handleChange}
        />
      </label>
      <label className="modal-label">
        Width:
        <input
          id="size.width"
          type="number"
          className="modal-input"
          value={productData.size.width}
          onChange={handleChange}
        />
      </label>
      <label className="modal-label">
        Height:
        <input
          id="size.height"
          type="number"
          className="modal-input"
          value={productData.size.height}
          onChange={handleChange}
        />
      </label>
      <label className="modal-label">
        Image URL:
        <input
          id="imageUrl"
          className="modal-input"
          value={productData.imageUrl}
          onChange={handleChange}
        />
      </label>
      <div className="modal-buttons">
        <button className="modal-button save" onClick={handleSave}>Save</button>
        <button className="modal-button cancel" onClick={onClose}>Cancel</button>
      </div>
    </form>
  </div>
</div>
    </>
  )
}