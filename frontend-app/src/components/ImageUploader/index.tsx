import { PreviewImage } from "@/pages/upload";
import {FormField, FileInput, Box, Grid, Button, Form, Text } from "grommet"
import error from "next/error"
import { useEffect, useState } from "react";
import style from "styled-jsx/style"
import Image from "next/image";

export const ImageUploader = () => {
  const [value, setValue] = useState<{file: File[]} | undefined>(undefined);
  const [validUpload, setValidUpload] = useState<boolean>(false);
  const [error, setError] = useState<string>('');



  useEffect(() => {
    if(value !== undefined){
      const valueCount = value.file.length;
      if(valueCount > 3 && valueCount < 9){
        setValidUpload(true);
        setError('')
      } else {
        setError('Please upload between 4 and 8 images.')
        setValidUpload(false)
      }
    }
    
  },[value]);

  useEffect(() => {
    console.log(value)
  },[value])

  return (
    <Form
      value={value}
      onChange={nextValue => setValue(nextValue)}
      onReset={() => setValue({})}
      onSubmit={({ value }) => {}}
    >
      <FormField name="Image Upload" htmlFor="text-input-id" label="Upload images">
        <FileInput
          multiple={true}
          name="file"
          max={8}
          min={4}
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
            return (
            <Box key={index} style={{width: '100px', height: '100px', boxSizing: 'content-box'}} border={{color: 'brand'}} background='bg2'>
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