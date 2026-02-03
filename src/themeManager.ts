import * as vscode from "vscode";

export class ThemeManager {
  private context: vscode.ExtensionContext;
  private intervalHandle: NodeJS.Timeout | undefined;
  // Polling interval in milliseconds (set from config in start()): default 10 minutes
  private pollIntervalMs: number = 10 * 60 * 1000;

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
          themes.push(theme.label || theme.id);
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
    // Use hours-based configuration only. Enforce minimum 1 hour.
    const switchIntervalHours = Math.max(1, config.get<number>("switchIntervalHours", 1));

    const lastSwitchTime = this.context.globalState.get<number>("lastSwitchTimestamp", 0);
    const now = Date.now();

    const hoursPassed = (now - lastSwitchTime) / (1000 * 60 * 60);

    console.log(
      `Hours since last switch: ${hoursPassed.toFixed(2)} (threshold: ${switchIntervalHours} hour(s))`
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

    if (hoursPassed >= switchIntervalHours) {
      void this.switchToNextTheme();
    }
  }

  public start(): void {
    // Read poll interval from config (minutes), default 20
    const config = vscode.workspace.getConfiguration("themeSwitcher");
    const pollIntervalMinutes = config.get<number>("pollIntervalMinutes", 20);
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
