// import React, { useState } from 'react';
// import Razorpay from 'razorpay';

// const RazorpayComponent = () => {
//   const [paymentId, setPaymentId] = useState(null);
//   const [amount, setAmount] = useState(0);

//   const options = {
//     key: 'rzp_test_8RhGvrNVCp3ZpC', // Your Razorpay API Key
//     amount: amount * 100, // Amount in paise (converted from entered amount in rupees)
//     currency: 'INR',
//     name: 'Book Exchange',
//     description: 'Payment for services',
//     image: 'https://yourcompany.com/logo.png',
//     handler: function (response) {
//       alert(`Payment successful. Payment ID: ${response.razorpay_payment_id}`);
//       setPaymentId(response.razorpay_payment_id);
//     },
//     prefill: {
//       name: 'Aniket Jadhav',
//       email: 'aniketj1929@gmail.com',
//       contact: '8365478945',
//     },
//     notes: {
//       address: 'Thane',
//     },
//     theme: {
//       color: '#528FF0',
//     },
//   };

//   const openPayModal = () => {
//     const razorpay = new Razorpay(options);
//     razorpay.open();
//   };

//   return (
//     <div>
//       <input
//         type="number"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//         placeholder="Enter amount in INR"
//       />
//       <button onClick={openPayModal} disabled={amount <= 0}>
//         Pay with Razorpay
//       </button>
//       {paymentId && <p>Payment ID: {paymentId}</p>}
//     </div>
//   );
// };

// export default RazorpayComponent;
import QR from './qr.jpg';
import "./server.css";

export default function Server(){
    return(
        <div>
        <>
        <div className="server">

            <div className="QR">
                <img src={QR} alt="opps"></img>
            </div>

        </div>
        </>

        </div>
    )
}
