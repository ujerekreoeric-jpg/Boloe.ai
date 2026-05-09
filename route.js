
import { GoogleGenerativeAI } from '@google/generative-ai'

export async function POST(req) {
  try{
    const form = await req.formData()
    const image = form.get('image')

    const bytes = await image.arrayBuffer()

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash'
    })

    const result = await model.generateContent([
      `
Use the input image as strict identity reference.

Analyze this image and create a hyper detailed cinematic realism image generation prompt.
Never describe race, age, ethnicity, or hair.
Return only the final prompt.
      `,
      {
        inlineData: {
          data: Buffer.from(bytes).toString('base64'),
          mimeType: image.type
        }
      }
    ])

    const response = await result.response
    const text = response.text()

    return Response.json({
      prompt: text
    })

  } catch(error){
    return Response.json({
      error: error.message
    })
  }
}
