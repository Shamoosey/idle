import { DEFAULT_STATE, ELEMENTS, HOTDOG } from "./constants";
import { HotDog } from "./interfaces";

class HotdogGame {
  gameState: HotDog.State = { ...DEFAULT_STATE };
  waterTime: ReturnType<typeof setInterval> | undefined;

  elements: Record<string, HTMLElement> = {};

  constructor() {
    this.init();
  }

  init(): void {
    this.loadState();
    this.bindElements();
    this.bindEvents();
    this.updateDisplay();
  }

  bindElements() {
    const keys = [...Object.values(ELEMENTS.BUTTONS), ...Object.values(ELEMENTS.DISPLAY)];

    keys.forEach((key) => {
      const el = document.getElementById(key);
      if (el) {
        this.elements[key] = el;
      }
    });
  }

  bindEvents(): void {
    this.elements[ELEMENTS.BUTTONS.EAT_HOTDOG].addEventListener("click", () => this.incrementScore());
    this.elements[ELEMENTS.BUTTONS.DRINK_WATER].addEventListener("click", () => this.drinkWaterClick());

    const upgradeUnlocked = this.gameState.unlockedButtons.includes(ELEMENTS.BUTTONS.DRINK_WATER);
    this.updateElementVisibility(ELEMENTS.BUTTONS.DRINK_WATER, upgradeUnlocked);
    this.updateElementVisibility(ELEMENTS.DISPLAY.WATER_CAPACITY, upgradeUnlocked);
  }

  incrementScore(): void {
    this.gameState.totalHotdogsEaten += this.gameState.hotdogIncrease;
    this.gameState.score += this.gameState.hotdogIncrease;

    if (this.gameState.score === this.gameState.stomachCapacity) {
      this.updateElementVisibility(ELEMENTS.BUTTONS.EAT_HOTDOG, true, true);
    }

    if (this.gameState.score === 10 && !this.gameState.unlockedButtons.includes(ELEMENTS.BUTTONS.DRINK_WATER)) {
      this.gameState.unlockedButtons.push(ELEMENTS.BUTTONS.DRINK_WATER);
      this.initWaterLogic();
    }

    this.updateDisplay();
  }

  updateElementVisibility(key: string, visible: boolean, disabled = false): void {
    const btnEl = this.elements[key];
    if (btnEl) {
      btnEl.style.display = visible ? "unset" : "none";
      if (disabled) {
        btnEl.setAttribute("disabled", "true");
      }
    }
  }

  initWaterLogic(): void {
    this.waterTime = setInterval(() => {
      const upgradeUnlocked = this.gameState.unlockedButtons.includes(ELEMENTS.BUTTONS.DRINK_WATER);
      if (this.gameState.score > 0 && this.gameState.waterCapacity >= this.gameState.waterDrain && upgradeUnlocked) {
        this.gameState.waterCapacity = Math.max(0, this.gameState.waterCapacity - this.gameState.waterDrain);
        this.gameState.score = Math.max(0, this.gameState.score - this.gameState.digestiveSpeed);
        this.updateDisplay();
      }
    }, this.gameState.timerInterval);

    this.updateElementVisibility(ELEMENTS.BUTTONS.DRINK_WATER, true);
    this.updateElementVisibility(ELEMENTS.DISPLAY.WATER_CAPACITY, true);
  }

  drinkWaterClick(): void {
    if (this.gameState.waterCapacity < this.gameState.waterLevel) {
      this.gameState.waterCapacity = Math.min(this.gameState.waterLevel, this.gameState.waterCapacity + this.gameState.waterIncrease);
    }
    this.updateDisplay();
  }

  updateDisplay(): void {
    this.elements[ELEMENTS.DISPLAY.TOTAL_HOTDOGS_EATEN].textContent = `${this.gameState.totalHotdogsEaten}`;
    this.elements[ELEMENTS.DISPLAY.STOMACH_CAPACITY].textContent = `${this.gameState.score} / ${this.gameState.stomachCapacity}`;

    (this.elements[ELEMENTS.DISPLAY.WATER_CAPACITY] as HTMLProgressElement).value = this.gameState.waterCapacity;

    if (this.gameState.score < this.gameState.stomachCapacity) {
      this.elements[ELEMENTS.BUTTONS.EAT_HOTDOG].removeAttribute("disabled");
    }
  }

  saveScore(): void {
    localStorage.setItem(HOTDOG.STATE, JSON.stringify(this.gameState));
  }

  loadState(): void {
    try {
      const save = localStorage.getItem(HOTDOG.STATE);
      if (save) {
        const loaded = JSON.parse(save) as HotDog.State;
        this.gameState = { ...DEFAULT_STATE, ...loaded };
        if (!this.gameState.appliedUpgrades) {
          this.gameState.appliedUpgrades = { stomachCapacity: [], waterCapacity: [] };
        }
      }
    } catch (error) {
      console.log("localStorage not available, using default state");
    }
  }
}

new HotdogGame();
