import { PreviewImage } from "@/pages/upload";
import {FormField, FileInput, Box, Grid, Button, Form, Text } from "grommet"
import error from "next/error"
import { FC, PropsWithChildren, useEffect, useState } from "react";
import style from "styled-jsx/style"
import Image from "next/image";

type ImageUploaderProps = {
  onValidUpload: (results: any, files: File[]) => void;
}

export const ImageUploader:FC<PropsWithChildren<ImageUploaderProps>> = ({onValidUpload}) => {
  const [value, setValue] = useState<{file: File[]} | undefined>(undefined);
  const [validUpload, setValidUpload] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [falseDetections, setFalseDetections] = useState<string[]>([]);



  useEffect(() => {
    if(value !== undefined){
      const valueCount = value.file.length;
      if(valueCount > 0 && valueCount < 9){
        setValidUpload(true);
        setError('')
      } else {
        setError('Please upload between 4 and 8 images.')
        setValidUpload(false)
      }
    }
    
  },[value]);


  const handleAPICall = (e: any) => {
    try{
      setFalseDetections([]);
      photoUploadAPICall(e, 'http://127.0.0.1:5000/predict').then((res) => {
        res.results.forEach((result: any) => {
          if(result.error !== undefined){
            setValidUpload(false);
            setFalseDetections(prev => [...prev, result.name])
            setError(`${result.error} Please remove or replace the image.`)
          }
        });

        if(validUpload && value){
          onValidUpload(res.results, value.file);
        };
      })
      
    } catch (err){
      setError(`Error uploading images. Please try again.`)
    }
  }

  return (
    <Form
      value={value}
      onChange={nextValue => setValue(nextValue)}
      onSubmit={(event: any) => handleAPICall(event)}
    >
      <FormField name="files" htmlFor="text-input-id" label="Upload images">
        <FileInput
          multiple={true}
          name="file"
          max={8}
          min={1}
        />
      </FormField>
      <Box fill='horizontal' margin='1em'>
        <Grid
          fill='horizontal'
          rows={['auto']}
          columns={{count: 5, size: 'auto'}}
          gap="small"
        >
          {value && value.file.map((file, index) => {
            const hasError = falseDetections.includes(file.name)
            return (
            <Box key={index} style={{width: '100px', height: '100px', boxSizing: 'content-box'}} border={{color: hasError ? 'red':'brand'}} background='bg2'>
              <Image alt={file.name} style={{objectFit: 'contain'}} width={100} height={100}  src={URL.createObjectURL(file)}></Image>
            </Box>
            )
          })}
          </Grid>
        </Box>
        <Box>
          <Text>{error}</Text>
          <Button label="Next" primary disabled={!validUpload} type='submit'/>
        </Box>
      </Form>
  )
}

const photoUploadAPICall = async (event: any, url: string) => {
  const formData = new FormData();
  event.value.file.forEach((file: File, index: number) => formData.append(`image${index}`, file));

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