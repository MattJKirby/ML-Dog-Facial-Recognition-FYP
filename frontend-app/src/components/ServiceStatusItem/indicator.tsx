import { FC, PropsWithChildren, useCallback, useEffect, useState } from "react";
import { ServiceStatus } from ".";

type IndicatorProps ={
  status: ServiceStatus;
}

export const Indicator: FC<PropsWithChildren<IndicatorProps>> = ({status}) => {
  const [color, setColor] = useState('')

  const findColor = useCallback(() => {
    switch(status){
      case 'Connected': {
        return 'green';
      } 
      case 'Waiting': {
        return 'orange';
      }
      case 'Disconnected': {
        return 'red';
      }  
    }
  }, [status])

  useEffect(() => {
    setColor(findColor())
  }, [status, findColor])

  

  return (
    <div style={{background: color, width: '10px', height: '10px', borderRadius: '50%'}}></div>
  )
}