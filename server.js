import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import sessionRoutes from './src/routes/session.js'
import rateLimit from 'express-rate-limit'

const app = express()

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 хвилин
	max: 100, // Ліміт 100 запитів
	message: 'Too many requests from this IP, please try again later.',
})

app.use(limiter)

const PORT = process.env.PORT || 3000

// Middleware
app.use(
	cors({
		origin: ['http://localhost:3000'], // Дозволити тільки потрібні домени
	})
)
app.use(express.static('public'))

// Routes
app.use('/session', sessionRoutes)

// Start server
app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`)
})
