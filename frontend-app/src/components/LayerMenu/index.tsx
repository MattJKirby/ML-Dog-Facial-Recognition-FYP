import useKeyPress from "@/src/hooks/useKeyPress";
import { Accordion, AccordionPanel, Anchor, Box, Button, Header, Layer, Text } from "grommet";
import { Add, Close, Search } from "grommet-icons";
import { PropsWithChildren, FC, useEffect, MouseEvent } from "react";
import { ServiceStatusItem } from "../ServiceStatusItem";

type LayerMenuProps = {
  display: boolean;
  setDisplay: (display: boolean) => void;
}


export const LayerMenu:FC<PropsWithChildren<LayerMenuProps>> = ({
  children, 
  display,
  setDisplay
  }) => {
    const escape = useKeyPress('Escape');

    const handleOverlayClick = (e: MouseEvent) => {
      if(e.currentTarget === e.target){
        setDisplay(false);
      }
    };

    useEffect(() => {
      if(display && escape){
        setDisplay(false)
      }
    }, [display, escape, setDisplay]); 

  return ( 
      <div
        style={{height: '100%', width: '100%', position: 'absolute', background: !display ? 'rgba(118,78,211,0)' : 'rgba(118,78,211,0.2)', visibility: display ? 'visible' : 'hidden', transition: '0.25s'}}
        onClick={(e: MouseEvent) => handleOverlayClick(e)}
      >
        <div style={{height: '100%', width: display ? '300px' : '0', background: '#FFF', transition: '0.25s', overflowX: 'hidden'}}>
   
            <Box 
              background='bg1' 
              height={"100%"}
              elevation="small"
              justify='between'
              direction="column"
            >
              <Box>
                <Header
                  background='#FFF'
                  pad={{ left: "xsmall", right: "xsmall", vertical: "small" }}
                  elevation="none"
                  width={'100%'}
                >
                  <div>
                    Menu
                  </div>
                  <Button
                    size="small"
                    icon={<Close />} 
                    label='Close'
                    secondary
                    onClick={() => setDisplay(false)} 
                  />
                </Header>
                <Box pad='small'>
                  <Anchor weight='light' color={"#000"} margin='xsmall' label='Search' alignSelf='stretch' />
                  <Anchor weight='light' color={"#000"} margin='xsmall' label='Upload profile' style={{whiteSpace: 'nowrap'}}/>
                </Box>
              </Box>



            <Box style={{whiteSpace: 'nowrap'}}>
              <Accordion pad='small'>
                <AccordionPanel label="Services" security='asfa'>
                  <Box background={'bg2'} pad='small'>
                    {/* <Text>Services</Text> */}
                    <ServiceStatusItem serviceName="Profile Service" serviceEndpoint="http://localhost:5002/status"/>
                    <ServiceStatusItem serviceName="Detection Service" serviceEndpoint="http://127.0.0.1:5000/status"/>
                    {/* <ServiceStatusItem serviceName="Recognition Service" serviceEndpoint="http://127.0.0.1:5000/status"/> */}
                  </Box>
                </AccordionPanel>
              </Accordion>
            </Box>

             

          </Box>
        

          
        </div>
      </div>

  );
}