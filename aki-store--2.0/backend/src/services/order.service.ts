import connectToDatabase from "../lib/mongodb";
import Order, { IOrder } from "../models/Order";
import Store from "../models/Store";

export async function createStoreOrder(payload: Partial<IOrder>) {
    await connectToDatabase();
    // In a real flow, this would connect to Paystack and return an initialization URL.
    // For this prototype, we'll create the order as Pending, and the frontend will simulate payment.
    const newOrder = await Order.create(payload);

    // Update store revenue if payment was successful right away (unlikely for async flows, but just in case)
    if (newOrder.paymentStatus === 'Completed') {
        await Store.findOneAndUpdate(
            { storeId: newOrder.storeId },
            { $inc: { revenue: newOrder.totalAmount } }
        );
    }

    return newOrder;
}

export async function confirmOrderPayment(orderId: string, paymentReference: string) {
    await connectToDatabase();

    // Simulate Paystack verification by just setting it to Completed
    const order = await Order.findByIdAndUpdate(
        orderId,
        { paymentStatus: 'Completed', status: 'Active', paymentReference },
        { new: true }
    );

    if (order) {
        await Store.findOneAndUpdate(
            { _id: order.storeId }, // or storeId if it's the custom string, let's assume storeId string
            { $inc: { revenue: order.totalAmount } }
        );
    }

    return order;
}

export async function getStoreOrders(storeId: string) {
    await connectToDatabase();
    // Assuming storeId here is the string 'storeId' from token, not ObjectId
    // wait, in product.service it's ObjectId string. Let's make sure. The token has `storeId` which is the Store's ObjectId.
    return await Order.find({ storeId }).sort({ createdAt: -1 });
}

export async function updateOrderStatusAdmin(storeId: string, orderId: string, status: string) {
    await connectToDatabase();
    return await Order.findOneAndUpdate(
        { _id: orderId, storeId },
        { status },
        { new: true }
    );
}

export async function getStoreOrderStats(storeId: string) {
    await connectToDatabase();
    const orders = await Order.find({ storeId });

    const activeOrders = orders.filter(o => o.status === 'Active' || o.status === 'Pending').length;
    const totalRevenue = orders.filter(o => o.paymentStatus === 'Completed').reduce((acc, obj) => acc + obj.totalAmount, 0);
    const recentOrders = orders.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(0, 5);

    // Convert to simple objects for sending
    return {
        activeOrders,
        totalRevenue,
        recentOrders: recentOrders.map(o => ({
            id: o._id,
            customerName: o.customerName,
            customerEmail: o.customerEmail,
            totalAmount: o.totalAmount,
            status: o.status,
            paymentStatus: o.paymentStatus,
            createdAt: o.createdAt
        }))
    };
}
