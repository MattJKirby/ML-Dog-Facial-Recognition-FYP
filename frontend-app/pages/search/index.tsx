import { AppBar } from "@/src/components/AppBar";
import {
  DetectionResults,
  ImageUploader,
} from "@/src/components/ImageUploader";
import { ImageCropper } from "@/src/components/ImageUploader/imageCropper";
import ProfileViewer from "@/src/components/ProfileViewer";
import { theme } from "@/src/utils";
import {
  Anchor,
  Box,
  Button,
  Grommet,
  Heading,
  Page,
  PageContent,
  PageHeader,
  Text,
} from "grommet";
import Router from "next/router";
import { useState } from "react";

export type DogProfile = {
  ProfileUid: string;
  PetName: string;
  PetBreed: string;
  OwnerMobileNumber: string;
  OwnerFirstName: string;
  OwnerLastName: string;
  Images: any[];
};

const Search = () => {
  const [uploader, setUploader] = useState<boolean>(true);
  const [cropper, setCropper] = useState<boolean>(false);
  const [detectionResults, setDetectionResults] = useState<
    DetectionResults[] | null
  >(null);
  const [sourceImages, setSourceImages] = useState<File[]>([]);
  const [croppedImages, setCroppedImages] = useState<File[]>([]);
  const [matchedProfile, setMatchedProfile] = useState<DogProfile | null>(null);
  const [matchedProfiles, setMatchedProfiles] = useState<DogProfile[] | null>(
    null
  );

  const onValidUpload = (results: any, images: File[]) => {
    setUploader(false);
    setCropper(true);
    setDetectionResults(results);
    setSourceImages(images);
  };

  const handleCropUpdate = (output: string, name: string) => {
    fetch(output)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], name, { type: "image/png" });
        setCroppedImages((prev) => [
          ...prev.filter((d) => d.name !== name),
          file,
        ]);
      });
  };

  const handleSubmit = () => {
    predictApiCall(
      "/api/recognition-service/predictSingle",
      croppedImages[0]
    ).then((res) => {
      setMatchedProfile(res);
    });

    predictApiCall("/api/recognition-service/predict", croppedImages[0]).then(
      (res) => {
        setMatchedProfiles(res);
      }
    );
  };

  return (
    <Grommet full theme={theme}>
      <AppBar />
      <Page background="bg1" style={{ minHeight: "100%" }}>
        <PageContent justify="center">
          <Box fill={true} justify="center" width={"800px"} align="center">
            <Box style={{ maxWidth: "800px", width: "100%" }}>
              {!matchedProfile ? (
                <Box>
                  <PageHeader
                    title="Identify a Dog"
                    subtitle="View the Dogs that match your uploaded image"
                    parent={
                      <Anchor label="Search" onClick={() => Router.reload()} />
                    }
                    actions={
                      <Box direction="row" gap="medium">
                        <Button
                          primary
                          label="Search"
                          disabled={croppedImages.length !== 1}
                          onClick={() => handleSubmit()}
                        />
                        <Button
                          type="reset"
                          label="Reset"
                          onClick={() => Router.reload()}
                        />
                      </Box>
                    }
                  />
                  {uploader && (
                    <ImageUploader
                      min={1}
                      max={1}
                      onValidUpload={(
                        results: DetectionResults[],
                        images: File[]
                      ) => onValidUpload(results, images)}
                    />
                  )}

                  {cropper && detectionResults && (
                    <ImageCropper
                      results={detectionResults}
                      images={sourceImages}
                      updateOutput={handleCropUpdate}
                    />
                  )}
                </Box>
              ) : (
                <Box fill="horizontal">
                  <Box
                    direction="row"
                    justify="between"
                    align="center"
                    fill="horizontal"
                  >
                    <PageHeader
                      fill="horizontal"
                      title={`Search Results`}
                      subtitle="Upload an image to identify a dog."
                      parent={
                        <Anchor
                          label="Search"
                          onClick={() => Router.reload()}
                        />
                      }
                      actions={
                        <Box
                          direction="row-reverse"
                          justify="center"
                          align="center"
                          gap="small"
                        >
                          <img
                            alt={"sourceImage"}
                            style={{ objectFit: "contain" }}
                            width={100}
                            height={100}
                            src={URL.createObjectURL(croppedImages[0])}
                          />
                          <Button
                            type="reset"
                            label="Try another search"
                            onClick={() => Router.reload()}
                          />
                        </Box>
                      }
                    />
                  </Box>

                  <Box
                    background={"brand"}
                    round
                    pad={{ left: "medium", right: "medium", bottom: "small" }}
                    margin={{ bottom: "small" }}
                  >
                    <Box>
                      <PageHeader
                        title={`Match Found: ${matchedProfile.PetName}`}
                        subtitle={`Owner: ${matchedProfile.OwnerFirstName} ${matchedProfile.OwnerLastName} Mobile: ${matchedProfile.OwnerMobileNumber}`}
                        parent={
                          <Anchor
                            label="Closest Match"
                            onClick={() => Router.reload()}
                          />
                        }
                      />
                    </Box>

                    <Box
                      fill="horizontal"
                      pad="small"
                      justify="center"
                      align="center"
                    >
                      <ProfileViewer size={130} profile={matchedProfile} />
                    </Box>
                  </Box>
                  {matchedProfile &&
                    matchedProfiles &&
                    matchedProfiles?.length > 1 && (
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <Heading
                          level={3}
                          size="xsmall"
                          margin={{ top: "medium" }}
                          color={"brand"}
                        >
                          Other matches
                        </Heading>
                      </div>
                    )}

                  {matchedProfiles &&
                    matchedProfiles
                      .filter((p) => p.ProfileUid !== matchedProfile.ProfileUid)
                      .map((profile) => {
                        return (
                          <Box
                            key={profile.ProfileUid}
                            background={"white"}
                            pad={{
                              left: "medium",
                              right: "medium",
                              bottom: "small",
                            }}
                            margin={{ bottom: "medium", top: "medium" }}
                            round
                            elevation="small"
                          >
                            <PageHeader
                              title={`${profile.PetName}`}
                              subtitle={`Owner: ${profile.OwnerFirstName} ${profile.OwnerLastName} Mobile: ${profile.OwnerMobileNumber}`}
                              parent={
                                <Anchor
                                  label="Possible Match"
                                  onClick={() => Router.reload()}
                                />
                              }
                            />
                            <ProfileViewer size={100} profile={profile} />
                          </Box>
                        );
                      })}
                </Box>
              )}
            </Box>
          </Box>
        </PageContent>
      </Page>
    </Grommet>
  );
};

export default Search;

const predictApiCall = async (url: string, target: File) => {
  const formData = new FormData();
  formData.append(`target`, target);

  const reqOptions = {
    method: "POST",
    body: formData,
  };

  const res = await fetch(url, reqOptions);
  return await res.json();
};
