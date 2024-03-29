import useKeyPress from "@/src/hooks/useKeyPress";
import {
  Accordion,
  AccordionPanel,
  Anchor,
  Box,
  Button,
  Header,
  Layer,
  Text,
} from "grommet";
import { Add, Close, Search } from "grommet-icons";
import { PropsWithChildren, FC, useEffect, MouseEvent } from "react";
import { ServiceStatusItem } from "../ServiceStatusItem";
import Router, { useRouter } from "next/router";

type LayerMenuProps = {
  display: boolean;
  setDisplay: (display: boolean) => void;
};

export const LayerMenu: FC<PropsWithChildren<LayerMenuProps>> = ({
  children,
  display,
  setDisplay,
}) => {
  const escape = useKeyPress("Escape");
  const router = useRouter();

  const handleOverlayClick = (e: MouseEvent) => {
    if (e.currentTarget === e.target) {
      setDisplay(false);
    }
  };

  useEffect(() => {
    if (display && escape) {
      setDisplay(false);
    }
  }, [display, escape, setDisplay]);

  const pushToUrl = (url: string) => {
    const { pathname } = Router;
    if (pathname !== url) {
      Router.push(url);
    }
  };

  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        position: "absolute",
        background: !display ? "rgba(118,78,211,0)" : "rgba(118,78,211,0.1)",
        visibility: display ? "visible" : "hidden",
        transition: "0.25s",
      }}
      onClick={(e: MouseEvent) => handleOverlayClick(e)}
    >
      <div
        style={{
          height: "100%",
          width: display ? "300px" : "0",
          background: "#FFF",
          transition: "0.25s",
          overflowX: "hidden",
        }}
      >
        <Box
          background="bg1"
          height={"100%"}
          elevation="small"
          justify="between"
          direction="column"
        >
          <Box>
            <Header
              background="#FFF"
              pad={{ left: "xsmall", right: "xsmall", vertical: "small" }}
              elevation="none"
              width={"100%"}
            >
              <div>Menu</div>
              <Button
                size="small"
                icon={<Close />}
                label="Close"
                secondary
                onClick={() => setDisplay(false)}
              />
            </Header>
            <Box pad="small">
              <Anchor
                weight="light"
                color={router.pathname === "/" ? "brand" : "#000"}
                margin="xsmall"
                label="Home"
                alignSelf="stretch"
                onClick={() => pushToUrl("/")}
              />
              <Anchor
                weight="light"
                color={router.pathname === "/search" ? "brand" : "#000"}
                margin="xsmall"
                label="Search"
                alignSelf="stretch"
                onClick={() => pushToUrl("/search/")}
              />
              <Anchor
                weight="light"
                color={router.pathname === "/upload/new" ? "brand" : "#000"}
                margin="xsmall"
                label="Upload profile"
                style={{ whiteSpace: "nowrap" }}
                onClick={() => pushToUrl("/upload/new")}
              />
            </Box>
          </Box>

          <Box style={{ whiteSpace: "nowrap" }}>
            <Accordion pad="small">
              <AccordionPanel label="Services" security="asfa">
                <Box background={"bg2"} pad="small">
                  {/* <Text>Services</Text> */}
                  <ServiceStatusItem
                    serviceName="Profile Service"
                    serviceEndpoint="api/profile-service/status"
                  />
                  <ServiceStatusItem
                    serviceName="Detection Service"
                    serviceEndpoint="api/detection-service/status"
                  />
                  <ServiceStatusItem
                    serviceName="Recognition Service"
                    serviceEndpoint="api/recognition-service/status"
                  />
                </Box>
              </AccordionPanel>
            </Accordion>
          </Box>
        </Box>
      </div>
    </div>
  );
};
