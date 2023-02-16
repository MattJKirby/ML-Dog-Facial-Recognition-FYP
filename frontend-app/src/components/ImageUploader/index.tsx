import { PreviewImage } from "@/pages/upload";
import {FormField, FileInput, Box, Grid, Button, Form, Text, Spinner } from "grommet"
import error from "next/error"
import { FC, PropsWithChildren, useEffect, useState } from "react";
import style from "styled-jsx/style"
import Image from "next/image";
import e from "cors";

type ImageUploaderProps = {
  onValidUpload: (results: any, files: File[]) => void;
}

type DetectionResults = {
  name: string,
  confidence: number,
  error?: string,
  bbox?: number[]
}

export const ImageUploader:FC<PropsWithChildren<ImageUploaderProps>> = ({onValidUpload}) => {
  const [value, setValue] = useState<{file: File[]} | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [detectionResults, setDetectionResults] = useState<Map<string,DetectionResults>>(new Map());
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetValue = (e: {file: File[]}) => {
    if(e.file.length > 8 || e.file.length < 4){
      setError('Please upload between 4 and 8 images.')
    } else {
      setError(null)
    }
    setValue(e)
  }


  const handleAPICall = (e: any) => {
    setLoading(true);
    photoUploadAPICall(e, 'http://127.0.0.1:5000/predict').then((res: {results: DetectionResults[]}) => {
      res.results.forEach((result: any) => setDetectionResults(prev => new Map(prev.set(result.name, result))));
      
      if (res.results.length > 0){
        const badDetections = res.results.filter(r => r.bbox === undefined);
        if(badDetections.length > 0){
          setError(`Could not detect face in images: ${badDetections.map(d => d.name).join(', ')}`)
        } else {
          setError(null)
        }
      }

      if(error === null && value !== undefined){
        console.log(true)
        onValidUpload(detectionResults, value.file);
      }
    }).catch(err => {
      setError(`Error uploading images. Please try again.`)
    }).finally(() => {
      setLoading(false);
    });
  }

  return (
    <Box pad={{top: 'small'}}>
      <Form
        value={value}
        onChange={nextValue => handleSetValue(nextValue)}
        onSubmit={(e) => handleAPICall(e)}
      >
        <FormField name="files" htmlFor="text-input-id" label={'Upload Images'}>
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
              const result = detectionResults.get(file.name)

              return (
              <Box key={index} style={{width: '100px', height: '100px', boxSizing: 'content-box'}} border={{color: result && result?.bbox === undefined ? 'red':'brand'}} background='bg2'>
                <Image alt={file.name} style={{objectFit: 'contain'}} width={100} height={100}  src={URL.createObjectURL(file)}></Image>
              </Box>
              )
            })}
            </Grid>
          </Box>
          <Box>
            <Text>{error}</Text>
            <Button label={!loading ? 'Get Face Detections' : ' '} primary disabled={error !== null || loading} icon={loading? <Spinner /> : undefined} type='submit'/>
          </Box>
        </Form>
      </Box>
  )
}

const photoUploadAPICall = async (event: any, url: string) => {
  const formData = new FormData();
  event.value.file.forEach((file: File, index: number) => formData.append(`image${index}`, file));

  const reqOptions = {
    method: 'POST',
    body: formData
  }
  const res = await fetch(url, reqOptions);
  const data = await res.json();

  if(data.statusCode !== 200){
    throw new Error(data.message)
  }
  return data;
};