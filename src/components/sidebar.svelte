<!-- src/components/sidebar.svelte -->
<svelte:options customElement={{ tag: 'sidebar-component', shadow: 'open' }} />

<script lang="ts">
	// Sidebar open/closed state
	let open = false;

	function toggleSidebar() {
		open = !open;
	}
</script>

<!-- Open button (hidden when sidebar is open) -->
<button class="open-button" class:hidden={open} on:click={toggleSidebar} title="Open sidebar">
	☰
</button>

<!-- Sidebar panel -->
<div class="sidebar" class:open>
	<!-- Close button inside sidebar -->
	<button class="close-button" on:click={toggleSidebar} title="Close sidebar"> « </button>
	<!-- Replaceable content -->
	<div class="content">
		<slot>
			<!-- default content if none provided -->
			<p>Your sidebar content here…</p>
		</slot>
	</div>
</div>

<style>
	:host {
		display: block;
	}

	.open-button {
		position: fixed;
		top: 5px;
		left: 5px;
		background: #fff;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 0.5em 0.75em;
		cursor: pointer;
		font-size: 1em;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
		z-index: 10;
		transition: all 0.2s ease;
	}
	.open-button:hover {
		background: #f0f0f0;
		box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
	}
	.open-button.hidden {
		opacity: 0;
		pointer-events: none;
	}

	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		width: 200px;
		height: 100vh;
		background-color: #fff;
		box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
		transform: translateX(-200px);
		transition: transform 0.3s ease-in-out;
		display: flex;
		flex-direction: column;
		z-index: 10;
	}
	.sidebar.open {
		transform: translateX(0);
	}

	.close-button {
		align-self: flex-end;
		background: #fff;
		border: 1px solid #ccc;
		border-radius: 4px;
		padding: 0.25em 0.5em;
		margin: 0.5em;
		cursor: pointer;
		font-size: 1.2em;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
	}
	.close-button:hover {
		background: #f0f0f0;
	}

	.content {
		flex: 1;
		overflow-y: auto;
		padding: 0.5em 1em 1em 1em;
	}
</style>
