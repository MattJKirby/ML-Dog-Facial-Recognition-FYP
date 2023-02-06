import { AppBar } from "@/src/components/AppBar"
import { Anchor, Box, Button, FileInput, Form, Grommet, Menu, Page, PageContent, PageHeader, FormField, Grid, Text } from 'grommet'
import { theme } from '@/src/utils'
import { useState } from "react";
import { ImageUploader } from "@/src/components/ImageUploader";

export type PreviewImage = {
  name: string;
  src: string;
}



const Upload = () => {


  return(
    <>
      <Grommet full theme={theme}>
        <AppBar />
        <Page background='bg1' fill='vertical'>
          <PageContent justify='center'>
            <Box background={'#FFF'} pad='small' margin={'small'}>
              <PageHeader
                title="Upload a profile"
                subtitle="A subtitle for the page."
                parent={<Anchor label="Parent Page" />}
            />
              <Box>
                <Box style={{maxWidth: '800px'}}>
                  <ImageUploader />
                </Box>
              </Box>
            </Box>
          </PageContent>
        </Page>
      </Grommet>
    </>
  )
}

export default Upload