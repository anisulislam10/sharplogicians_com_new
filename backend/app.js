import express from "express";
import configDotenv from "dotenv";
import connectDB from "./config/config.db.js";
import AdminRoute from './Routes/admin.routes.js';
import servicesRoutes from './Routes/addServices.routes.js';
import portfolioRoutes from './Routes/addPortfolio.routes.js';
import ourClientsRoutes from './Routes/ourClients.routes.js';
import aboutUSRoutes from './Routes/aboutUs.routes.js'
import teamsRoutes from './Routes/teams.routes.js'
import testimonialRoutes from './Routes/testimonial.routes.js'
import contactRoutes from './Routes/contactus.routes.js'
import blogRoutes from "./Routes/blog.routes.js"
import quoteRoutes from './Routes/quote.routes.js'
import QuoteServiceRoutes from "./Routes/quoteService.routes.js";


import cookieParser from 'cookie-parser';
import cors from "cors"; 
import path from 'path'; 
import { fileURLToPath } from 'url'; 

configDotenv.config();
const app = express();

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cookieParser());
app.use(cors()); // Disable custom CORS settings for debugging


// Updated CORS configuration //const allowedOrigins = [`${process.env.LOCAL_HOST_NAME}5173`,`https://sharplogicians.com/`,`${process.env.LOCAL_HOST_NAME}`, 
//`${process.env.LOCAL_HOST_NAME}3000`, `${process.env.LOCAL_HOST_NAME}5175`,`${process.env.LOCAL_HOST_NAME}3001`,];
 const allowedOrigins = [
  `${process.env.LOCAL_HOST_NAME}5173`, // For frontend (Vite, React Dev server)
  'https://sharplogicians.com', // Production domain
  'https://sharplogicians.com/new',
  'https://sharplogicians.com/old/',
  `${process.env.LOCAL_HOST_NAME}`, // Localhost without a port (e.g., http://localhost)
  `${process.env.LOCAL_HOST_NAME}3000`, // For the Next.js app
  `${process.env.LOCAL_HOST_NAME}5175` // Another frontend (optional if used)
];



app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Endpoints 
app.use("/new/api/admin/auth", AdminRoute);
app.use("/new/api/admin/services", servicesRoutes);
app.use("/new/api/admin/portfolio", portfolioRoutes);
app.use("/new/api/admin/client", ourClientsRoutes);
app.use("/new/api/admin/about",aboutUSRoutes);
app.use("/new/api/admin/team",teamsRoutes);
app.use("/new/api/admin/testimonial",testimonialRoutes);
app.use("/new/api/admin/contact",contactRoutes);
app.use("/new/api/admin/blogs",blogRoutes)
app.use("/new/api/admin/quote",quoteRoutes)
app.use("/new/api/admin/quote_service",QuoteServiceRoutes)






const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    connectDB();
    console.log(`--> Server is running @ :${PORT}`);
});
