import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getAllPayments } from "../../services/payementService";

export default function Payments1() {

    const [payments, setPayments] = useState([]);

    useEffect(() => {
        loadPayments();
    }, []);

    const loadPayments = async () => {

        try {

            const res = await getAllPayments();

            setPayments(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.12),_transparent_25%),linear-gradient(135deg,_#f8fbff_0%,_#eef6ff_55%,_#ffffff_100%)] p-4 sm:p-6 lg:p-8">
            <div className="mx-auto max-w-7xl">
                <div className="mb-6 rounded-[28px] border border-slate-200 bg-white/90 p-5 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:p-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-slate-800">All Payments</h1>
                            <p className="mt-2 text-sm text-slate-500">Track payment records and transaction status.</p>
                        </div>
                        <Link
                            to="/admin/admindashboard"
                            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700"
                        >
                            <FaArrowLeft />
                            Back to Dashboard
                        </Link>
                    </div>
                </div>

                <div className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_20px_50px_rgba(15,23,42,0.08)]">
                    <div className="overflow-x-auto">
                        <table className="min-w-[800px] w-full text-left text-sm">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="p-3">Payment ID</th>
                                    <th className="p-3">Order ID</th>
                                    <th className="p-3">Payment Method</th>
                                    <th className="p-3">Amount</th>
                                    <th className="p-3">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments.map((payment) => (
                                    <tr key={payment.paymentId} className="border-b border-slate-200 bg-white hover:bg-slate-50">
                                        <td className="p-3 font-semibold text-slate-700">{payment.paymentId}</td>
                                        <td className="p-3">{payment.order?.orderId}</td>
                                        <td className="p-3">{payment.paymentMethod}</td>
                                        <td className="p-3 font-semibold text-emerald-600">₹ {payment.amount}</td>
                                        <td className="p-3">
                                            <span className={`rounded-full px-3 py-1 text-sm font-medium ${payment.paymentStatus === "SUCCESS" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                                                {payment.paymentStatus}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

}
