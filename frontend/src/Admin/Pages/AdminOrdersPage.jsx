import AdminOrders from "../components/AdminOrders";
import Navbar from "../../components/General/Navbar"
import Actions from "../components/Actions";

export default function AdminOrdersPage() {
    return (
        <div>
            <Navbar />
            <Actions/>
            <AdminOrders/>
        </div>
    );
}