import { AppBar } from "@/src/components/AppBar";
import { DetectionResults, ImageUploader } from "@/src/components/ImageUploader";
import { ImageCropper } from "@/src/components/ImageUploader/imageCropper";
import { theme } from "@/src/utils";
import { Anchor, Box, Button, Grommet, Page, PageContent, PageHeader } from "grommet";
import Router from "next/router";
import { useState } from "react";

const Search = () => {
  const [uploader, setUploader] = useState<boolean>(true);
  const [cropper, setCropper] = useState<boolean>(false);
  const [detectionResults, setDetectionResults] = useState<DetectionResults[] | null>(null);
  const [sourceImages, setSourceImages] = useState<File[]>([]);
  const [croppedImages, setCroppedImages] = useState<File[]>([]);
  
  const onValidUpload = (results: any, images: File[]) => {
    setUploader(false);
    setCropper(true);
    setDetectionResults(results);
    setSourceImages(images);
  }

  const handleCropUpdate = (output: string, name: string) => {
    fetch(output)
    .then(res => res.blob())
    .then(blob => {
      const file = new File([blob], name,{ type: "image/png" })
      setCroppedImages(prev => [...prev.filter(d => d.name !== name), file])
    })
  }

  const handleSubmit = () => {
    predictApiCall('http://127.0.0.1:5001/predict',croppedImages[0])
  }

  return(
    <Grommet full theme={theme}>
    <AppBar />
      <Page background='bg1' fill='vertical'>
        <PageContent justify='center'>
          <Box fill={true} justify='center' width={'800px'} align='center'>
            <Box style={{maxWidth: '800px', width: "100%"}}>
              <PageHeader
                title="Identify a Dog"
                subtitle="Upload an image to identify a missing dog."
                parent={<Anchor label="Search" onClick={() => Router.reload()}/>}
                actions={ 
                  <Box direction="row" gap="medium">
                    <Button primary label="Search" disabled={croppedImages.length !== 1} onClick={() => handleSubmit()}/>
                    <Button type="reset" label="Reset" onClick={() => Router.reload()} />
                  </Box>}
              />
              {uploader && 
                <ImageUploader min={1} max={1} onValidUpload={(results:DetectionResults[], images: File[]) => onValidUpload(results, images)}/>
              }

              {cropper && detectionResults &&
                <ImageCropper results={detectionResults} images={sourceImages} updateOutput={handleCropUpdate}/>
              }
           </Box>  
          </Box>  
       </PageContent>  
      </Page>
    </Grommet>
  )
}

export default Search;

const predictApiCall = async (url: string, target: File) => {
  const formData = new FormData();
  formData.append(`image`, target);

  const reqOptions = {
    method: 'POST',
    body: formData
  }

  const res = await fetch(url, reqOptions);
  return await res.json();
};


