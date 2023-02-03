import { Box, Button, Text } from "grommet";
import { Refresh } from "grommet-icons";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import { Indicator } from "./indicator";

type ServiceStatusItemProps ={
  serviceName: string;
  serviceEndpoint: string;
}

export type ServiceStatus = 'Connected' | 'Waiting' | 'Disconnected'


export const ServiceStatusItem: FC<PropsWithChildren<ServiceStatusItemProps>> = ({
  children,
  serviceName,
  serviceEndpoint
}) => {
  const [status, setStatus] = useState<ServiceStatus>('Disconnected');
  const [msg, setMsg] = useState<string>('');


  const getStatus = async () => {
    setStatus('Waiting');
    const statusResult = await fetch(serviceEndpoint);
    setMsg(statusResult[1].data.body);

    if(statusResult[0]){
      setStatus('Connected');
    } else {
      setStatus('Disconnected');
    }
  }

  return (
    <Box style={{whiteSpace: 'nowrap'}} direction="row" width={"100%"} align='center' justify="between">
      <Text size='small'>{serviceName}</Text>
      <Box direction="row" align='center'>
        <Button size='small' icon={<Refresh size='small'/>} onClick={() => getStatus()}/>
        <Indicator status={status} />
      </Box> 
    </Box>
  )
}

const fetch = async (url: string): Promise<[boolean, any]> => {

  try{
    const res = fetch(url)
    return [true, await res.data];

  } catch (err) {
    return [false, err];
  }
  
}

