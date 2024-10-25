import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function distanceToKms(distance: number) {
  return `${Math.round(distance / 1000)} km`;
}

export function ratingToStars(rating: number) {
  return [0, 1, 2, 3, 4].map((score) => (
    <FontAwesomeIcon
      key={`rating-${score}`}
      icon={faStar}
      className={score < rating ? "text-yellow-300" : ""}
    />
  ));
}
