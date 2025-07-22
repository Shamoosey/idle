import { HotDog } from "./interfaces";

export const ELEMENTS = {
  BUTTONS: {
    EAT_HOTDOG: "btnEatHotdog",
    DRINK_WATER: "btnDrinkWater",
    UPGRADE_STOMACH: "btnUpgradeStomach",
  },
  DISPLAY: {
    TOTAL_HOTDOGS_EATEN: "totalHotdogsEaten",
    STOMACH_CAPACITY: "stomachCapacity",
    WATER_CAPACITY: "waterCapacity",
  },
};

export enum HOTDOG {
  STATE = "GAME_STATE",
}

export const DEFAULT_STATE: HotDog.State = {
  unlockedButtons: [],
  appliedUpgrades: {
    stomachCapacity: [],
    waterCapacity: [],
  },
  waterIncrease: 5,
  waterDrain: 10,
  hotdogIncrease: 1,
  digestiveSpeed: 1,
  totalHotdogsEaten: 0,
  stomachCapacity: 10,
  waterCapacity: 100,
  waterLevel: 100,
  score: 0,
  timerInterval: 1000,
};
