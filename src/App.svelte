<script>
	import { Button } from "fluent-svelte";
	import "fluent-svelte/theme.css";
</script>

<header class="navbar Global">
	<div class="navbar-inner">
		<a class="logo" href="/">
			<img alt="Fluent Launcher" class="logo-icon" src="./app-icon.png" width="20" height="20">
			<span class="logo-title">
				Fluent Launcher 
			</span>
			<span class="text-block type-caption svelte-zxj483" style="color: var(--fds-text-secondary);">Preview</span>
		</a>
		<nav>
			<a class="navbar-selection" href="https://github.com/Xcube-Studio/Natsurainko.FluentLauncher">
				<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path style="fill: var(--fds-text-primary);"  d="m8.086 18.611 5.996-14.004a1 1 0 0 1 1.878.677l-.04.11-5.996 14.004a1 1 0 0 1-1.878-.677l.04-.11 5.996-14.004L8.086 18.61Zm-5.793-7.318 4-4a1 1 0 0 1 1.497 1.32l-.083.094L4.414 12l3.293 3.293a1 1 0 0 1-1.32 1.498l-.094-.084-4-4a1 1 0 0 1-.083-1.32l.083-.094 4-4-4 4Zm14-4.001a1 1 0 0 1 1.32-.083l.093.083 4.001 4.001a1 1 0 0 1 .083 1.32l-.083.095-4.001 3.995a1 1 0 0 1-1.497-1.32l.084-.095L19.584 12l-3.293-3.294a1 1 0 0 1 0-1.414Z"/></svg>
				Source
			</a>
			<a class="navbar-selection" href="https://xcubestudio.net/">
				<svg class="icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path style="fill: var(--fds-text-primary);"  d="M9 7a1 1 0 0 1 .117 1.993L9 9H7a3 3 0 0 0-.176 5.995L7 15h2a1 1 0 0 1 .117 1.993L9 17H7a5 5 0 0 1-.217-9.995L7 7h2Zm8 0a5 5 0 0 1 .217 9.995L17 17h-2a1 1 0 0 1-.117-1.993L15 15h2a3 3 0 0 0 .176-5.995L17 9h-2a1 1 0 0 1-.117-1.993L15 7h2ZM7 11h10a1 1 0 0 1 .117 1.993L17 13H7a1 1 0 0 1-.117-1.993L7 11h10H7Z" /></svg>				Xcube Studio
			</a>
			<Button variant="accent" class="navbar-selection" href="ms-windows-store://pdp/?ProductId=9P4NQQXQ942P&mode=mini">
				<svg class="icon " viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path style="fill: var(--fds-store-logo);" d="M8 3.75V6H2.75a.75.75 0 0 0-.75.75v11.5A2.75 2.75 0 0 0 4.75 21h14.5A2.75 2.75 0 0 0 22 18.25V6.75a.75.75 0 0 0-.75-.75H16V3.75A1.75 1.75 0 0 0 14.25 2h-4.5A1.75 1.75 0 0 0 8 3.75Zm1.75-.25h4.5a.25.25 0 0 1 .25.25V6h-5V3.75a.25.25 0 0 1 .25-.25ZM8 13V9.5h3.5V13H8Zm0 4.5V14h3.5v3.5H8Zm8-4.5h-3.5V9.5H16V13Zm-3.5 4.5V14H16v3.5h-3.5Z" /></svg>				
				Get in Microsoft Store
			</Button>
		</nav>
	</div>
</header>
<main>
	<section class="hero-section">
		<div class="page-section-inner">
			<div class="hero-contents">
				<h2 class="hero-contents-title">Fluent Launcher</h2>
				<p style="margin: -25px 0px 30px 0px;color: var(--fds-text-secondary);">
					Natsurainko.FluentLauncher A Minecraft launcher designed for Windows 11
				</p>
				<div style="display: inline-flex;flex-wrap: wrap;gap: 10px;">
					<Button href="ms-windows-store://pdp/?ProductId=9P4NQQXQ942P&mode=mini" style="width:125px;" variant="accent">Download</Button>
					<Button href="https://github.com/Xcube-Studio/Natsurainko.FluentLauncher" style="width:125px;">Source</Button>
				</div>
			</div>
		</div>
		<div style="padding: 0px 0px 150px 0px;display:flex;align-items:center; justify-content:center;">
					<img src="./app.png" class="app-image" alt="app" style="display: inline-block;height: auto;width: 100%; box-shadow:var(--fds-dialog-shadow) ; border: 1px solid var(--fds-surface-stroke-default);border-radius: var(--fds-overlay-corner-radius);"/>
		</div>
		
	</section>
</main>
<footer style="background: var(--fds-acrylic-background-default);">
	<div class="page-footer-section-inner">
		<div class="column" style="inline-size: 100%;">
			<a class="logo" href="/" >
				<img alt="Fluent Launcher" class="logo-icon" style="width: 36px;height: 36px;" src="./app-icon.png">
				<span class="logo-title" style="color: var(--fds-text-secondary)">
					Fluent Launcher 
				</span>
			</a>
			<p style="color: var(--fds-text-secondary);margin: 15px 0px 0px 0px;">Copyright © Xcube Studio 2022 - 2023</p>
		</div>
		<div class="column">
			<p style="margin-left: 10px;color: var(--fds-text-secondary)" data-svelte-h="svelte-76m2vc">Pages</p>
			<a class="navbar-selection" style="color: var(--fds-accent-text-primary);margin: 15px 0px 0px 0px;inline-size: fit-content;" href="/">
				Home
			</a>
			<a class="navbar-selection" style="color: var(--fds-accent-text-primary);margin: 10px 0px 0px 0px;inline-size: fit-content;" href="https://github.com/Xcube-Studio/Natsurainko.FluentLauncher">
				GitHub
			</a>
		</div>
		<div class="column">
			<p style="margin-left: 10px; color: var(--fds-text-secondary)" data-svelte-h="svelte-76m2vc">Contribute to Fluent Launcher</p>
			<a class="navbar-selection" style="color: var(--fds-accent-text-primary);margin: 15px 0px 0px 0px;inline-size: fit-content;" href="https://github.com/Xcube-Studio/Natsurainko.FluentLauncher/issues">
				Give Feedback
			</a>
			<a class="navbar-selection" style="color: var(--fds-accent-text-primary);margin: 10px 0px 0px 0px;inline-size: fit-content;" href="https://github.com/Xcube-Studio/FluentLauncher.LocalizationPoroject">
				"Localization Poroject"
			</a>
		</div>
	</div>
</footer>
<style>

.logo-title {
	margin: 0px 15px 0px 15px;
	color: var(--fds-text-primary);
}

.logo-icon {
	width: 24px;
	height: 24px;
	border-radius: 4px;
	border-style:solid;
    border-width:1px;
	color: #000000ae;
}

.logo {
	align-items: center;
    color: var(--fds-text-primary);
    display: flex;
    font-family: var(--fds-font-family-display);
    font-size: 20px;
    font-weight: 600;
    justify-content: left;
    position: relative;
    text-decoration: none;
    transition: var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing);
	flex: 0 0 auto;
	-webkit-user-drag: none;
    box-sizing: border-box;
}

.icon {
	width: 16px;
	height: 16px;
	margin: 0px 8px 0px 0px;
	color: var(--fds-text-primary);
}

.navbar-inner {
	margin: 0 auto;
    max-inline-size: 1440px;
    padding-inline: 48px 24px;
	align-items: center;
    display: flex;
    inline-size: 100%;
	-webkit-user-drag: none;
    box-sizing: border-box;
	
}

.navbar {
	align-items: center;
    display: flex;
    inline-size: 100%;
    -webkit-backdrop-filter: blur(60px);
    backdrop-filter: blur(60px);
    background-clip: padding-box;
    background-color: var(--fds-layer-background-default);
    border-bottom: 1px solid var(--fds-surface-stroke-flyout);
    box-sizing: border-box;
    inset-block-start: 0;
    inset-inline-start: 0;
    justify-content: center;
    min-block-size: 56px;
    position: fixed;
    transform: translateY(.001px);
    z-index: 1000;
}
.Global
{
    -webkit-backdrop-filter: blur(60px);
    backdrop-filter: blur(60px);
    background-clip: padding-box;
    background-color: var(--fds-layer-background-default);
    border-bottom: 1px solid var(--fds-surface-stroke-flyout);
    box-sizing: border-box;
    inset-block-start: 0;
    inset-inline-start: 0;
    justify-content: center;
}

nav {
	align-items: center;
    display: flex;
	flex: 1 1 auto;
    gap: 12px;
    justify-content: flex-end;
    padding: 0 16px;
}

.navbar-selection {
	color: var(--fds-accent-text-primary);
	border-radius: var(--fds-control-corner-radius);
    color: var(--fds-text-primary);
    justify-content: center;
    padding: 5px 11px;
    position: relative;
    text-decoration: none;
    transition: var(--fds-control-fast-duration) var(--fds-control-fast-out-slow-in-easing);
	align-items: center;
    display: flex;
	-webkit-user-drag: none;
    box-sizing: border-box;
	font-size: 14px;
}

.navbar-selection:hover {
    background-color: var(--fds-subtle-fill-secondary)
}

.navbar-selection:active {
    background-color: var(--fds-subtle-fill-tertiary)
}

.hero-section {
    align-items: center;
    background: url('./bloom-mica-light.png');
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-block-size: 596px;
    position: relative;
    text-align: center;
	background-attachment: fixed;
	background-size: cover;
 	background-repeat: no-repeat;
	width: 100%;
}
@media (prefers-color-scheme: dark)
{
	.hero-section{
		background: url('./bloom-mica-dark.png') ;
	}

	.app-image{
		content: url('./app-dark.png');
	}
}
.page-section-inner {
	align-items: center;
    display: flex;
    flex-direction: column;
    position: relative;
	padding-block: 58px 128px;
	margin: 0 auto;
    max-width: 1440px;
    padding: 150px 0px 45px 0px;
    width: 100%;
	-webkit-user-drag: none;
    box-sizing: border-box;
}

.hero-contents {
	position: relative;
	-webkit-user-drag: none;
    box-sizing: border-box;
}

.hero-contents-title {
	font-size: 3.2rem; 
    margin-block-start: 0.83em;
    margin-block-end: 0.83em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
	font-weight: 600;
	color: var(--fds-text-primary);
}

.hero-card-app {
	-webkit-backdrop-filter: blur(60px) saturate(125%);
    backdrop-filter: blur(60px) saturate(125%);
    background-clip: padding-box;
    border: 1px solid #00000025;
    border-radius: 8px;
    box-shadow: var(--fds-dialog-shadow);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    font-family: var(--fds-font-family-text);
    font-size: var(--fds-body-font-size);
    font-weight: 400;
    line-height: 20px;
	max-width: 1000px;
	min-width: 450px;
    position: relative;
    transition: var(--fds-control-normal-duration) var(--fds-control-fast-out-slow-in-easing);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.page-footer-section-inner {
	grid-template-columns: auto;
    display: flex;
    gap: 48px;
    justify-content: space-between;
	padding: 36px 72px;
	block-size: 100%;
    inline-size: 95%;
	margin:0 auto;
    max-inline-size: 2048px;
    position: relative;
	box-sizing: border-box;
	font-family: var(--font-family-sans-serif);
}

.column {
    font-family: var(--font-family-sans-serif);
	flex: 1 1 auto;
	display: block;
	inline-size: fit-content;
    min-inline-size: unset;
	box-sizing: border-box;
    min-width: 16vw;
}
</style>

