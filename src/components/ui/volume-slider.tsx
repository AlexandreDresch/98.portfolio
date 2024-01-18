import { useState } from "react";
import { Card } from "./card";
import { Slider } from "./slider";
import { Checkbox } from "./checkbox";
import Image from "next/image";

export default function VolumeSlider() {
  const [volume, setVolume] = useState(50);

  const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = event.target.value;
    console.log(`Volume: ${newVolume}`);
    setVolume(+newVolume);
  };

  return (
    <Card className="flex flex-col w-full h-full border-none justify-around rounded-none bg-[#C0C0C0]">
      <span className="text-center text-sm pl-2">Volume</span>
      <div className="flex gap-2">
        <Image
          src={"/volume.png"}
          alt="volume"
          width={0}
          height={0}
          className="w-8 h-32"
        />
        <div className="w-max h-full flex flex-col py-2 pl-4 pr-12 border border-dashed border-[#808080]">
          <Slider
            className="w-full h-full"
            orientation="vertical"
            defaultValue={[volume]}
            max={100}
            step={1}
            onChange={handleVolumeChange}
          />
        </div>
      </div>

      <div className="flex items-center gap-1 mt-4">
        <div className="max-w-max border-2 h-4 flex items-center border-t-[#808080] border-l-[#808080] border-b-white border-r-white">
          <Checkbox
            id="mute"
            className="h-3 w-3 bg-white rounded-none border-2 border-r-[#C0C0C0] border-b-[#C0C0C0]"
          />
        </div>
        <label
          htmlFor="mute"
          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          <p className="text-sm">
            <span className="underline">M</span>ute
          </p>
        </label>
      </div>
    </Card>
  );
}
