import React from 'react';
import './ComfirmationModal.css';
interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="custom-modal-overlay">
      <div className="custom-modal-content">
        <p>Are you sure you want to delete this product?</p>
        <button className="custom-modal-button confirm" onClick={onConfirm}>Delete</button>
        <button className="custom-modal-button cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default ConfirmationModal;