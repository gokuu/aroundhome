import {
  faArrowUp,
  faBuilding,
  faCheck,
  faMedal,
  faSpinner,
  faTools,
  faWarning,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import Indicator from "./Indicator";
import useApiRequest from "../lib/useApiRequest";
import { useEffect } from "react";
import { Partner, PartnerDetails } from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { distanceToKms, ratingToStars } from "../lib/helpers";

interface PartnerPanelProps {
  partner?: Partner;
}

function tickOrXMark(value: boolean) {
  return (
    <FontAwesomeIcon
      icon={value ? faCheck : faXmark}
      className={value ? "text-green-600" : "text-red-600"}
    />
  );
}

export default function PartnerPanel({ partner }: PartnerPanelProps) {
  const { loading, error, data, execute } = useApiRequest<PartnerDetails>({
    url: `/partners/${partner?.id}`,
  });

  useEffect(() => {
    if (!partner) {
      return;
    }

    execute();
  }, [execute, partner]);

  if (!partner) {
    return (
      <div className="grow flex flex-col items-end">
        <div className="w-1/3">
          <Indicator icon={faArrowUp} message="Select a partner" />
        </div>
      </div>
    );
  }

  if (error) {
    return <Indicator icon={faSpinner} message={error} />;
  }

  if (loading) {
    return (
      <Indicator
        icon={faSpinner}
        message="Loading partner details..."
        animateIcon
      />
    );
  }

  if (!data) {
    return (
      <Indicator icon={faWarning} message="Could not find partner data!" />
    );
  }
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold text-3xl flex-none">{data.name}</h2>
      <div className="flex flex-col items-start">
        <div className="flex flex-col gap-2 items-stretch">
          <div className="flex flex-col flex-none items-stretch">
            <span className="p-2 my-2 rounded bg-black/25 flex flex-row justify-between items-center">
              <span>
                <FontAwesomeIcon icon={faBuilding} /> Address
              </span>
              <span className="text-xs">
                ({distanceToKms(partner.distance)} away)
              </span>
            </span>
            <span className="px-4">{data.street_address}</span>
            <span className="px-4">
              {data.postcode} {data.city}
            </span>
            <span className="px-4">{data.country}</span>
          </div>
          <div className="flex flex-col flex-none items-stretch">
            <span className="p-2 my-2 rounded bg-black/25 ">
              <FontAwesomeIcon icon={faMedal} /> Rating
            </span>
            <span className="px-4">
              {ratingToStars(data.rating_score)} over {data.rating_count}{" "}
              ratings
            </span>
          </div>
          <div className="flex flex-col flex-none">
            <span className="p-2 my-2 rounded bg-black/25 ">
              <FontAwesomeIcon icon={faTools} /> Flooring Expertise
            </span>
            <span className="px-4">
              {tickOrXMark(data.materials.indexOf("wood") >= 0)} Wood
            </span>
            <span className="px-4">
              {tickOrXMark(data.materials.indexOf("carpet") >= 0)} Carpet
            </span>
            <span className="px-4">
              {tickOrXMark(data.materials.indexOf("tiles") >= 0)} Tiles
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
