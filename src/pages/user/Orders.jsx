import { useEffect, useState } from "react";
import {
    getUserOrders,
    cancelOrder
} from "../../services/orderService";

export default function Orders() {

    const [orders, setOrders] = useState([]);

    const userId = sessionStorage.getItem("userId");

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {

        try {

            const res = await getUserOrders(userId);

            setOrders(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const handleCancel = async (id) => {

        if (!window.confirm("Cancel this order?"))
            return;

        try {

            await cancelOrder(id);

            alert("Order Cancelled");

            loadOrders();

        } catch (err) {

            console.log(err);

            alert("Unable to cancel order");

        }

    };

    return (
        <div className="px-2 py-4 sm:px-4 lg:px-6">
            <div className="mb-6 rounded-[24px] border border-[#f1d8df] bg-white/80 p-5 shadow-sm backdrop-blur">
                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#9a3550]">
                    Purchase history
                </p>
                <h1 className="text-3xl font-bold text-[#2f1d24]">My Orders</h1>
            </div>

            {orders.length === 0 ? (
                <div className="rounded-[24px] border border-dashed border-[#e6c2cc] bg-[#fffafc] py-20 text-center text-lg text-[#7a5b66]">
                    No Orders Found
                </div>
            ) : (
                <div className="space-y-4">
                    {orders.map((order) => (
                        <div
                            key={order.orderId}
                            className="flex flex-col gap-3 rounded-[24px] border border-[#f1d8df] bg-white p-6 shadow-[0_16px_40px_rgba(123,30,58,0.08)] sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div>
                                <h2 className="text-xl font-semibold text-[#2f1d24]">Order #{order.orderId}</h2>
                                <p className="mt-2 text-sm text-[#7a5b66]">Date: {order.orderDate}</p>
                                <p className="mt-1 text-sm text-[#7a5b66]">Total: ₹{order.totalAmount}</p>
                            </div>

                            <div className="rounded-full bg-[#fff5f7] px-4 py-2 text-sm font-semibold text-[#9a3550]">
                                {order.status}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}