import axios from "axios"

export const fetchAiResponse = async (query: string) => {
    try {
        const payload = {
            content: query
        }

        const aiResponse = await axios.post(`http://peerprep-assistant-api:3030/sendQuestion`, payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return aiResponse.data.choices[0].message.content
    } catch (error) {
        console.log(error)
    }
}