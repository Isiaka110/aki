import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToDatabase from './lib/mongodb';

// Import Services
import { getAllStores, updateStoreIntegrity, updateStoreSettings, getStoreById } from './services/store.service';
import { getAllComplaints, updateComplaintStatus, dispatchComplaint } from './services/complaint.service';
import { registerStoreAdmin, loginUser, requestPasswordReset, verifyResetCode, confirmPasswordReset } from './services/auth.service';
import { getStoreProducts, createProduct, updateProduct, deleteProduct } from './services/product.service';
import { getStoreCategories, createCategory, updateCategory, deleteCategory } from './services/category.service';
import { createStoreOrder, getStoreOrders, updateOrderStatusAdmin, getStoreOrderStats } from './services/order.service';
import { createReview, getStoreReviews, updateReviewStatus } from './services/review.service';
import { protect, AuthRequest } from './middleware/auth';
import Store from './models/Store';
import Product from './models/Product';
import Category from './models/Category';
import SystemSettings from './models/SystemSettings';

import path from 'path';
dotenv.config(); // Try standard .env in CWD
dotenv.config({ path: path.join(__dirname, '../../.env.local') }); // Try .env.local in root
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: true, // Reflects the request origin, allowing any origin
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(cookieParser());

// Connect DB
connectToDatabase();

app.get('/api/health', (req, res) => {
    res.status(200).json({ success: true, status: 'UP', timestamp: new Date() });
});

// --- Auth Routes ---
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName, storeName } = req.body;
        if (!email || !password || !firstName || !lastName || !storeName) {
            return res.status(400).json({ success: false, error: 'Please fill out all mandatory fields' });
        }
        await registerStoreAdmin(req.body);
        const data = await loginUser(email, password, 'store-admin');
        res.cookie('aki_ecommerce_session', data.token, {
            httpOnly: true,
            secure: true, // Required for sameSite: 'none'
            sameSite: 'none', // Allows cross-site cookie usage
            maxAge: 60 * 60 * 24 * 1000 // 1 Day
        });
        res.status(201).json({ success: true, message: 'Store registered successfully.', user: data.user, token: data.token });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/auth/login', async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password) return res.status(400).json({ success: false, error: 'Provide credentials.' });
        const data = await loginUser(email, password, role);
        res.cookie('aki_ecommerce_session', data.token, {
            httpOnly: true,
            secure: true, // Required for sameSite: 'none'
            sameSite: 'none', // Allows cross-site cookie usage
            maxAge: 60 * 60 * 24 * 1000 // 1 Day
        });
        res.status(200).json({ success: true, user: data.user, token: data.token });
    } catch (error: any) {
        res.status(401).json({ success: false, error: error.message });
    }
});

app.post('/api/auth/logout', (req, res) => {
    res.clearCookie('aki_ecommerce_session');
    res.status(200).json({ success: true, message: 'Logged out.' });
});

app.post('/api/auth/reset-request', async (req, res) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(400).json({ success: false, error: 'Email is required.' });
        await requestPasswordReset(email);
        res.status(200).json({ success: true, message: 'If this email is registered, a reset code has been dispatched.' });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/auth/reset-verify', async (req, res) => {
    try {
        const { email, code } = req.body;
        if (!email || !code) return res.status(400).json({ success: false, error: 'Email and code are required.' });
        await verifyResetCode(email, code);
        res.status(200).json({ success: true });
    } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
    }
});

app.post('/api/auth/reset-confirm', async (req, res) => {
    try {
        const { email, code, password } = req.body;
        if (!email || !code || !password) return res.status(400).json({ success: false, error: 'All fields are required.' });
        if (password.length < 8) return res.status(400).json({ success: false, error: 'Password must be at least 8 characters.' });
        await confirmPasswordReset(email, code, password);
        res.status(200).json({ success: true, message: 'Password reset successfully.' });
    } catch (error: any) {
        res.status(400).json({ success: false, error: error.message });
    }
});

// --- Super Admin Route ---
app.get('/api/super-admin/overview', async (req, res) => {
    try {
        const stores = await getAllStores();
        const complaints = await getAllComplaints();
        const activeStores = stores.filter(s => s.status === 'Active').length;
        const pendingApprovals = stores.filter(s => s.status === 'Pending').length;
        const openComplaints = complaints.filter(c => c.status === 'Open').length;
        const totalRevenue = stores.reduce((acc, store) => acc + (store.revenue || 0), 0);
        let settings = await SystemSettings.findOne();
        if (!settings) settings = await SystemSettings.create({ noticeBanner: "" });
        res.status(200).json({ success: true, data: { activeStores, pendingApprovals, openComplaints, totalRevenue, noticeBanner: settings.noticeBanner } });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/super-admin/settings', async (req, res) => {
    try {
        const { noticeBanner } = req.body;
        let settings = await SystemSettings.findOne();
        if (!settings) {
            settings = await SystemSettings.create({ noticeBanner });
        } else {
            settings.noticeBanner = noticeBanner;
            await settings.save();
        }
        res.status(200).json({ success: true, data: settings });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/super-admin/stores', async (req, res) => {
    try {
        const stores = await getAllStores();
        res.status(200).json({ success: true, data: stores });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/super-admin/stores', async (req, res) => {
    try {
        const { storeId, status, riskScore, isFeatured } = req.body;
        if (!storeId || !status) return res.status(400).json({ success: false, error: 'Missing parameters' });
        const updatedStore = await updateStoreIntegrity(storeId, status, riskScore, isFeatured);
        res.status(200).json({ success: true, data: updatedStore });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

import { verifyStoreRegistration } from './services/store.service';

app.put('/api/super-admin/stores/:storeId/verify', async (req, res) => {
    try {
        const { status } = req.body;
        if (!['Verified', 'Rejected'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid verification status' });
        }
        const updatedStore = await verifyStoreRegistration(req.params.storeId, { status });
        res.status(200).json({ success: true, data: updatedStore });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/super-admin/stores/:storeId/products', async (req, res) => {
    try {
        const products = await getStoreProducts(req.params.storeId);
        res.status(200).json({ success: true, data: products });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/super-admin/stores/:storeId/categories', async (req, res) => {
    try {
        const categories = await getStoreCategories(req.params.storeId);
        res.status(200).json({ success: true, data: categories });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/super-admin/complaints', async (req, res) => {
    try {
        const complaints = await getAllComplaints();
        res.status(200).json({ success: true, data: complaints });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/super-admin/complaints', async (req, res) => {
    try {
        const { complaintId, status, severity } = req.body;
        const updatedDispute = await updateComplaintStatus(complaintId, status, severity);
        res.status(200).json({ success: true, data: updatedDispute });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/store/complaints', async (req, res) => {
    try {
        const { storeId, customerEmail, issueType, description } = req.body;
        const complaintId = `CPL-${Math.floor(Math.random() * 90000) + 10000}`;
        const newDispute = await dispatchComplaint({ complaintId, storeId, customerEmail, issueType, description });
        res.status(201).json({ success: true, data: newDispute });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// --- Public Store Detail ---
app.get('/api/stores/featured', async (req, res) => {
    try {
        const featuredStores = await Store.find({ isFeatured: true, status: 'Active' });
        res.status(200).json({ success: true, data: featuredStores });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/store/:storeId', async (req, res) => {
    try {
        const store = await getStoreById(req.params.storeId);
        if (!store) {
            return res.status(404).json({ success: false, error: 'Store not found' });
        }
        const products = await getStoreProducts(req.params.storeId);
        const categories = await getStoreCategories(req.params.storeId);
        const reviews = await getStoreReviews(store._id.toString(), { status: 'Approved' });
        res.status(200).json({
            success: true,
            data: {
                ...store.toObject(),
                products,
                categories,
                reviews
            }
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// --- Public Store Orders API ---
app.post('/api/store/orders', async (req, res) => {
    try {
        const payload = req.body;
        // In a real implementation this would generate a payment session and return it
        const newOrder = await createStoreOrder(payload);
        res.status(201).json({ success: true, data: newOrder });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// --- Store Admin Routes ---
app.get('/api/store-admin/overview', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        const myStore = await Store.findById(storeId);

        const totalProducts = await Product.countDocuments({ storeId: myStore?._id.toString() });
        const orderStats = await getStoreOrderStats(storeId);

        // Fetch notice banner
        let settings = await SystemSettings.findOne();
        const noticeBanner = settings ? settings.noticeBanner : "";

        res.status(200).json({
            success: true,
            data: {
                storeName: myStore?.name || 'Your Store',
                storeId: myStore?.storeId || '',
                slug: myStore?.slug || '',
                status: myStore?.status || 'Active',
                verificationStatus: myStore?.verificationStatus || 'Pending',
                totalRevenue: orderStats.totalRevenue || 0,
                activeOrders: orderStats.activeOrders || 0,
                totalProducts: totalProducts || 0,
                storeViews: myStore?.storeViews || 0, // Assuming a storeViews field might exist later
                recentOrders: orderStats.recentOrders || [],
                noticeBanner,
                settings: {
                    ownerName: myStore?.ownerName || '',
                    designation: myStore?.designation || '',
                    manifesto: myStore?.manifesto || '',
                    whatsappNumber: myStore?.whatsappNumber || '',
                    socialInstagram: myStore?.socialInstagram || '',
                    socialTwitter: myStore?.socialTwitter || '',
                    supportEmail: myStore?.supportEmail || myStore?.email || '',
                    primaryColor: myStore?.primaryColor || '#000000',
                    paystackPublicKey: myStore?.paystackPublicKey || '',
                    paystackSecretKey: myStore?.paystackSecretKey || '',
                    logo: myStore?.logo || '',
                    bannerUrl: myStore?.bannerUrl || '',
                },
                isPremium: myStore?.isPremium || false,
                isSoftDeleted: myStore?.isSoftDeleted || false,
                nin: myStore?.nin || ''
            }
        });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/store-admin/products', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        const products = await getStoreProducts(storeId);
        res.status(200).json({ success: true, data: products });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/store-admin/products', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        const newProduct = await createProduct(storeId, req.body);
        res.status(201).json({ success: true, data: newProduct });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/store-admin/products/:productId', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        const updatedProduct = await updateProduct(storeId, req.params.productId, req.body);
        res.status(200).json({ success: true, data: updatedProduct });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/api/store-admin/products/:productId', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        await deleteProduct(storeId, req.params.productId);
        res.status(200).json({ success: true, message: 'Product deleted' });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/store-admin/categories', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        const categories = await getStoreCategories(storeId);
        res.status(200).json({ success: true, data: categories });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/store-admin/categories', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        const newCategory = await createCategory(storeId, req.body);
        res.status(201).json({ success: true, data: newCategory });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/store-admin/categories/:categoryId', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        const updatedCategory = await updateCategory(storeId, req.params.categoryId, req.body);
        res.status(200).json({ success: true, data: updatedCategory });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.delete('/api/store-admin/categories/:categoryId', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        await deleteCategory(storeId, req.params.categoryId);
        res.status(200).json({ success: true, message: 'Category deleted' });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/store-admin/orders', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        const orders = await getStoreOrders(storeId);
        res.status(200).json({ success: true, data: orders });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/store-admin/orders/:orderId', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        const { status } = req.body;
        const updatedOrder = await updateOrderStatusAdmin(storeId, req.params.orderId, status);
        res.status(200).json({ success: true, data: updatedOrder });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/store-admin/settings', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        const updatedStore = await updateStoreSettings(storeId, req.body);
        res.status(200).json({ success: true, data: updatedStore });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.post('/api/store-admin/verify-identity', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        const { nin, verificationDocumentType, cacNumber } = req.body;
        if (!nin || !verificationDocumentType) {
            return res.status(400).json({ success: false, error: 'Identity details required' });
        }

        const updatedStore = await Store.findByIdAndUpdate(storeId, {
            nin,
            verificationDocumentType,
            cacNumber,
            verificationStatus: 'Pending'
        }, { new: true });

        res.status(200).json({ success: true, data: updatedStore });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// --- Review Routes ---
app.post('/api/store/reviews', async (req, res) => {
    try {
        const { storeId, customerName, productName, rating, comment } = req.body;
        if (!storeId || !customerName || !productName || !rating || !comment) {
            return res.status(400).json({ success: false, error: 'All fields are required.' });
        }
        const review = await createReview(req.body);
        res.status(201).json({ success: true, data: review });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.get('/api/store-admin/reviews', protect, async (req: any, res) => {
    try {
        const storeId = req.user.storeId;
        const reviews = await getStoreReviews(storeId);
        res.status(200).json({ success: true, data: reviews });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.put('/api/store-admin/reviews/:reviewId', protect, async (req: any, res) => {
    try {
        const { status } = req.body;
        if (!['Approved', 'Rejected'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' });
        }
        const review = await updateReviewStatus(req.params.reviewId, status);
        res.status(200).json({ success: true, data: review });
    } catch (error: any) {
        res.status(500).json({ success: false, error: error.message });
    }
});

// Start Server
const server = app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`✅ Backend server running on http://localhost:${PORT}`);
    console.log(`✅ Operational on 0.0.0.0:${PORT}`);
});

server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use. Please terminate the conflicting process.`);
    } else {
        console.error(`❌ Server Initialization Error:`, err);
    }
});
