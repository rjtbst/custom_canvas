import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import { URL } from 'url'
import { createWorkflow } from '@/lib/workflow'

export async function POST(req: Request) {
  try {
    const { fileName, prompt } = await req.json()

    if (!fileName || !prompt) {
      return NextResponse.json(
        { error: 'Missing fileName or prompt' },
        { status: 400 }
      )
    }

    // ✅ handle both plain paths and full S3 URLs
    const s3Url = fileName.startsWith('http')
      ? fileName
      : `https://photo-editor-uploads.s3.us-east-1.amazonaws.com/${fileName}`

    // ✅ strip query params and invalid chars from presigned URL
    const cleanFileName = path.basename(new URL(s3Url).pathname)

    // ✅ define ComfyUI input folder (your local path)
    const comfyInputDir = 'D:/comf/ComfyUI_windows_portable/ComfyUI/input'
    const localFilePath = path.join(comfyInputDir, cleanFileName)

    // ensure directory exists
    fs.mkdirSync(comfyInputDir, { recursive: true })

    // ✅ download the image from S3 and save locally
    const response = await fetch(s3Url)
    if (!response.ok)
      throw new Error(`Failed to download file: ${response.statusText}`)

    const buffer = await response.arrayBuffer()
    fs.writeFileSync(localFilePath, Buffer.from(buffer))
    console.log(`✅ File downloaded to ${localFilePath}`)

    // ✅ build ComfyUI workflow using just the filename
    const workflow = createWorkflow(prompt, cleanFileName)

    // send to ComfyUI API
    const comfyUIEndpoint = 'http://127.0.0.1:8188/prompt'
    const res = await fetch(comfyUIEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: workflow }),
    })

    const result = await res.json()
    return NextResponse.json({ result })
  } catch (err) {
    console.error('❌ ComfyUI API error:', err)
    return NextResponse.json(
      {
        error: 'Failed to communicate with ComfyUI',
        details: (err as Error).message,
      },
      { status: 500 }
    )
  }
}
