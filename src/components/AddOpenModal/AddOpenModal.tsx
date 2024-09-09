import { useState } from "react"
import "./AddOpenModal.css"
import { useDispatch } from "react-redux"
import { addProduct } from "../../features/Product/productSlice"
import { AppDispatch } from "../../store/store"
type Props = {
  handleClose: () => void
}
export const AddOpenModal: React.FC<Props> = ({ handleClose }) => {
  const [productData, setProductData] = useState({
    name: "",
    count: 0,
    imageUrl: "",
    width: 0,
    height: 0,
    weight: ""
  });
 const invalidData = !productData.name ||
 !productData.count ||
 !productData.imageUrl ||
 !productData.width ||
 !productData.height ||
 !productData.weight
 
  const dispatch = useDispatch<AppDispatch>()
  const handleAddProduct = () => {
    if (
      invalidData
    ) {
      alert('Please fill in all fields.');
      return;
    }
    const newProduct= {
      id: crypto.randomUUID(),
      name: productData.name,
      count: productData.count,
      imageUrl: productData.imageUrl,
      size: { width: productData.width, height: productData.height },
      weight: productData.weight,
    }
    
    dispatch(addProduct(newProduct))
    handleClose()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProductData({
      ...productData,
      [id]: value
    });
  };
  return (
    <div className='modal-overlay'>
      <div className='modal-content'>
        <h2>Add Product</h2>

        <div className='form-group'>
          <label htmlFor='productName'>Name</label>
          <input
            type='text'
            id='name'
            value={productData.name}
            onChange={handleChange}
            placeholder='Enter Name'
          />
        </div>

        <div className='form-group'>
          <label htmlFor='productCount'>Count</label>
          <input
            type='number'
            id='count'
            placeholder='0'
            value={productData.count}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='imageUrl'>Image URL</label>
          <input
            type='text'
            id='imageUrl'
            placeholder='Image URL'
            value={productData.imageUrl}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='width'>Width</label>
          <input
            type='number'
            id='width'
            placeholder='0'
            value={productData.width}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='height'>Height</label>
          <input
            type='number'
            id='height'
            placeholder='0'
            value={productData.height}
            onChange={handleChange}
          />
        </div>

        <div className='form-group'>
          <label htmlFor='weight'>Weight</label>
          <input
            type='text'
            id='weight'
            placeholder='Weight'
            value={productData.weight}
            onChange={handleChange}
          />
        </div>

        <div className='modal-button_container'>
          <button className='modal-button_add' onClick={handleAddProduct}>
            Add Product
          </button>
        </div>
        <button className='modal-button_cancel' onClick={handleClose}>
          Cancel
        </button>
      </div>
    </div>
  )
}
