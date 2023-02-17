import { Anchor, Box, Button, Header, HeaderProps, Text } from "grommet";
import { Add, Home, Menu } from 'grommet-icons'
import { FC, PropsWithChildren, useState } from "react";
import { LayerMenu } from "../LayerMenu";

type AppBarProps ={
  props?: HeaderProps;
}

export const AppBar: FC<PropsWithChildren<AppBarProps>> = ({children, props}) => {
  const [menu, setMenu] = useState(false);
  
  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
      <Header background="#FFF"
      flex={'grow'}
        pad={{ left: "small", right: "small", vertical: "small" }}
        elevation="none"
        {...props}>
          <div>
            <Button  icon= {<Menu />} label="Menu" onClick={() => setMenu(!menu)}/>
            <Anchor icon={<Home />} size='xsmall' />
          </div>
          <Text size="large"></Text>
          {children}
      </Header>
      <LayerMenu display={menu} setDisplay={() => setMenu(!menu)} />
    </div>
  )
}