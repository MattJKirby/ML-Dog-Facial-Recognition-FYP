import { FC, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react'
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop, { Crop, PixelCrop }  from 'react-image-crop'
import { Box, Button } from 'grommet';

type CroppedProps ={
  image: File;
  bbox: number[];
  display: boolean;
  onOutputChange: (name: string, output: string) => void;
  onAccept: () => void;
}

//[x1,y1,x2,y2]
function generateInitialCrop(bbox: number[]): Crop{
  return {
    x: bbox[0],
    y: bbox[1],
    width: bbox[2] - bbox[0],
    height: bbox[3] - bbox[1],
    unit: 'px'
  }
}

export const CropPanel: FC<PropsWithChildren<CroppedProps>> = ({ 
  image,
  bbox,
  display,
  onOutputChange,
  onAccept
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const src = URL.createObjectURL(image);
  const [crop, setCrop] = useState<Crop>(generateInitialCrop(bbox));
  const [output, setOutput] = useState<string | null>(null);

  const handleChange = (c: PixelCrop) => {
    setCrop(c);
    generateCroppedPreview()
  }

  const generateCroppedPreview = useCallback(() => {
      const imgFromRef = imgRef.current

      if(imgFromRef !== null){
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        const scaleX = imgFromRef.naturalWidth / imgFromRef.width;
        const scaleY = imgFromRef.naturalHeight / imgFromRef.height;
        canvas.width = crop.width;
        canvas.height = crop.height;

        if(context && imgRef.current){
          context.drawImage(
            imgRef.current,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height,
          );
          const base64Image = canvas.toDataURL('image/jpeg');
          setOutput(base64Image);
          onOutputChange(image.name,base64Image)
      }
    }
  },[crop.height, crop.width, crop.x, crop.y, image.name, onOutputChange]);

  return ( 
    <Box  style={{height: '100%', width: '100%', position: 'absolute', background: !display ? 'rgba(255,255,255,0)' : 'rgba(255,255,255,0.6)', visibility: display ? 'visible' : 'hidden', top: '0', left: '0'}}>
      <Box style={{width: '100%', height: '100%', position: 'relative', border: '1px solid blue', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
        <Box>
          <ReactCrop
          crop={crop} 
          onChange={c => handleChange(c)} 
          onComplete={() => generateCroppedPreview()}
        >
          <img ref={imgRef} src={src} onLoad={() => generateCroppedPreview()}/>
        </ReactCrop>
        <Box direction='row' pad='small'>
          <Button primary onClick={() => onAccept()} label="Accept" />
          <Button secondary onClick={() => setCrop(generateInitialCrop(bbox))} label='Reset' />
        </Box>
        
          
        </Box>
      </Box>
    </Box>
  )
}