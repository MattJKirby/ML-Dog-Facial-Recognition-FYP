import { Box, Button, Image } from "grommet";
import { FC, PropsWithChildren, useEffect, useState } from "react"
import { DetectionResults } from ".";
import { CropPanel } from "./cropPanel";

type ImageCropperProps = {
  updateOutput: (output:string, outputName: string) => void;
  results: DetectionResults[];
  images: File[];
};


export const ImageCropper: FC<PropsWithChildren<ImageCropperProps>> = ({
  results, 
  images,
  updateOutput
}) => {
  const [croppedOutputs, setCroppedOutputs] = useState<Map<string, string>>(new Map())
  const [edit, setEdit] = useState<string | null>(null);
  
  const handleCropUpdate = (name: string, output:string) => {
    if(output !== croppedOutputs.get(name)){
      setCroppedOutputs(prev => new Map(prev.set(name, output)));
      updateOutput(output,name);
    }
  }

  return (
    <Box>
      {images && images.map((img) => {
        const result = results.find((r) => r.name === img.name);
        if(result && result.bbox !== undefined){
          return <CropPanel 
            key={img.name} 
            bbox={result.bbox} 
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
            <Box key={output[0]}  margin='medium' align="center">
              <Box style={{width: '100px', height: '100px', boxSizing: 'content-box', display: 'flex'}} background='bg2' pad='small' >
                <Image alt={output[0]} style={{objectFit: 'contain'}} height={100} src={output[1]}></Image>
              </Box>
              <Button size="small" onClick={() => setEdit(output[0])} label="View" margin={'small'}/>
            </Box>
            )
        })}
      </Box>
    </Box>
  )
}