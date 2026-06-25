const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
// Assuming local MongoDB is running on default port 27017
mongoose.connect('mongodb://127.0.0.1:27017/amudevelopers')
  .then(() => console.log("Connected to local MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// Settings Schema & Model
const settingsSchema = new mongoose.Schema({
  siteName: { type: String, default: 'AMU.Dev' },
  useLogoImage: { type: Boolean, default: true },
  logoUrl: { type: String, default: '/amu-logo.jpg' },
  heroTitle: { type: String, default: 'Transforming Ideas Into Digital Solutions' },
  heroSubtitle: { type: String, default: 'We provide custom software development, web applications, mobile apps, UI/UX design, AI solutions, and complete digital transformation services to scale your business.' },
  heroPrimaryBtn: { type: String, default: 'Get Free Consultation' },
  heroSecondaryBtn: { type: String, default: 'View Portfolio' },
  contactEmail: { type: String, default: 'hello@amudevelopers.com' },
  contactPhone: { type: String, default: '+1 (555) 123-4567' },
  contactAddress: { type: String, default: '123 Innovation Drive, Tech District, NY 10001' },
  whatsappNumber: { type: String, default: '1234567890' },
  adminPassword: { type: String, default: 'admin123' },
  services: { 
    type: Array, 
    default: [
      { id: 1, icon: 'fa-code', title: 'Custom Software', desc: 'Tailored enterprise software solutions built to match your exact business requirements.' },
      { id: 2, icon: 'fa-globe', title: 'Web Development', desc: 'Scalable, high-performance web applications and cloud portals.' },
      { id: 3, icon: 'fa-mobile-screen', title: 'Mobile Apps', desc: 'Native and cross-platform mobile apps for iOS and Android.' },
      { id: 4, icon: 'fa-pen-nib', title: 'UI/UX Design', desc: 'Intuitive, user-centered designs that drive engagement and conversions.' }
    ]
  },
  portfolio: {
    type: Array,
    default: [
      { id: 1, cat: 'FinTech Platform', title: 'Global Payment Gateway', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'A comprehensive solution built with modern architecture to ensure scalability and flawless user experience.' },
      { id: 2, cat: 'E-Commerce', title: 'NextGen Retail App', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'A comprehensive solution built with modern architecture to ensure scalability and flawless user experience.' },
      { id: 3, cat: 'Healthcare AI', title: 'Medical Diagnostics AI', img: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80', desc: 'A comprehensive solution built with modern architecture to ensure scalability and flawless user experience.' }
    ]
  }
});

const Settings = mongoose.model('Settings', settingsSchema);

// Order Schema & Model
const orderSchema = new mongoose.Schema({
  clientName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  serviceRequired: { type: String, required: true },
  budget: { type: String },
  timeline: { type: String },
  message: { type: String },
  status: { type: String, default: 'UNPAID' }, // UNPAID, PAID
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// API Routes

// GET: Fetch settings
app.get('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (!settings) {
      // Create default settings if none exist
      settings = await Settings.create({});
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST: Update settings
app.post('/api/settings', async (req, res) => {
  try {
    let settings = await Settings.findOne();
    if (settings) {
      // Update existing document
      settings = await Settings.findOneAndUpdate({}, req.body, { new: true });
    } else {
      // Create new document if doesn't exist
      settings = await Settings.create(req.body);
    }
    res.json(settings);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// ORDERS API

// GET: Fetch all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// GET: Fetch single order
app.get('/api/orders/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// POST: Create a new order/lead (from Contact form)
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = await Order.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// PUT: Update order status
app.put('/api/orders/:id', async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id, 
      { status: req.body.status },
      { new: true }
    );
    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
