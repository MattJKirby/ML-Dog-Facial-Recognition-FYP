import { AppBar } from "@/src/components/AppBar";
import { theme } from "@/src/utils";
import { Grommet, Page, PageContent, Box, PageHeader, Anchor, Button } from "grommet";
import Router from "next/router";


const Done = () => {

  return (
    <Grommet full theme={theme}>
        <AppBar />
          <Page background='bg1' fill='vertical'>
            <PageContent justify='center'>
              <Box fill={true} justify='center' width={'800px'} align='center'>
                <Box style={{maxWidth: '800px', width: "100%"}}>
                  <PageHeader
                    title="Success!"
                    subtitle="Congratulations! Your pet's profile has been successfully uploaded."
                    parent={<Anchor label="Upload" onClick={() => Router.push('/upload/new')}/>}
                    actions={ 
                      <Box direction="row" gap="medium">
                        <Button primary label="Home" onClick={() => Router.push('/')}/>
                      </Box>}
                  />
                </Box>
              </Box>
            </PageContent>
          </Page>
        </Grommet>
  )
}

export default Done;