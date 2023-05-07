import { cp } from "fs/promises";
import Image from "next/image";
import { useEffect, useState } from "react";

export const ProfileScroller = () => {
  const [profiles, setProfiles] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const calculateIndex = (index: number) => {
    const maxIndex = images.length - 1;
    if (index < 0) {
      return maxIndex;
    } else if (index > maxIndex) {
      return 0;
    } else {
      return index;
    }
  };

  const updateActiveIndex = (increment: boolean) => {
    if (increment) {
      setActiveIndex((prev) => calculateIndex(prev + 1));
    } else {
      setActiveIndex((prev) => calculateIndex(prev - 1));
    }
  };

  useEffect(() => {
    setLoading(true);
    getLatestProfiles("api/profile-service/profiles/latest", 5)
      .then((data) => {
        data.profiles.forEach((p: { Images: { FilePath: string }[] }) => {
          setImages((prev) => [
            ...prev,
            `${p.Images[0].FilePath.split("public")[1]}`,
          ]);
        });
        setProfiles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <button onClick={() => updateActiveIndex(true)}>inc</button>
      <button onClick={() => updateActiveIndex(false)}>dec</button>

      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <img
          width={300}
          height={300}
          src={`api/profile-service/${images[calculateIndex(activeIndex - 1)]}`}
          style={{ margin: "1em" }}
          alt={""}
        />
        <img
          width={300}
          height={300}
          src={`api/profile-service/${images[activeIndex]}`}
          style={{ margin: "1em" }}
          alt={""}
        />
        <img
          width={300}
          height={300}
          src={`api/profile-service/${images[calculateIndex(activeIndex + 1)]}`}
          style={{ margin: "1em" }}
          alt={""}
        />
      </div>

      {/* {JSON.stringify(images)} */}
    </div>
  );
};

const getLatestProfiles = async (url: string, count: number) => {
  const reqOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ latestCount: count }),
  };
  const res = await fetch(url, reqOptions);
  const data = await res.json();

  if (data.statusCode !== 200) {
    throw new Error(data.message);
  }
  return data;
};
