// lib/workflows.ts

// static base workflow as a JS object
const BASE_WORKFLOW = {
  "6": {
    "inputs": {
      "text": "",
      "clip": ["38", 0],
    },
    "class_type": "CLIPTextEncode",
  },
  "8": {
    "inputs": { "samples": ["31", 0], "vae": ["39", 0] },
    "class_type": "VAEDecode",
  },
  "31": {
    "inputs": {
      "seed": 535584078145945,
      "steps": 20,
      "cfg": 1,
      "sampler_name": "euler",
      "scheduler": "simple",
      "denoise": 1,
      "model": ["189", 0],
      "positive": ["35", 0],
      "negative": ["135", 0],
      "latent_image": ["124", 0],
    },
    "class_type": "KSampler",
  },
  "35": {
    "inputs": { "guidance": 2.5, "conditioning": ["177", 0] },
    "class_type": "FluxGuidance",
  },
  "38": {
    "inputs": {
      "clip_name1": "t5xxl_fp16.safetensors",
      "clip_name2": "clip_l.safetensors",
      "type": "flux",
      "device": "default",
    },
    "class_type": "DualCLIPLoader",
  },
  "39": {
    "inputs": { "vae_name": "ae.safetensors" },
    "class_type": "VAELoader",
  },
  "42": {
    "inputs": { "image": ["190", 0] },
    "class_type": "FluxKontextImageScale",
  },
  "124": {
    "inputs": { "pixels": ["42", 0], "vae": ["39", 0] },
    "class_type": "VAEEncode",
  },
  "135": {
    "inputs": { "conditioning": ["6", 0] },
    "class_type": "ConditioningZeroOut",
  },
  "136": {
    "inputs": {
      "filename_prefix": "ComfyUI",
      "images": ["8", 0],
    },
    "class_type": "SaveImage",
  },
  "142": {
    "inputs": {
      "image": "",
      "refresh": "refresh",
    },
    "class_type": "LoadImageOutput",
  },
  "177": {
    "inputs": {
      "conditioning": ["6", 0],
      "latent": ["124", 0],
    },
    "class_type": "ReferenceLatent",
  },
  "189": {
    "inputs": { "unet_name": "flux1-kontext-dev-Q3_K_S (2).gguf" },
    "class_type": "UnetLoaderGGUF",
  },
  "190": {
    "inputs": {
      "mode": "rescale",
      "supersample": "true",
      "resampling": "lanczos",
      "rescale_factor": 2,
      "resize_width": 1024,
      "resize_height": 1536,
      "image": ["142", 0],
    },
    "class_type": "Image Resize",
  },
}

// helper function to generate workflow
export function createWorkflow(prompt: string, imagePath: string) {
  const workflow = structuredClone(BASE_WORKFLOW)

  if (workflow["6"]?.inputs) workflow["6"].inputs.text = prompt
  if (workflow["142"]?.inputs) workflow["142"].inputs.image = `input/${imagePath}`
  if (workflow["136"]?.inputs)
    workflow["136"].inputs.filename_prefix = `generated_${Date.now()}`

  return workflow
}
