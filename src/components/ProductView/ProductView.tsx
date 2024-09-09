import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useState } from 'react';
import { EditProductModal } from '../EditProductModal/EditProductModal';
import './ProductView.css'; 
import { Comments } from '../Comments/Comments';

export const ProductView: React.FC = () => {
  const { productDetails, status } = useSelector((state: RootState) => state.products);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleOpenModal = () => {
    setIsOpenModal(!isOpenModal);
  }

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'failed') {
    return <p>Failed to load product details.</p>;
  }

  if (!productDetails) {
    return <p>No product selected</p>;
  }

  return (
    <div className="product-container">
      {!isOpenModal ? (
        <>
        <div className="product-details">
          <h1 className="product-title">{productDetails.name}</h1>
          <p className="product-info"><span>Count:</span> {productDetails.count}</p>
          <p className="product-info"><span>Weight:</span> {productDetails.weight}</p>
          <p className="product-info"><span>Size:</span> {productDetails.size.width} x {productDetails.size.height}</p>
          <img className="product-image" src={productDetails.imageUrl} alt={productDetails.name} />
          <button className="edit-button" onClick={handleOpenModal}>Edit</button>
        </div>
        <Comments productId={productDetails.id}/>
        </>
      ) : (
        <EditProductModal 
          isOpen={isOpenModal} 
          onClose={() => setIsOpenModal(false)} 
          product={productDetails} 
        />
      )}
    </div>
  );
};
