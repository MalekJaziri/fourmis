import React from 'react';
import './ConfirmationPop.scss'

export function ConfirmationPop({ message, confirmText, cancelText, onConfirm, onCancel }) {
  return (
    <div className="confirmation-Pop">
      <p>{message}</p>
      <button onClick={onConfirm}>{confirmText}</button>
      <button onClick={onCancel}>{cancelText}</button>
    </div>
  );
}


