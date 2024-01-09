import React from "react";
import { useEffect, useState } from "react";
type Person = {
  name: string;
  age: number;
  city: string;
  volountary?: boolean;
  imglink?: string;
};

type DataPerson = Person[];

const Profiles = () => {
  const [data, setData] = useState<DataPerson | null>(null);
  const serverUrl = "http://localhost:8000/people";
  useEffect(() => {
    async function fetchData() {
      const response = await fetch(serverUrl);
      const responseObj = await response.json();
      setData(responseObj);
    }
    fetchData();
  }, []);

  return (
    <div>
      {data !== null ? (
        <div>
          {data.map((person: Person, index: number) => (
            <div>
              <h2>{person.name}</h2>
              <ul>
                <li>{person.age}</li>
                <li>{person.city}</li>
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};

export default Profiles;
