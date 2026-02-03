import * as vscode from "vscode";
import { ThemeManager } from "./themeManager";

let themeManager: ThemeManager | undefined;

export function activate(context: vscode.ExtensionContext) {
  console.log("Theme Switcher extension is now active!");

  themeManager = new ThemeManager(context);

  // Log current theme
  const currentTheme = vscode.workspace.getConfiguration().get("workbench.colorTheme");
  console.log(`Current theme: ${currentTheme}`);

  // Log all available themes
  const themes = themeManager.getAllThemes();
  console.log(`Found ${themes.length} themes:`, themes);

  // Start the manager (runs initial check and periodic polling)
  themeManager.start();

  // Register manual switch command
  const manualSwitchCommand = vscode.commands.registerCommand("theme-switcher.switchNow", () => {
    void themeManager?.switchToNextTheme();
  });

  // Register pause/resume commands
  const pauseCommand = vscode.commands.registerCommand("theme-switcher.pause", () => {
    themeManager?.pause();
    vscode.window.showInformationMessage("Theme switching paused");
  });

  const resumeCommand = vscode.commands.registerCommand("theme-switcher.resume", () => {
    themeManager?.resume();
    vscode.window.showInformationMessage("Theme switching resumed");
  });

  context.subscriptions.push(manualSwitchCommand, pauseCommand, resumeCommand, { dispose: () => themeManager?.stop() });
}

export function deactivate() {
  themeManager?.stop();
  console.log("Theme Switcher extension deactivated");
}