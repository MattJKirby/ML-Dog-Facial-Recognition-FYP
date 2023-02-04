import { Box, Button, Text } from "grommet";
import { Refresh } from "grommet-icons";
import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
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
  const [initialCall, setInitialCall] = useState<boolean>(false);
  const [msg, setMsg] = useState<string>('');


  const getStatus = useCallback(async () => {
    setStatus('Waiting');
    try {
      const statusResult = await indicatorAPICall(serviceEndpoint);
      setStatus("Connected");
    } catch (err) {
      setStatus("Disconnected");
      console.log(err);
    }
  }, [serviceEndpoint])

  useEffect(() => {
    if(!initialCall){
      setInitialCall(true)
      getStatus()
    }
  }, [getStatus, initialCall])


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

const indicatorAPICall = async (url: string) => {
  const reqOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  }
  const res = await fetch(url, reqOptions);
  const data = await res.json();

  if(data.statusCode !== 200){
    throw new Error(data.message)
  }
  return data;
};

