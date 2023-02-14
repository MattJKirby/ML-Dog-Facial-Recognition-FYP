import { AppBar } from "@/src/components/AppBar"
import { Anchor, Box, Button, FileInput, Form, Grommet, Menu, Page, PageContent, PageHeader, FormField, Grid, Text, TextInput, Select, CheckBox } from 'grommet'
import { theme } from '@/src/utils'
import { useEffect, useState } from "react";
import { ImageUploader } from "@/src/components/ImageUploader";
import { ImageCropper } from "@/src/components/ImageUploader/imageCropper";
import Router from 'next/router';

export type PreviewImage = {
  name: string;
  src: string;
}


const Upload = () => {
  const [uploader, setUploader] = useState<boolean>(true);
  const [cropper, setCropper] = useState<boolean>(false);
  const [detectionResults, setDetectionResults] = useState<any>(undefined);
  const [detectionImages, setDetectionImages] = useState<any[]>([]);
  const [value, setValue] = useState<any>({dogName: '', breed: '',ownerfName: '', ownerlName: '', phoneNumber: ''});
  const [breedsList, setBreedsList] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('')
  const [ready, setReady] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false)

  useEffect(() => {
    if(breedsList.length === 0){
      formOptionsApiCall("https://dog.ceo/api/breeds/list/all").then(res => {
        setBreedsList(Object.keys(res.message))
      })
    }
  })

  const onValidUpload = (results: any, images: File[]) => {
    setUploader(false);
    setCropper(true);
    setDetectionResults(results);
    setDetectionImages(images);
    setReady(true)
  }

  const handleFormSumbit = (value: any) => {
    if(detectionImages.length > 3){
      newProfileApiCall('http://localhost:5001', value, detectionImages)
    }
  }

  return(
    <>
      <Grommet full theme={theme}>
        <AppBar />
        <Page background='bg1' fill='vertical'>
          <PageContent justify='center'>
              <Box fill={true} justify='center' width={'800px'} align='center'>
                <Box style={{maxWidth: '800px', width: "100%"}}>
              <Form
                value={value}
                onChange={nextValue => setValue(nextValue)}
                onReset={() => setValue({})}
                onSubmit={({ value }) => handleFormSumbit(value)}
                style={{width: "100%"}}
              >
                 <PageHeader
                title="Upload a profile"
                subtitle="Upload a profile to register a missing dog into out database."
                parent={<Anchor label="Parent Page" />}
                actions={ <Box direction="row" gap="medium">
                <Button disabled={!ready && checked} type="submit" primary label="Submit" />
                <Button type="reset" label="Reset" onClick={() => Router.reload()} />
              </Box>}
                />
                <Box direction="row" gap="medium" style={{width: "100%"}}>
                  <FormField name="Your pet's name" htmlFor="dogName" label="Pet's name">
                    <TextInput id="dogName" name="dogName" required/>
                  </FormField>
                  <FormField name="Breed" htmlFor="dogName" label="Breed">
                  <Select
                    id="breed"
                    name="breed"
                    value={selectedBreed}
                    options={breedsList}
                    onChange={({ option }) => {setSelectedBreed(option)}}
                    required
                  />
                  </FormField>
                </Box>
                <Box direction="row" gap="medium" style={{width: "100%"}}>
                  <FormField name="Owner name" htmlFor="ownerfName" label="Owner's first name">
                    <TextInput id="ownerfName" name="ownerfName" required />
                  </FormField>
                  <FormField name="Owner name" htmlFor="ownerlName" label="Owner's last name">
                    <TextInput id="ownerlName" name="ownerlName" required />
                  </FormField>
                  <FormField name="Owner name" htmlFor="phoneNumber" label="Phone number">
                    <TextInput id="phoneNumber" name="phoneNumber" required/>
                  </FormField>
                </Box>
                <FormField name="Disclaimer" htmlFor="disclaimer" label="Disclaimer">
                  <CheckBox
                    checked={checked}
                    label="I confirm I am the legal owner of this dog."
                    onChange={(event) => setChecked(event.target.checked)}
                    required
                  />
                </FormField>
              </Form>

                  {uploader && 
                    <ImageUploader onValidUpload={(results:any, images: File[]) => onValidUpload(results, images)}/>
                  }

                  {cropper &&
                    <ImageCropper results={detectionResults} images={detectionImages}/>
                  }
  
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

const newProfileApiCall = async (url: string, value: any, images: File[]) => {
  const formData = new FormData();
  images.forEach((file: File, index: number) => formData.append(`image${index}`, file));
  formData.append('formData', value)

  const reqOptions = {
    method: 'POST',
    body: formData
  }
  // const res = await fetch(url, reqOptions);
  const res = await fetch(url, reqOptions);
  const data = await res.json();

  if(data.statusCode !== 200){
    throw new Error(data.message)
  }
  return data;
};


