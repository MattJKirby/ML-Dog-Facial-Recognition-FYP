import { useEffect, useState } from "react";

export const ProfileScroller = () => {
  const [profiles, setProfiles] = useState(null);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    getLatestProfiles('http://localhost:5002/profiles/latest', 5)
      .then((data) => {
        setProfiles(data)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      {isLoading? 'loading' : 'not loading'}
      {JSON.stringify(profiles)}
    </div>
  )
}

const getLatestProfiles = async (url: string, count: number) => {
  const reqOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({latestCount: count})
  }
  const res = await fetch(url, reqOptions);
  const data = await res.json();

  if(data.statusCode !== 200){
    throw new Error(data.message)
  }
  return data;
}