import { useCallback, useEffect, useState } from "react";
import CustomerList from "./components/CustomerList";
import MaterialList from "./components/MaterialList";
import { Customer, Materials, Partner, PartnersReponse } from "./types";
import Indicator from "./components/Indicator";
import {
  faArrowLeft,
  faSpinner,
  faWarning,
} from "@fortawesome/free-solid-svg-icons";
import useApiRequest from "./lib/useApiRequest";
import PartnerPanel from "./components/PartnerPanel";
import { ratingToStars, distanceToKms } from "./lib/helpers";

function App() {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer>();
  const [selectedPartner, setSelectedPartner] = useState<Partner>();
  const [selectedMaterials, setSelectedMaterials] = useState<Materials[]>();

  const [matchingPartners, setMatchingPartners] = useState<Partner[]>();

  const { loading, error, data, execute } = useApiRequest<PartnersReponse>({
    url: `/customers/${selectedCustomer?.id}/match-partners`,
    method: "POST",
  });

  const onMatchPartners = useCallback(async () => {
    execute({
      payload: { materials: selectedMaterials },
    });
  }, [execute, selectedMaterials]);

  useEffect(() => {
    setMatchingPartners(undefined);
    setSelectedPartner(undefined);
  }, [selectedCustomer, selectedMaterials]);

  useEffect(() => {
    setMatchingPartners(data?.data);
  }, [data?.data]);

  return (
    <div className="w-full flex justify-center min-h-dvh p-10">
      <main className="max-w-7xl m-x-auto flex flex-col grow gap-4">
        <h1 className="self-center p-5 text-4xl font-bold">
          Aroundhome Client-Partner matcher
        </h1>

        <main className="flex flex-row gap-2 items-stretch">
          <aside className="bg-slate-400 rounded-xl p-4 grow flex flex-col">
            <h2 className="font-bold text-xl flex-none">
              Step 1: Select a customer:
            </h2>
            <CustomerList onCustomerSelected={setSelectedCustomer} />
          </aside>
          <aside className="grow flex flex-col gap-2 justify-stretch">
            <aside className="bg-slate-400 rounded-xl p-4 flex-none flex flex-col gap-4 justify-start">
              <h2 className="font-bold text-xl">
                Step 2: Choose your materials:
              </h2>
              <MaterialList onMaterialsChanged={setSelectedMaterials} />
            </aside>
            <aside className="bg-slate-400 rounded-xl p-4 grow flex flex-col">
              <h2 className="font-bold text-xl flex-none">
                Step 3: Search for elligible partners:
              </h2>
              <button
                disabled={
                  !selectedCustomer || (selectedMaterials ?? []).length === 0
                }
                className="
                cursor-pointer
                disabled:bg-gray-900/25 disabled:border-gray-900/25 disabled:border-0
                bg-green-600/75 border-green-800/25
                hover:bg-green-600/100
                border-4 grow rounded-3xl m-10 text-3xl font-bold"
                onClick={onMatchPartners}
              >
                Search partners!
              </button>
            </aside>
          </aside>
          <aside className="bg-slate-400 rounded-xl p-4 grow flex flex-col">
            <h2 className="font-bold text-xl flex-none">
              Step 4: Select your partner:
            </h2>
            {error ? (
              <Indicator icon={faWarning} message={error} />
            ) : loading ? (
              <Indicator
                icon={faSpinner}
                message="Matching partners..."
                animateIcon
              />
            ) : matchingPartners ? (
              <div className={`grow flex flex-col`}>
                <div className="p-2 grow flex flex-col gap-2">
                  {matchingPartners.map((partner) => (
                    <label className="cursor-pointer flex flex-col gap-px p-2 rounded hover:bg-blue-500/25 has-[:checked]:bg-blue-500/50">
                      <input
                        key={`partner-${partner.id}`}
                        type="radio"
                        name="partner"
                        className="hidden"
                        onChange={() => setSelectedPartner(partner)}
                      />
                      <div>{partner.name}</div>
                      <div className="text-sm flex flex-row justify-between ">
                        <div>{ratingToStars(partner.rating_score)}</div>
                        <div> {distanceToKms(partner.distance)}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <Indicator icon={faArrowLeft} message="Make your request" />
            )}
          </aside>
        </main>

        <aside className="col-start-1 col-span-3 row-start-3">
          <PartnerPanel partner={selectedPartner} />
        </aside>
      </main>
    </div>
  );
}

export default App;
