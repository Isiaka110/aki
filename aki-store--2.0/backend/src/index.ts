import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToDatabase from './lib/mongodb';

// Import Services
import { getAllStores, updateStoreIntegrity } from './services/store.service';
import { getAllComplaints, updateComplaintStatus, dispatchComplaint } from './services/complaint.service';
import { registerStoreAdmin, loginUser } from './services/auth.service';

dotenv.config({ path: '../.env.local' }); // Load from root during dev
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173', // Vite default port
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Connect DB
connectToDatabase();

// --- Auth Routes ---
app.post('/api/auth/register', async (req, res) => {
    try {
        const { email, password, firstName, lastName, storeName } = req.body;
        if (!email || !password || !firstName || !lastName || !storeName) {
            return res.status(400).json({ success: false, error: 'Please fill out all fields' });
        }
        await registerStoreAdmin(req.body);
        res.status(201).json({ success: true, message: 'Store registered successfully.' });
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
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
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

// --- Super Admin Route ---
app.get('/api/super-admin/overview', async (req, res) => {
    try {
        const stores = await getAllStores();
        const complaints = await getAllComplaints();
        const activeStores = stores.filter(s => s.status === 'Active').length;
        const pendingApprovals = stores.filter(s => s.status === 'Pending').length;
        const openComplaints = complaints.filter(c => c.status === 'Open').length;
        const totalRevenue = stores.reduce((acc, store) => acc + (store.revenue || 0), 0);
        res.status(200).json({ success: true, data: { activeStores, pendingApprovals, openComplaints, totalRevenue } });
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
        const { storeId, status, riskScore } = req.body;
        if (!storeId || !status) return res.status(400).json({ success: false, error: 'Missing parameters' });
        const updatedStore = await updateStoreIntegrity(storeId, status, riskScore);
        res.status(200).json({ success: true, data: updatedStore });
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

// Start Server
app.listen(PORT, () => {
    console.log(`✅ Backend server running on port ${PORT}`);
});
