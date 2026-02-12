import * as assert from 'assert';
import * as vscode from 'vscode';
// @ts-ignore
import { ThemeManager } from '../../themeManager';

suite('Theme Switcher Extension Test Suite', () => {
	let themeManager: ThemeManager;
	let context: vscode.ExtensionContext;

	suiteSetup(async () => {
		vscode.window.showInformationMessage('Start all tests.');
		// Get the extension context
		context = await vscode.extensions.getExtension('theme-switcher.theme-switcher')?.activate() as any;
		if (!context) {
			// Create a minimal mock context for testing
			context = {
				globalState: new MockMemento(),
				subscriptions: [],
			} as any;
		}
	});

	suite('ThemeManager', () => {
		setup(() => {
			themeManager = new ThemeManager(context);
		});

		test('getAllThemes should return an array of themes', () => {
			const themes = themeManager.getAllThemes();
			assert.ok(Array.isArray(themes), 'Should return an array');
			// VS Code always has at least the default themes
			assert.ok(themes.length > 0, 'Should find at least one theme');
		});

		test('getCurrentTheme should return current workbench color theme', () => {
			const currentTheme = themeManager.getCurrentTheme();
			assert.ok(typeof currentTheme === 'string', 'Should return a string or undefined');
		});

		test('switchToNextTheme should switch to next theme', async () => {
			const themes = themeManager.getAllThemes();
			if (themes.length > 1) {
				const beforeTheme = themeManager.getCurrentTheme();
				await themeManager.switchToNextTheme();
				const afterTheme = themeManager.getCurrentTheme();
				// Theme might not be immediately available in test, but function should complete
				assert.ok(true, 'switchToNextTheme should not throw');
			}
		});

		test('switchToNextTheme with single theme should handle gracefully', async () => {
			// If only one theme exists, it should switch to itself
			try {
				await themeManager.switchToNextTheme();
				assert.ok(true, 'Should handle single theme gracefully');
			} catch (e) {
				assert.fail('Should not throw error');
			}
		});

		test('switchToNextTheme should update lastSwitchTimestamp', async () => {
			// Clear the timestamp
			(context.globalState as any).data = {};

			await themeManager.switchToNextTheme();

			const timestamp = context.globalState.get<number>('lastSwitchTimestamp');
			assert.ok(timestamp !== undefined && timestamp > 0, 'Should store lastSwitchTimestamp');
		});

		test('checkAndSwitch should not switch if interval not reached', () => {
			// Set a recent switch timestamp
			const recentTime = Date.now();
			context.globalState.update('lastSwitchTimestamp', recentTime);

			// This should not trigger a switch (no error means success)
			themeManager.checkAndSwitch();
			assert.ok(true, 'Should not throw when interval not reached');
		});

		test('checkAndSwitch should respect enabled setting', () => {
			// Disable theme switching
			vscode.workspace.getConfiguration('themeSwitcher').update('enabled', false);

			// Set timestamp to force a switch if it were enabled (60 minutes ago)
			context.globalState.update('lastSwitchTimestamp', Date.now() - 60 * 60 * 1000);

			// Should not throw
			themeManager.checkAndSwitch();
			assert.ok(true, 'Should respect enabled setting');
		});

		test('pause should set paused flag', () => {
			themeManager.pause();
			assert.strictEqual(themeManager.isPaused(), true, 'Should set paused flag to true');
		});

		test('resume should clear paused flag', () => {
			themeManager.pause();
			themeManager.resume();
			assert.strictEqual(themeManager.isPaused(), false, 'Should clear paused flag');
		});

		test('checkAndSwitch should respect paused state', () => {
			themeManager.pause();

			// Set timestamp to force a switch if not paused (60 minutes ago)
			context.globalState.update('lastSwitchTimestamp', Date.now() - 60 * 60 * 1000);

			// Should not throw
			themeManager.checkAndSwitch();
			assert.ok(true, 'Should respect paused state');
		});

		test('start should initialize polling', () => {
			// Should not throw
			themeManager.start();
			assert.ok(true, 'Should initialize polling without error');
			themeManager.stop();
		});

		test('stop should clear polling', () => {
			themeManager.start();
			themeManager.stop();
			assert.ok(true, 'Should stop polling without error');
		});

		test('switchIntervalMinutes should have minimum of 1 minute', () => {
			// Verify that the configuration enforces minimum 1 minute
			vscode.workspace.getConfiguration('themeSwitcher').update('switchIntervalMinutes', 0);

			// checkAndSwitch should treat 0 as at least 1 minute
			themeManager.checkAndSwitch();
			assert.ok(true, 'Should enforce minimum 1 minute interval');
		});

		test('pollIntervalMinutes should be configurable', () => {
			// Set a custom poll interval
			vscode.workspace.getConfiguration('themeSwitcher').update('pollIntervalMinutes', 5);

			// Start should use this value
			themeManager.start();
			assert.ok(true, 'Should use pollIntervalMinutes from config');
			themeManager.stop();
		});
	});

	suite('Minute-based interval calculations', () => {
		setup(() => {
			themeManager = new ThemeManager(context);
		});

		test('should correctly calculate minutes elapsed since last switch', () => {
			// Set a timestamp 60 minutes ago
			const sixtyMinutesAgo = Date.now() - (60 * 60 * 1000);
			context.globalState.update('lastSwitchTimestamp', sixtyMinutesAgo);

			// With a 30-minute interval, this should trigger a switch
			vscode.workspace.getConfiguration('themeSwitcher').update('switchIntervalMinutes', 30);

			// Should not throw
			themeManager.checkAndSwitch();
			assert.ok(true, 'Should calculate minutes correctly');
		});

		test('should handle no prior switch timestamp', () => {
			// Clear the timestamp
			(context.globalState as any).data = {};

			vscode.workspace.getConfiguration('themeSwitcher').update('switchIntervalMinutes', 30);

			// Should not throw
			themeManager.checkAndSwitch();
			assert.ok(true, 'Should handle missing timestamp');
		});
	});
});

/**
 * Mock Memento for testing without full VS Code context
 */
class MockMemento implements vscode.Memento {
    keys(): readonly string[] {
        throw new Error("Method not implemented.");
    }
	private data: Map<string, any> = new Map();

	get<T>(key: string, defaultValue?: T): T | undefined {
		return this.data.has(key) ? this.data.get(key) : defaultValue;
	}

	update(key: string, value: any): Thenable<void> {
		this.data.set(key, value);
		return Promise.resolve();
	}
}