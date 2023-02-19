import { PreviewImage } from "@/pages/upload/new";
import {FormField, FileInput, Box, Grid, Button, Form, Text, Spinner } from "grommet"
import error from "next/error"
import { FC, PropsWithChildren, useEffect, useRef, useState } from "react";
import style from "styled-jsx/style"
import Image from "next/image";
import e from "cors";

type ImageUploaderProps = {
  min: number;
  max: number
  onValidUpload: (results: DetectionResults[], files: File[]) => void;
}

export type DetectionResults = {
  name: string,
  confidence: number,
  error?: string,
  bbox?: number[]
}

export const ImageUploader:FC<PropsWithChildren<ImageUploaderProps>> = ({
  min,
  max,
  onValidUpload
}) => {
  const formRef = useRef<HTMLFormElement | null>(null)
  const [value, setValue] = useState<{file: File[]} | undefined>(undefined);
  const [error, setError] = useState<string | null>(null);
  const [detectionResults, setDetectionResults] = useState<Map<string,DetectionResults>>(new Map());
  const [loading, setLoading] = useState<boolean>(false);

  const handleSetValue = (e: {file: File[]}) => {
    if(e.file.length > max || e.file.length < min){
      setError(max === 1 ? `Please upload 1 image` : `Please upload between ${min} and ${max} images.`)
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
        onValidUpload(res.results, value.file);
      }
    }).catch(err => {
      setError(`Error uploading images. Please try again.`)
    }).finally(() => {
      setLoading(false);
    });
  }

  return (<>
    <Box pad={{top: 'small', bottom: 'small'}} direction="row" width="100%" justify='between' background='bg1' align='center'>
      <Box flex={{grow: 1}} margin={'small'} width={{max: !value || value.file.length < 1? "100%" : "50%"}}>
        <Form
          ref={formRef}
          value={value}
          onChange={nextValue => handleSetValue(nextValue)}
          onSubmit={(e) => handleAPICall(e)}
          style={{marginBottom: '-12px'}}
        >
        <FormField name="files" htmlFor="text-input-id">
          <FileInput
            multiple={max > 1}
            name="file"
            max={max}
            min={1}
          />
          </FormField>
        </Form>
      </Box>
      { value && value.file.length > 0 && 
        <Box flex={{grow: 1}}>
          <Box pad='small' style={{display: "grid", gap: "1rem", gridTemplateColumns: "repeat(auto-fit, minmax(100px, 1fr))"}} align='center'>
            {value && value.file.map((file, index) => {
              const result = detectionResults.get(file.name)
              return (
                <Box key={index} style={{width: '100px', height: '100px', boxSizing: 'content-box'}} border={{color: result && result?.bbox === undefined ? 'red':'brand'}} background='bg2'>
                  <Image alt={file.name} style={{objectFit: 'contain'}} width={100} height={100}  src={URL.createObjectURL(file)}></Image>
                </Box>
                )
              })}
          </Box>
        </Box>
      }
        
          </Box>
             <Box margin={'small'}>
              <Text size="small" color={'red'} margin='xsmall'>{error}</Text>
              <Button label={!loading ? 'Get Face Detections' : ' '} primary disabled={error !== null || loading || !value} icon={loading? <Spinner /> : undefined} onClick={() => formRef.current?.requestSubmit()} />
           </Box>
           </>
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