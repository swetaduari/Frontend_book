import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { getAllUsers } from "../../services/userService";

export default function Users1() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {

        try {

            const res = await getAllUsers();

            setUsers(res.data);

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
                            <h1 className="text-3xl font-bold text-slate-800">All Users</h1>
                            <p className="mt-2 text-sm text-slate-500">Overview of registered customers and their details.</p>
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
                        <table className="min-w-[900px] w-full text-left text-sm">
                            <thead className="bg-slate-900 text-white">
                                <tr>
                                    <th className="p-3">ID</th>
                                    <th className="p-3">First Name</th>
                                    <th className="p-3">Last Name</th>
                                    <th className="p-3">Email</th>
                                    <th className="p-3">Phone</th>
                                    <th className="p-3">Address</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((user) => (
                                    <tr key={user.userId} className="border-b border-slate-200 bg-white hover:bg-slate-50">
                                        <td className="p-3 font-semibold text-slate-700">{user.userId}</td>
                                        <td className="p-3">{user.firstName}</td>
                                        <td className="p-3">{user.lastName}</td>
                                        <td className="p-3">{user.email}</td>
                                        <td className="p-3">{user.phone}</td>
                                        <td className="p-3">{user.address}</td>
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
