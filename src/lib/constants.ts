export const edit_templates = [
    {
      id:0,
      name:"Repair",
      description:"Restore photos",
      image:["/images/restore_before.jpeg","/images/restore_after.png"],
    },
    {
      id:1,
      name:"Enhance",
      description:"Improve image quality",
      image:["/images/enhance_before.jpg","/images/enhance_after.png"],
    },
    {
      id:2,
      name:"Colorize",
      description:"Add color to black and white images",
      image:["/images/colorize_before.png","/images/colorize_after.png"],
    },
    {
      id:3,
      name:"transform weather",
      description:"Transform images into weather-themed art",
      image:["/images/weather_before.jpg","/images/weather_after.png"],
    },
    {
      id:4,
      name:'Oil Painting ',
      description:'Transform images into oil paintings',
      image:["/images/oilpainting_before.png","/images/oilpainting_after.png"], 
    }
  ]

export type TypeEditTemplate = {
  id: number; 
  name: string;
  description: string;
  image: string[];
}


export const admins = [
  'user_1',
  'user_2',
  'user_3'
];
