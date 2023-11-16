import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { COOKIE_SECRET } from './config.js'
import { createRoles } from './libs/initialSetup.js'
import authRoutes from './routes/auth.routes.js'
import productsRoutes from './routes/products.routes.js'
import pedidosRoutes from './routes/pedidos.routes.js'
import paymentRoutes from './routes/payments.routes.js'
const app = express()

app.use(morgan('dev'))
app.use(express.json())

createRoles()

app.use(cors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Set-Cookie', 'x-access-token'],
    credentials: true,
}));

app.use((req, res, next) => {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    next();
});

app.use(cookieParser(COOKIE_SECRET))

app.use('/api/auth', authRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/pedidos', pedidosRoutes)
app.use('/api/payment', paymentRoutes)

export default app