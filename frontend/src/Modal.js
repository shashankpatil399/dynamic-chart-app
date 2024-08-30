import React, { useState } from 'react';

const Modal = ({ onSubmit }) => {
  const [price, setPrice] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showButton, setShowButton] = useState(true);

  // Handle form submission
  const handleSubmit = () => {
    if (price) {
      onSubmit(Number(price));
      setPrice('');
      setShowModal(false);
      setShowButton(true);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      width: '50%',
      margin: '0',
      padding: '0',
      position: 'absolute',
      right: '38px',
      marginBottom: "20px"
    }}>
      <div style={{ textAlign: "right", marginRight: "0" }}>
        {showButton && (
          <button
            style={{
              backgroundColor: '#e3cae1',
              padding: '10px',
              width: '100px',
              borderRadius: '10px',
              alignItems: 'right'
            }}
            onClick={() => {
              setShowButton(false);
              setShowModal(true);
            }}
          >
            Add Price
          </button>
        )}
        {showModal && (
          <div className="modal">
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Enter Price"
              style={{ display: 'block', margin: '10px 0 10px auto', height: '30px', borderRadius: '5px' }}
            />
            <div style={{ textAlign: 'right' }}>
              <button
                style={{
                  backgroundColor: '#e3cae1',
                  padding: '5px',
                  width: '80px',
                  borderRadius: '10px',
                }}
                onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                style={{
                  backgroundColor: '#e3cae1',
                  padding: '5px',
                  width: '80px',
                  borderRadius: '10px',
                  marginLeft: '10px'
                }}
                onClick={() => {
                  setShowButton(true);
                  setShowModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;
