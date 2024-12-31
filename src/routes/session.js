import express from 'express'
import fetch from 'node-fetch'

const router = express.Router()

if (!process.env.OPENAI_API_KEY) {
	throw new Error('OPENAI_API_KEY is missing in the environment variables.')
}

router.get('/', async (req, res) => {
	try {
		const response = await fetch(
			'https://api.openai.com/v1/realtime/sessions',
			{
				method: 'POST',
				headers: {
					Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					model: 'gpt-4o-mini-realtime-preview-2024-12-17',
					voice: 'verse',
				}),
			}
		)

		if (!response.ok) {
			throw new Error(`OpenAI API error: ${response.statusText}`)
		}

		const data = await response.json()
		res.json(data)
	} catch (error) {
		console.error('Error fetching ephemeral key:', error.message)
		res.status(500).json({ error: 'Internal server error' })
	}
})

export default router
