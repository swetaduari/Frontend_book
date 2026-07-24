export default function Footer() {

    return (

        <footer className="bg-gray-900 text-white mt-10">

            <div className="max-w-7xl mx-auto px-6 py-10">

                <div className="grid md:grid-cols-3 gap-8">

                    <div>

                        <h2 className="text-2xl font-bold">

                            BookStore

                        </h2>

                        <p className="mt-3 text-gray-300">

                            Buy & Sell Books Online

                        </p>

                    </div>

                    <div>

                        <h3 className="font-semibold mb-3">

                            Quick Links

                        </h3>

                        <p>Home</p>

                        <p>Books</p>

                        <p>Orders</p>

                        <p>Profile</p>

                    </div>

                    <div>

                        <h3 className="font-semibold mb-3">

                            Contact

                        </h3>

                        <p>Email : support@bookstore.com</p>

                        <p>Phone : +91 9876543210</p>

                    </div>

                </div>

                <hr className="my-5"/>

                <p className="text-center">

                    © 2026 BookStore

                </p>

            </div>

        </footer>

    );

}