import { Anchor, Box, Button, Header, HeaderProps, Text } from "grommet";
import { Add, Home, Menu } from 'grommet-icons'
import { FC, PropsWithChildren } from "react";

type AppBarProps ={
  props?: HeaderProps;
}

export const AppBar: FC<PropsWithChildren<AppBarProps>> = ({children, props}) => {
  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '100%'}}>
      <Header background="brand"
      flex={'grow'}
        pad={{ left: "small", right: "small", vertical: "small" }}
        elevation="small"
        {...props}>
          <div>
            <Button primary  icon= {<Menu />} label="Menu"/>
            <Anchor icon={<Home />} size='xsmall' />
          </div>
          <Text size="large">Dog Search App</Text>
          {children}
      </Header>
    </div>
  )
}