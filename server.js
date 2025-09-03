const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/shristi0777/llama3-merged-lawyer",
            {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.HF_API_KEY}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    inputs: req.body.prompt,
                    parameters: {
                        max_new_tokens: 200,
                        temperature: 0.7,
                        do_sample: true,
                        return_full_text: false
                    },
                }),
            }
        );
        
        if (!response.ok) {
            throw new Error(`Hugging Face API error: ${response.status}`);
        }
        
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
