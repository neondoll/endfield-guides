import { type FC, useMemo } from "react";

import { Alert, /* AlertDescription, */ AlertTitle } from "./ui/alert";
import { InfoIcon } from "./ui/icon";
import { useTime } from "@/hooks/useTime";
import infoConfig from "@/info-config";

const InfoAlert: FC = () => {
  const time = useTime();

  const isPhase1 = useMemo(() => {
    const now = time.getTime();
    const datetime = new Date(infoConfig.phase1Date).getTime();

    return datetime <= now;
  }, [time]);
  const isPhase2 = useMemo(() => {
    const now = time.getTime();
    const datetime = new Date(infoConfig.phase2Date).getTime();

    return datetime <= now;
  }, [time]);

  return (
    <Alert>
      <InfoIcon />
      <AlertTitle children={`Текущая версия игры ${infoConfig.version} ${isPhase2 ? "(фаза 2)" : (isPhase1 ? "(фаза 1)" : "")}`} />
      {/* <AlertDescription></AlertDescription> */}
    </Alert>
  );
};
export default InfoAlert;
