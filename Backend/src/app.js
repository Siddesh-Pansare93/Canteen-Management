import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes.js';
import walletRoutes from './routes/wallet.routes.js';
import orderRoutes from './routes/order.routes.js';
import seatRoutes from './routes/seat.routes.js';

const app = express();

// Enhanced CORS configuration for Vercel deployment
const corsOptions = {
  origin: process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL, 'https://canteen-frontend.vercel.app', 'https://www.canteen-frontend.vercel.app']
    : 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/wallet', walletRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/seats', seatRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Root route for vercel deployment verification
app.get('/', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Canteen API is running',
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

export default app;


