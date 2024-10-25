import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface IndicatorParams {
  icon: IconProp;
  message: string;
  animateIcon?: boolean;
  small?: boolean;
}

export default function Indicator({
  icon,
  message,
  animateIcon,
  small,
}: IndicatorParams) {
  const iconSize = small ? "text-2xl" : "text-6xl";
  const messageSize = small ? "text-md" : "text-xl";

  return (
    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
      <FontAwesomeIcon icon={icon} spin={animateIcon} className={iconSize} />
      <div className={messageSize}>{message}</div>
    </div>
  );
}
