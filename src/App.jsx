import "./App.css";
import "./components/navbar/Navbar.jsx";
import { Navbar } from "./components/navbar/Navbar.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Whatever } from "./components/page/Whatever.jsx";

import { Product } from "./components/page/Product.jsx";
import { Cart } from "./components/page/Cart.jsx";
import { LoginSingup } from "./components/page/LoginSingup.jsx";
import { RegisterSingin } from "./components/page/RegisterSingin.jsx";
import { Support } from "./components/page/Support.jsx";
import Payment from "./components/payment/Payment.jsx";
import OrderSuccess from "./components/payment/OrderSuccess.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import queryClient from "./components/utils/queryClient.js";
import Popular from "./components/popular/Popular.jsx";
import AdminDashboard from "./components/admin/AdminDashboard.jsx";
import AdminLayout from "./components/admin/components/AdminLayout.jsx";
import ProductList from "./components/admin/product/ProductList.jsx";
import ProductDetail from "./components/admin/product/ProductDetail.jsx";
import ProductEdit from "./components/admin/product/ProductEdit.jsx";
import ProductNew from "./components/admin/product/ProductNew.jsx";
import GeneralSetting from "./components/admin/components/setting/GeneralSetting.jsx";
import EventManagement from "./components/admin/components/event/EventManagement.jsx";
import UserList from "./components/admin/components/user/UserList.jsx";
import Category from "./components/page/Category.jsx";
import OrderList from "./components/admin/order/OrderList.jsx";
import OrderDetail from "./components/admin/order/OrderDetail.jsx";
import Authenticate from "./utils/Authenticate.jsx";
import Upload from "./components/admin/components/Upload.jsx";
import NotFound from "./components/page/NotFound.jsx";

function App() {
    const path = window.location.pathname;
    return (
        <div>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    {path.includes("/admin") ? <></> : <Navbar />}
                    <Routes>
                        <Route index element={<Whatever />} />
                        <Route path="/shop" element={<Popular />} />
                        <Route path="/category" element={<Category />} />

                        <Route path="/product" element={<Product />}>
                            <Route path=":productId" element={<Product />} />
                        </Route>

                        <Route path="/cart" element={<Cart />} />
                        <Route path="/support" element={<Support />} />

                        <Route path="/loginSingup" element={<LoginSingup />} />
                        <Route
                            path="/registerSingin"
                            element={<RegisterSingin />}
                        />
                        <Route path="/payment" element={<Payment />} />
                        <Route
                            path="/orderSuccess"
                            element={<OrderSuccess />}
                        />
                        <Route path="/upload" element={<Upload />} />

                        {/* Admin Routes */}

                        <Route
                            path="/admin"
                            element={
                                <Authenticate>
                                    <AdminLayout />
                                </Authenticate>
                            }
                        >
                            {/* Route mặc định cho /admin */}
                            <Route index element={<AdminDashboard />} />
                            //** Admin Products Routes **//
                            <Route path="products">
                                <Route index element={<ProductList />} />
                                <Route
                                    path=":productId"
                                    element={<ProductDetail />}
                                />

                                <Route
                                    path=":productId/edit"
                                    element={<ProductEdit />}
                                />
                                <Route path="new" element={<ProductNew />} />
                            </Route>
                            //** Admin Settings Routes **//
                            <Route
                                path="settings"
                                element={<GeneralSetting />}
                            />
                            //** Admin Events Routes **//
                            <Route
                                path="events"
                                element={<EventManagement />}
                            />
                            //** Admin Orders Routes **//
                            <Route path="orders">
                                <Route index element={<OrderList />} />
                                <Route
                                    path=":orderId"
                                    element={<OrderDetail />}
                                />
                            </Route>
                            //** Admin Users Routes **//
                            <Route path="users" element={<UserList />} />
                        </Route>

                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider>
        </div>
    );
}

export default App;
