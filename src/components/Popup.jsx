/* eslint-disable react/prop-types */

const Popup = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-10 flex items-center justify-center backdrop-filter backdrop-blur-md">
      <div className="bg-gray-500 p-8 rounded-lg shadow-lg drop-animation">
        <p className="text-white">{message}</p>
        <div className="flex justify-end mt-4">
          <button
            onClick={onCancel}
            className="bg-gradient-to-r from-red-500 to-red-600 py-2 px-4 rounded text-white hover:text-gray-200 mr-2 cursor-pointer focus:outline-none"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="bg-gradient-to-r from-green-500 to-green-600 text-white py-2 px-4 rounded cursor-pointer focus:outline-none"
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
