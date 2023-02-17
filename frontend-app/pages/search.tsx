import { AppBar } from "@/src/components/AppBar";
import { DetectionResults, ImageUploader } from "@/src/components/ImageUploader";
import { ImageCropper } from "@/src/components/ImageUploader/imageCropper";
import { theme } from "@/src/utils";
import { Anchor, Box, Button, FileInput, Form, FormField, Grommet, Page, PageContent, PageHeader } from "grommet";
import { useState } from "react";

const Search = () => {
  const [uploader, setUploader] = useState<boolean>(true);
  const [cropper, setCropper] = useState<boolean>(false);
  const [detectionResults, setDetectionResults] = useState<DetectionResults[] | null>(null);
  const [detectionImages, setDetectionImages] = useState<File[]>([]);
  
  const onValidUpload = (results: any, images: File[]) => {
    setUploader(false);
    setCropper(true);
    setDetectionResults(results);
    setDetectionImages(images);
    // setReady(true)
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
                subtitle="Upload an image to indentify a missing dog."
                parent={<Anchor label="Parent Page" />}
              />
              {uploader && 
                <ImageUploader min={1} max={1} onValidUpload={(results:DetectionResults[], images: File[]) => onValidUpload(results, images)}/>
              }

              {cropper && detectionResults &&
                <ImageCropper results={detectionResults} images={detectionImages}/>
              }

            <Form>
              <Button label=""/>
            </Form>
           </Box>  
          </Box>  
       </PageContent>  
      </Page>
    </Grommet>
  )
}

export default Search;