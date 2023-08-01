import {SelectCityForm} from "@/components/SelectCityForm";
import {SwitchUnitSystem} from "@/components/SwitchUnitSystem";
import {Weather} from "@/components/Weather";


export default function Home() {

  return (
      <>
        <SelectCityForm/>
        <SwitchUnitSystem/>
        <Weather/>
      </>
  );
}
