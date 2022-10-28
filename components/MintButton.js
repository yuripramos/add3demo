import react, { useState, useEffect } from 'react';

const MintButton = ({ setMintAddress }) => {
  const [address, setAddress] = useState('');

  return (
    <div className="m-20">
      <input
        class="shadow appearance-none border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline rounded-r-none"
        type="text"
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Address"
      ></input>
      <button
        onClick={() => {
          setMintAddress(address);
        }}
        className="rounded-l-none bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Mint Tokens
      </button>
    </div>
  );
};

export default MintButton;
