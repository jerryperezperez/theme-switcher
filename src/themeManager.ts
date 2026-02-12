import * as vscode from "vscode";

export class ThemeManager {
  private context: vscode.ExtensionContext;
  private intervalHandle: NodeJS.Timeout | undefined;
  // Polling interval in milliseconds (set from config in start()): default 5 minutes
  private pollIntervalMs: number = 5 * 60 * 1000;

  constructor(context: vscode.ExtensionContext) {
    this.context = context;
  }

  public getAllThemes(): string[] {
    const themes: string[] = [];
    const extensions = vscode.extensions.all;

    for (const extension of extensions) {
      const packageJSON = extension.packageJSON;

      if (packageJSON && packageJSON.contributes && packageJSON.contributes.themes) {
        for (const theme of packageJSON.contributes.themes) {
          // console.log(`Found theme label: ${theme.label} with id ${theme.id}`);
          themes.push(theme.id);
        }
      }
    }

    return themes;
  }

  public getCurrentTheme(): string | undefined {
    let currentTheme = vscode.workspace
      .getConfiguration()
      .get<string>("workbench.colorTheme");
      console.log(`Current theme obtained: ${currentTheme}`);
    return currentTheme;
  }

  public async switchToNextTheme(): Promise<void> {
    const themes = this.getAllThemes();

    if (themes.length === 0) {
      console.log("No themes found!");
      return;
    }

    const currentTheme = this.getCurrentTheme();

    let currentIndex = currentTheme ? themes.indexOf(currentTheme) : -1;
    const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % themes.length;

    await vscode.workspace
      .getConfiguration()
      .update(
        "workbench.colorTheme",
        themes[nextIndex],
        vscode.ConfigurationTarget.Global
      );

    this.context.globalState.update("lastSwitchTimestamp", Date.now());

    console.log(
      `Theme switched from "${currentTheme}" (index ${currentIndex}) to "${themes[nextIndex]}" (index ${nextIndex})`
    );

    vscode.window.showInformationMessage(`Theme switched to: ${themes[nextIndex]}`);
  }

  public checkAndSwitch(): void {
    const config = vscode.workspace.getConfiguration("themeSwitcher");
    // Use minutes-based configuration. Enforce minimum 1 minute.
    const switchIntervalMinutes = Math.max(1, config.get<number>("switchIntervalMinutes", 30));

    const lastSwitchTime = this.context.globalState.get<number>("lastSwitchTimestamp", 0);
    const now = Date.now();

    const minutesPassed = (now - lastSwitchTime) / (1000 * 60);

    console.log(
      `Minutes since last switch: ${minutesPassed.toFixed(2)} (threshold: ${switchIntervalMinutes} minute(s))`
    );

    const enabled = config.get<boolean>("enabled", true);
    const paused = this.context.globalState.get<boolean>("paused", false);

    if (!enabled) {
      console.log("Theme switching is disabled in settings.");
      return;
    }

    if (paused) {
      console.log("Theme switching is currently paused.");
      return;
    }

    if (minutesPassed >= switchIntervalMinutes) {
      void this.switchToNextTheme();
    }
  }

  public start(): void {
    // Read poll interval from config (minutes), default 5
    const config = vscode.workspace.getConfiguration("themeSwitcher");
    const pollIntervalMinutes = config.get<number>("pollIntervalMinutes", 5);
    this.pollIntervalMs = Math.max(1, pollIntervalMinutes) * 60 * 1000;

    // Run immediately
    this.checkAndSwitch();

    // Clear existing interval (if any) and start periodic polling
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
    }
    this.intervalHandle = setInterval(() => this.checkAndSwitch(), this.pollIntervalMs);

    console.log(`Started theme poller (every ${pollIntervalMinutes} minutes).`);
  }

  public stop(): void {
    if (this.intervalHandle) {
      clearInterval(this.intervalHandle);
      this.intervalHandle = undefined;
    }
  }

  public pause(): void {
    this.context.globalState.update("paused", true);
    console.log("Theme switching paused.");
  }

  public resume(): void {
    this.context.globalState.update("paused", false);
    console.log("Theme switching resumed.");
  }

  public isPaused(): boolean {
    return this.context.globalState.get<boolean>("paused", false);
  }
}