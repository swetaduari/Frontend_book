import { useLocation, useNavigate } from "react-router-dom";
import { makePayment } from "../../services/payementService";
import { placeOrder } from "../../services/orderService";

export default function Payment() {

    const { state } = useLocation();
    const navigate = useNavigate();

    const userId = state.userId;
    const amount = state.amount;

    const handlePayment = async () => {

        if (!window.Razorpay) {
            alert("Razorpay SDK not loaded");
            return;
        }

        const options = {

            key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Your Razorpay Test Key

            amount: 100, // ₹1 Test Payment

            currency: "INR",

            name: "किताबी कीड़ा",

            description: "Book Purchase",

            theme: {
                color: "#2563eb"
            },

            // PAYMENT SUCCESS
            handler: async function () {

                try {

                    // Create Order ONLY after successful payment
                    const orderResponse = await placeOrder(userId);

                    const orderId = orderResponse.data.orderId;

                    // Save Payment
                    await makePayment(orderId, {

                        paymentMethod: "UPI",

                        paymentStatus: "SUCCESS"

                    });

                    alert("Payment Successful");

                    navigate("/orders");

                } catch (err) {

                    console.log(err);

                    alert("Unable to complete payment.");

                }

            },

            // USER CLOSES PAYMENT WINDOW
            modal: {

                ondismiss: function () {

                    alert("Payment Cancelled");

                }

            }

        };

        const razorpay = new window.Razorpay(options);

        // PAYMENT FAILED
        razorpay.on("payment.failed", function () {

            alert("Payment Failed");

        });

        razorpay.open();

    };

    return (
        <div className="mx-auto mt-8 max-w-xl rounded-[24px] border border-[#f1d8df] bg-white p-8 shadow-[0_16px_40px_rgba(123,30,58,0.08)]">
            <div className="mb-8 text-center">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#9a3550]">
                    Secure checkout
                </p>
                <h1 className="text-3xl font-bold text-[#2f1d24]">किताबी कीड़ा Payment</h1>
            </div>

            <div className="space-y-4 rounded-[20px] bg-[#fffafc] p-5">
                <div className="flex justify-between text-lg text-[#5d4a53]">
                    <span>Cart Total</span>
                    <span>₹{amount}</span>
                </div>

                <div className="flex justify-between text-lg font-semibold text-[#7b1e3a]">
                    <span>Test Payment</span>
                    <span>₹1</span>
                </div>
            </div>

            <button
                onClick={handlePayment}
                className="mt-8 w-full rounded-xl bg-[#7b1e3a] py-3 text-lg font-semibold text-white transition hover:bg-[#9a3550]"
            >
                Pay ₹1
            </button>
        </div>
    );

}