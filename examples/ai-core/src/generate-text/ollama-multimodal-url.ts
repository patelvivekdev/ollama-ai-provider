#! /usr/bin/env -S pnpm tsx
import { generateText } from 'ai'
import { ollama } from 'ollama-ai-provider'
import { OllamaChatModelId } from 'ollama-ai-provider/src/ollama-chat-settings'

import { buildProgram } from '../tools/command'

async function main(model: OllamaChatModelId) {
  const result = await generateText({
    maxTokens: 512,
    messages: [
      {
        content: [
          { text: 'Describe the image in detail.', type: 'text' },
          {
            image: new URL(
              'https://github.com/vercel/ai/blob/main/examples/ai-core/data/comic-cat.png?raw=true',
            ),
            type: 'image',
          },
        ],
        role: 'user',
      },
    ],
    model: ollama(model),
  })

  console.log(result.text)
}

buildProgram('llava-llama3', main).catch(console.error)
