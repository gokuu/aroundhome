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
import { useEffect, useMemo } from "react";
import {
  Coordinate,
  Customer,
  CustomerDetails,
  Partner,
  PartnerDetails,
} from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { distanceToKms, ratingToStars } from "../lib/helpers";
import Map from "./Map";

interface PartnerPanelProps {
  partner?: Partner;
  customer?: Customer;
}

function tickOrXMark(value: boolean) {
  return (
    <FontAwesomeIcon
      icon={value ? faCheck : faXmark}
      className={value ? "text-green-600" : "text-red-600"}
    />
  );
}

export default function PartnerPanel({ customer, partner }: PartnerPanelProps) {
  const {
    loading,
    error,
    data: partnerData,
    execute,
  } = useApiRequest<PartnerDetails>({
    url: `/partners/${partner?.id}`,
  });

  const { data: customerData, execute: executeCustomerRequest } =
    useApiRequest<CustomerDetails>({
      url: `/customers/${customer?.id}`,
    });

  const mapPoints = useMemo<Coordinate[]>(() => {
    if (partnerData && customerData) {
      return [customerData, partnerData];
    }
    return [];
  }, [customerData, partnerData]);

  useEffect(() => {
    if (!partner) {
      return;
    }

    execute();
  }, [execute, partner]);

  useEffect(() => {
    if (customer) {
      executeCustomerRequest();
    }
  }, [customer, executeCustomerRequest]);

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

  if (!partnerData) {
    return (
      <Indicator icon={faWarning} message="Could not find partner data!" />
    );
  }

  return (
    <div className="grow flex flex-col gap-2 items-stretch justify-stretch">
      <h2 className="font-bold text-3xl flex-none">{partnerData.name}</h2>
      <div className="flex flex-row grow items-stretch gap-4">
        <div className="flex flex-col flex-none items-start">
          <div className="grow flex flex-col gap-2 items-stretch">
            <div className="flex flex-col flex-none items-stretch">
              <span className="p-2 my-2 rounded bg-black/25 flex flex-row justify-between items-center">
                <span>
                  <FontAwesomeIcon icon={faBuilding} /> Address
                </span>
                <span className="text-xs">
                  ({distanceToKms(partner.distance)} away)
                </span>
              </span>
              <span className="px-4">{partnerData.street_address}</span>
              <span className="px-4">
                {partnerData.postcode} {partnerData.city}
              </span>
              <span className="px-4">{partnerData.country}</span>
            </div>
            <div className="flex flex-col flex-none items-stretch">
              <span className="p-2 my-2 rounded bg-black/25 ">
                <FontAwesomeIcon icon={faMedal} /> Rating
              </span>
              <span className="px-4">
                {ratingToStars(partnerData.rating_score)} over{" "}
                {partnerData.rating_count} ratings
              </span>
            </div>
            <div className="flex flex-col flex-none">
              <span className="p-2 my-2 rounded bg-black/25 ">
                <FontAwesomeIcon icon={faTools} /> Flooring Expertise
              </span>
              <span className="px-4">
                {tickOrXMark(partnerData.materials.indexOf("wood") >= 0)} Wood
              </span>
              <span className="px-4">
                {tickOrXMark(partnerData.materials.indexOf("carpet") >= 0)}{" "}
                Carpet
              </span>
              <span className="px-4">
                {tickOrXMark(partnerData.materials.indexOf("tiles") >= 0)} Tiles
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-col grow items-stretch justify-stretch">
          <Map points={mapPoints} />
        </div>
      </div>
    </div>
  );
}
