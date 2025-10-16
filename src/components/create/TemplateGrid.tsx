'use client'

import React, { useState } from 'react'
import { edit_templates } from '../../lib/constants'
import ImageHoverReveal from '../ui/ImageHoverReveal'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../ui/dialog'
import { Button } from '@/components/ui/button'
import ImageRevealSlider from '../ui/ImageRevealSlider'

const TemplateGrid = () => {
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null)

  return (
    <div className=' grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-2  '>
      {edit_templates.map((template) => (
        <Dialog key={template.id}>
          <DialogTrigger asChild>
            <div
              onClick={() => setSelectedTemplate(template)}
              className='cursor-pointer'
            >
              <ImageHoverReveal
                beforeSrc={template.image[0]}
                afterSrc={template.image[1]}
                className='rounded-3xl'
              />
              <div className='text-center mt-2 font-semibold'>
                {template.name}
              </div>
            </div>
          </DialogTrigger>

          {selectedTemplate?.id === template.id && (
            <DialogContent className='max-w-4xl text-center w-full'>
              <DialogHeader>
                <DialogTitle className='text-lg font-semibold text-center'>{template.name}</DialogTitle>
                {/* <DialogDescription>
                  {template.prompt || 'No description provided.'}
                </DialogDescription> */}
              </DialogHeader>

              <div className='mt-4 flex flex-col md:flex-row gap-6'>
                {/* Image preview */}
                <div className='flex-1 flex justify-center items-center max-h-[65vh] overflow-hidden'>
                 <ImageRevealSlider
                             showSliderButton={true}
                               beforeSrc={template.image[0]}
                               afterSrc={template.image[1]}
                               className=" rounded-3xl "
                             />
                </div>

                {/* Details */}
                <div className='flex-1 flex flex-col justify-between'>
                  <div className='space-y-2 text-sm'>
                    <p>
                      <span className='font-semibold'>Model:</span>{' '}
                      {template.model || 'Unknown'}
                    </p>
                    <p>
                      <span className='font-semibold'>Prompt:</span>{' '}
                      {template.prompt || 'N/A'}
                    </p>
                  </div>

                  {/* Generate button at the bottom */}
                  <div className='mt-auto'>
                    <Button
                      className='w-full md:w-auto'
                      onClick={async () => {
                        try {
                          const res = await fetch('/api/generate', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                              templateId: template.id,
                              prompt: template.prompt,
                            }),
                          })
                          const data = await res.json()
                          console.log('Generated image:', data)
                        } catch (err) {
                          console.error('Generate error:', err)
                        }
                      }}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
            </DialogContent>
          )}
        </Dialog>
      ))}
    </div>
  )
}

export default TemplateGrid
