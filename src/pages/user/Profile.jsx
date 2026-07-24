import { useEffect, useState } from "react";
import { getUserById, updateUser } from "../../services/userService";

export default function Profile() {

    const userId = sessionStorage.getItem("userId");

    const [user, setUser] = useState({
        userId: "",
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: ""
    });

    const [editMode, setEditMode] = useState(false);

    const [errors, setErrors] = useState({});

    useEffect(() => {
        loadUser();
    }, []);

    const loadUser = async () => {
        try {
            const res = await getUserById(userId);
            setUser(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        setUser({
            ...user,
            [name]: value
        });

        setErrors({
            ...errors,
            [name]: ""
        });
    };

    const validate = () => {

        let tempErrors = {};

        if (!user.firstName.trim()) {
            tempErrors.firstName = "First Name is required";
        }

        if (!user.lastName.trim()) {
            tempErrors.lastName = "Last Name is required";
        }

        if (!user.email.trim()) {

            tempErrors.email = "Email is required";

        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(user.email)
        ) {

            tempErrors.email = "Please enter a valid email address";
        }

        if (!user.phone.trim()) {

            tempErrors.phone = "Phone number is required";

        } else if (!/^[6-9]\d{9}$/.test(user.phone)) {

            tempErrors.phone =
                "Phone number must contain exactly 10 digits";
        }

        if (!user.address.trim()) {
            tempErrors.address = "Address is required";
        }

        setErrors(tempErrors);

        return Object.keys(tempErrors).length === 0;
    };

    const handleUpdate = async () => {

        if (!validate()) {
            return;
        }

        try {

            await updateUser(userId, user);

            alert("Profile Updated Successfully");

            setEditMode(false);

            loadUser();

        } catch (err) {

            console.log(err);

            alert("Update Failed");
        }
    };

    return (
        <div className="mx-auto max-w-4xl rounded-[28px] border border-[#f1d8df] bg-white p-6 shadow-[0_16px_40px_rgba(123,30,58,0.08)] sm:p-8 lg:p-10">

            <div className="mb-8 rounded-[24px] bg-[#fffafc] p-6">

                <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-[#9a3550]">
                    Account details
                </p>

                <h1 className="text-3xl font-bold text-[#2f1d24]">
                    My Profile
                </h1>

                <p className="mt-2 text-sm text-[#7a5b66]">
                    Keep your personal information up to date for a smoother experience.
                </p>

            </div>

            <div className="grid gap-5 md:grid-cols-2">

                <div>

                    <label className="mb-2 block text-sm font-semibold text-[#5d4a53]">
                        First Name
                    </label>

                    <input
                        name="firstName"
                        value={user.firstName}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="w-full rounded-2xl border border-[#ead6dd] bg-[#fffafc] p-3"
                    />

                    {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.firstName}
                        </p>
                    )}

                </div>

                <div>

                    <label className="mb-2 block text-sm font-semibold text-[#5d4a53]">
                        Last Name
                    </label>

                    <input
                        name="lastName"
                        value={user.lastName}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="w-full rounded-2xl border border-[#ead6dd] bg-[#fffafc] p-3"
                    />

                    {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.lastName}
                        </p>
                    )}

                </div>

                <div>

                    <label className="mb-2 block text-sm font-semibold text-[#5d4a53]">
                        Email
                    </label>

                    <input
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="w-full rounded-2xl border border-[#ead6dd] bg-[#fffafc] p-3"
                    />

                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.email}
                        </p>
                    )}

                </div>

                <div>

                    <label className="mb-2 block text-sm font-semibold text-[#5d4a53]">
                        Phone
                    </label>

                    <input
                        type="text"
                        maxLength={10}
                        name="phone"
                        value={user.phone}
                        onChange={handleChange}
                        disabled={!editMode}
                        className="w-full rounded-2xl border border-[#ead6dd] bg-[#fffafc] p-3"
                    />

                    {errors.phone && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.phone}
                        </p>
                    )}

                </div>

                <div className="md:col-span-2">

                    <label className="mb-2 block text-sm font-semibold text-[#5d4a53]">
                        Address
                    </label>

                    <textarea
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        disabled={!editMode}
                        rows="4"
                        className="w-full rounded-2xl border border-[#ead6dd] bg-[#fffafc] p-3"
                    />

                    {errors.address && (
                        <p className="mt-1 text-sm text-red-600">
                            {errors.address}
                        </p>
                    )}

                </div>

            </div>

            <div className="mt-8 flex flex-wrap gap-3">

                {!editMode ? (

                    <button
                        onClick={() => setEditMode(true)}
                        className="rounded-xl bg-[#7b1e3a] px-6 py-2.5 font-semibold text-white hover:bg-[#9a3550]"
                    >
                        Edit Profile
                    </button>

                ) : (

                    <>

                        <button
                            onClick={handleUpdate}
                            className="rounded-xl bg-[#7b1e3a] px-6 py-2.5 font-semibold text-white hover:bg-[#9a3550]"
                        >
                            Save Changes
                        </button>

                        <button
                            onClick={() => {
                                setEditMode(false);
                                setErrors({});
                                loadUser();
                            }}
                            className="rounded-xl bg-[#fff5f7] px-6 py-2.5 font-semibold text-[#9a3550] hover:bg-[#f1d8df]"
                        >
                            Cancel
                        </button>

                    </>

                )}

            </div>

        </div>
    );
}