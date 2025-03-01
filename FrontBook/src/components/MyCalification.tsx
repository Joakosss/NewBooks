import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FaStar as FullStar } from "react-icons/fa";
import { FaRegStar as EmptyStar } from "react-icons/fa";
import { patchRequestToken } from "../api/apis";
import { colors } from "../colors";

type MyCalificationProp = {
  calification: 1 | 2 | 3 | 4 | 5 | null;
  idMyReading: string;
};

function MyCalification({ calification, idMyReading }: MyCalificationProp) {
  const [localCalification, setLocalCalification] = useState(calification);
  const totalStars = 5;

  const { mutate } = useMutation({
    mutationFn: () =>
      patchRequestToken(
        "http://127.0.0.1:8000/my-readings/",
        { calification: localCalification },
        idMyReading
      ),
  });

  useEffect(() => {
    mutate();
  }, [localCalification]);

  const handleClick = (index: number) => {
    setLocalCalification((index + 1) as 1 | 2 | 3 | 4 | 5);
  };

  const stars = Array.from({ length: totalStars }, (_, index) => {
    if (localCalification === null) {
      return (
        <EmptyStar
          onClick={() => handleClick(index)}
          key={index}
          size={"1.5rem"}
        ></EmptyStar>
      );
    }
    if (index < localCalification) {
      return (
        <FullStar
          onClick={() => handleClick(index)}
          color={colors.brand.primary}
          key={index}
          size={"1.5rem"}
        ></FullStar>
      );
    }
    return (
      <EmptyStar
        onClick={() => handleClick(index)}
        key={index}
        size={"1.5rem"}
      ></EmptyStar>
    );
  });

  return <>{stars}</>;
}

export default MyCalification;
