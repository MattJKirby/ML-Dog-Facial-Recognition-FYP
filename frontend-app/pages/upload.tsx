import { AppBar } from "@/src/components/AppBar"
import { Anchor, Box, Button, FileInput, Form, Grommet, Menu, Page, PageContent, PageHeader, FormField, Grid, Text, TextInput, Select } from 'grommet'
import { theme } from '@/src/utils'
import { useEffect, useState } from "react";
import { ImageUploader } from "@/src/components/ImageUploader";
import { ImageCropper } from "@/src/components/ImageUploader/imageCropper";

export type PreviewImage = {
  name: string;
  src: string;
}


const Upload = () => {
  const [uploader, setUploader] = useState<boolean>(true);
  const [cropper, setCropper] = useState<boolean>(false);
  const [detectionResults, setDetectionResults] = useState<any>(undefined);
  const [detectionImages, setDetectionImages] = useState<any[]>([]);
  const [value, setValue] = useState<any>({});
  const [breedsList, setBreedsList] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('')

  useEffect(() => {
    formOptionsApiCall("https://dog.ceo/api/breeds/list/all").then(res => {
      setBreedsList(Object.keys(res.message))
    })
  })

  const onValidUpload = (results: any, images: File[]) => {
    setUploader(false);
    setCropper(true);
    setDetectionResults(results);
    setDetectionImages(images);
  }

  return(
    <>
      <Grommet full theme={theme}>
        <AppBar />
        <Page background='bg1' fill='vertical'>
          <PageContent justify='center'>
              <Box fill={true} justify='center' width={'800px'} align='center'>
                <Box style={{maxWidth: '800px', width: "100%"}}>
                <PageHeader
                title="Upload a profile"
                subtitle="Upload a profile to register a missing dog into out database."
                parent={<Anchor label="Parent Page" />}
            />
              <Form
                value={value}
                onChange={nextValue => setValue(nextValue)}
                onReset={() => setValue({})}
                onSubmit={({ value }) => {}}
                style={{width: "100%"}}
              >
                <Box direction="row" gap="medium" style={{width: "100%"}}>
                  <FormField name="Your pet's name" htmlFor="dogName" label="Pet's name">
                    <TextInput id="dogName" name="dogName" />
                  </FormField>
                  <FormField name="Breed" htmlFor="dogName" label="Breed">
                  <Select
                    value={selectedBreed}
                    options={breedsList}
                    onChange={({ option }) => option !== null ? setSelectedBreed(option) : null}
                  />
                  </FormField>
                </Box>
                <Box direction="row" gap="medium" style={{width: "100%"}}>
                  <FormField name="Owner name" htmlFor="ownerfName" label="Owner's first name">
                    <TextInput id="ownerfName" name="ownerfName" />
                  </FormField>
                  <FormField name="Owner name" htmlFor="ownerlName" label="Owner's last name">
                    <TextInput id="ownerlName" name="ownerlName" />
                  </FormField>
                  <FormField name="Owner name" htmlFor="phoneNumber" label="Phone number">
                    <TextInput id="phoneNumber" name="phoneNumber" />
                  </FormField>
                </Box>

                {uploader && 
                    <ImageUploader onValidUpload={(results:any, images: File[]) => onValidUpload(results, images)}/>
                  }

                  {cropper &&
                    <ImageCropper results={detectionResults} images={detectionImages}/>
                  }

                <Box direction="row" gap="medium">
                  <Button type="submit" primary label="Submit" />
                  <Button type="reset" label="Reset" />
                </Box>
              </Form>
             
                
                  
                  </Box>
              </Box>
          </PageContent>
        </Page>
      </Grommet>
    </>
  )
}

export default Upload

const formOptionsApiCall = async (url: string) => {
  const reqOptions = {
    method: 'GET'
  }
  const res = await fetch(url, reqOptions);
  const data = await res.json();

  if(data.status !== 'success'){
    throw new Error(data.message)
  }
  return data;
};

