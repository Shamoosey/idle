export namespace HotDog {
  export namespace Game {
    export interface Config {
      upgrades: {
        stomachCapacity: Upgrade[];
        waterCapacity: Upgrade[];
      };
      unlocks: Unlock[];
    }

    export interface Upgrade {
      threshold: number;
      increase: number;
    }

    export interface Unlock {
      feature: string;
      threshold: number;
    }
  }

  export interface State {
    unlockedButtons: string[];
    appliedUpgrades: {
      stomachCapacity: Game.Upgrade[];
      waterCapacity: Game.Upgrade[];
    };
    waterIncrease: number;
    waterDrain: number;
    waterCapacity: number;
    waterLevel: number;
    hotdogIncrease: number;
    digestiveSpeed: number;
    totalHotdogsEaten: number;
    stomachCapacity: number;
    score: number;
    timerInterval: number;
  }
}
