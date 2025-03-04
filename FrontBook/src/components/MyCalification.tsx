import { FaStar as FullStar } from "react-icons/fa";
import { FaRegStar as EmptyStar } from "react-icons/fa";
import { colors } from "../colors";

type MyCalificationProp = {
  localCalification: 1 | 2 | 3 | 4 | 5 | null;
  setLocalCalification: (value: 1 | 2 | 3 | 4 | 5 | null) => void;
  modificationState: boolean;
};

function MyCalification({
  localCalification,
  setLocalCalification,
  modificationState,
}: MyCalificationProp) {
  const totalStars = 5;

  const handleClick = (index: number) => {
    setLocalCalification((index + 1) as 1 | 2 | 3 | 4 | 5);
  };

  const stars = Array.from({ length: totalStars }, (_, index) => {
    if (localCalification === null) {
      return (
        <EmptyStar
          onClick={modificationState ? () => handleClick(index) : () => {}}
          key={index}
          size={"1.5rem"}
          cursor={modificationState ? "pointer" : "auto"}
        ></EmptyStar>
      );
    }
    if (index < localCalification) {
      return (
        <FullStar
          onClick={modificationState ? () => handleClick(index) : () => {}}
          color={colors.brand.primary}
          key={index}
          size={"1.5rem"}
          cursor={modificationState ? "pointer" : "auto"}
        ></FullStar>
      );
    }
    return (
      <EmptyStar
        onClick={modificationState ? () => handleClick(index) : () => {}}
        key={index}
        size={"1.5rem"}
        cursor={modificationState ? "pointer" : "auto"}
      ></EmptyStar>
    );
  });

  return <>{stars}</>;
}

export default MyCalification;
