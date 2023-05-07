import { DogProfile } from "@/pages/search";
import { Box, Text } from "grommet";
import Image from "next/image";
import { FC, PropsWithChildren, useState } from "react";

type ProfileViewerProps = {
  profile: DogProfile;
  size?: number;
};

const ProfileViewer: FC<PropsWithChildren<ProfileViewerProps>> = ({
  profile,
  size,
}) => {
  const images = profile.Images.map((img) => {
    return img.FilePath.split("public")[1];
  });

  console.log(images);

  return (
    <Box direction="row" justify="evenly" fill="horizontal" round>
      {images.map((img) => {
        return (
          <img
            key={img}
            width={size || 150}
            height={size || 150}
            alt={"Dog main image"}
            src={`api/profile-service${img}`}
          />
        );
      })}
    </Box>
  );
};

export default ProfileViewer;
