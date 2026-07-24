import { useEffect, useState } from "react";
import {
    getCartItems,
    removeCartItem
} from "../../services/cartService";

import { useNavigate } from "react-router-dom";

export default function Cart() {

    const navigate = useNavigate();

    const [cartItems, setCartItems] = useState([]);

    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        loadCart();
    }, []);

    const loadCart = () => {
        getCartItems(userId)
            .then((res) => {
                setCartItems(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleRemove = async (cartItemId) => {
        try {
            await removeCartItem(cartItemId);
            loadCart();
        } catch (err) {
            console.log(err);
        }
    };

    // Calculate Total Amount
    const totalAmount = cartItems.reduce(
        (total, item) => total + item.book.price * item.quantity,
        0
    );

    // Total Quantity
    const totalQuantity = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // Start Payment
    const handleStartPayment = () => {

        navigate("/payment", {
            state: {
                userId: userId,
                amount: totalAmount
            }
        });

    };

    return (
        <div className="px-2 py-4 sm:px-4 lg:px-6">
            <div className="mb-6 rounded-[24px] border border-[#f1d8df] bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#9a3550]">
                    Your basket
                </p>
                <h1 className="text-3xl font-bold text-[#2f1d24]">My Cart</h1>
            </div>

            {cartItems.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-[#e6c2cc] bg-[#fffafc] py-20 text-center text-lg text-[#7a5b66]">
                    Your Cart is Empty 🛒
                </div>
            ) : (
                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                    <div className="space-y-4">
                        {cartItems.map((item) => (
                            <div
                                key={item.cartItemId}
                                className="flex flex-col gap-4 rounded-[24px] border border-[#f1d8df] bg-white p-5 shadow-[0_16px_40px_rgba(123,30,58,0.08)] sm:flex-row sm:items-center sm:justify-between"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold text-[#2f1d24]">{item.book.title}</h2>
                                    <p className="mt-1 text-sm text-[#7a5b66]">{item.book.author}</p>
                                    <p className="mt-3 font-bold text-[#7b1e3a]">₹ {item.book.price}</p>
                                    <p className="mt-1 text-sm text-[#5d4a53]">Quantity: {item.quantity}</p>
                                </div>

                                <button
                                    onClick={() => handleRemove(item.cartItemId)}
                                    className="rounded-xl bg-[#fff5f7] px-5 py-2 font-semibold text-[#9a3550] transition hover:bg-[#f1d8df]"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="rounded-[24px] border border-[#f1d8df] bg-white p-6 shadow-[0_16px_40px_rgba(123,30,58,0.08)]">
                        <h2 className="text-xl font-semibold text-[#2f1d24]">Summary</h2>

                        <div className="mt-5 space-y-3 text-sm text-[#5d4a53]">
                            <div className="flex justify-between">
                                <span>Total Items</span>
                                <span>{cartItems.length}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Total Quantity</span>
                                <span>{totalQuantity}</span>
                            </div>
                        </div>

                        <hr className="my-5 border-[#f1d8df]" />

                        <div className="flex justify-between text-xl font-bold text-[#7b1e3a]">
                            <span>Total Amount</span>
                            <span>₹ {totalAmount}</span>
                        </div>

                        <button
                            onClick={handleStartPayment}
                            className="mt-8 w-full rounded-xl bg-[#7b1e3a] py-3 font-semibold text-white transition hover:bg-[#9a3550]"
                        >
                            Start Payment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}