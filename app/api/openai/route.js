import { NextResponse } from "next/server";
import OpenAI from "openai"

const token = process.env.TOKEN
const endpoint = process.env.ENDPOINT
const model = process.env.MODEL

export async function POST(request) {

    const body = await request.json()

    const client = new OpenAI({ baseURL: endpoint, apiKey: token });

    const response = await client.chat.completions.create({
        model: model,
        messages: [
            { role: "system", content: "" },
            { role: "user", content: `Check this for grammar and spelling: ${body.input_text}` }
        ],
    });

    return NextResponse.json(
        { response: response.choices[0].message.content }
    )

}