import { Box, Button, Image } from "grommet";
import { Edit } from "grommet-icons";
import { FC, PropsWithChildren, useState } from "react"
import { CropPanel } from "./cropPanel";

type ImageCropperProps = {
  results: any[];
  images: File[];
};


export const ImageCropper: FC<PropsWithChildren<ImageCropperProps>> = ({results, images}) => {
  const [croppedOutputs, setCroppedOutputs] = useState<Map<string, string>>(new Map())
  const [edit, setEdit] = useState<string | null>(null);
  
  const handleCropUpdate = (name: string, output:string) => {
    if(output !== croppedOutputs.get(name)){
      setCroppedOutputs(prev => new Map(prev.set(name, output)))
    }
  }


  return (
    <Box>
      {images && images.map((img) => {
        const result = results.find((r) => r.name === img.name);
        if(result){
          return <CropPanel 
            key={img.name} 
            bbox={result.boundingBoxCoordinates} 
            display={img.name === edit} 
            image={img} 
            onOutputChange={(name, output) => handleCropUpdate(name, output)}
            onAccept={() => (setEdit(null))}
            />
        }  
      }
      )}

      <Box direction="row" >
        {Array.from(croppedOutputs.entries()).map(output => {
          return (
            <Box key={output[0]} style={{width: "200px"}} margin='small' align="center">
              <Box style={{width: '200px', height: '200px', boxSizing: 'content-box'}} background='bg2'>
                <Image alt={output[0]} style={{objectFit: 'contain'}} width={200} height={200}  src={output[1]}></Image>
              </Box>
              <Button size="small" onClick={() => setEdit(output[0])} label="Edit" margin={'small'}/>
            </Box>
            )
        })}
      </Box>
    </Box>
  )
}