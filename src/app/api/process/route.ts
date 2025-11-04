import { NextRequest,NextResponse } from 'next/server';
import OpenAI from 'openai';
import fs from 'fs/promises';

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: "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"
});



async function readTxtFile(filePath: string): Promise<string> {
  try {
    const content = await fs.readFile(filePath, 'utf-8');
    return content;
  } catch (error) {
    console.error('Ошибка чтения файла:', error);
    throw error;
  }
}


export async function POST(request: NextRequest) {
  try{
    const { input } = await request.json();
    const fileContent = await readTxtFile(".\tamplate\temp.txt");

  
     const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3.1:free",
        messages: [
            {
            "role": "system",
            "content": fileContent
          },
          {
            "role": "user",
            "content": input
          }
        ],
        
      });

      const data = await completion.choices[0]?.message.content || "no response";
  

      const procssesValue = processInput(data);
      return NextResponse.json({ processedValue: procssesValue,success:true});
   

  } catch (error) {
    console.error("Error parsing JSON:", error);
  }




  function processInput(value:string ):string {
    return value.toUpperCase().trim();
  }

}






