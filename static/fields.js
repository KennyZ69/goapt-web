/**
 * @typedef {Object} FieldTemplate -- an object as an dom element with given properties
 * @property {string} label
 * @property {string} type
 * @property {string} name
 * @property {string} placeholder
 * @property {boolean} required
 *
 * @typedef {Object} ScanOptions
 * @property {Record<string, []FieldTemplate>} specificScans -- field templates for specific scans under a given scan type
 *
 * @type {Record<string, ScanOptions>} -- a mapped list of templates for given specific scan
 */


const fieldTemplates = {
	network: {
		specificScans: {
			"port-scan": [
				{ label: "Ports to scan (comma separated):", type: "text", name: "ports", placeholder: "e.g. 22,423,699", required: true },
				{ label: "Target IP range: ", type: "text", name: "targetIPs", placeholder: "e.g. 192.169.0/24", required: true },
				{ label: "Network interface: ", type: "text", name: "netifi", placeholder: "eth0", required: true },

			],
			"general-scan": [
				{ label: "Target IP range: ", type: "text", name: "targetIPs", placeholder: "e.g. 192.169.0/24", required: true },
				{ label: "Network interface: ", type: "text", name: "netifi", placeholder: "eth0", required: true },

			],
			"mapper": [
				{ label: "Source IP from which to map the network: ", type: "text", name: "sourceIP", placeholder: "e.g. 172.117.0.15", required: true },
				{ label: "Network interface: ", type: "text", name: "netifi", placeholder: "eth0", required: true },
				{ label: "Target IP range: ", type: "text", name: "targetIPs", placeholder: "e.g. 192.169.0/24", required: true }

			],
			"ping-scan": [
				{ label: "Target IP range: ", type: "text", name: "targetIPs", placeholder: "e.g. 192.169.0/24", required: true },
				{ label: "Network interface: ", type: "text", name: "netifi", placeholder: "eth0", required: true },
			],

		}
	},
	script: {
		specificScans: {
			"ddos": [
				{ label: "IP or URL to run a DDOS script on:", type: "text", name: "target", placeholder: "e.g. example.com", required: true }
			]
		}
	}
}

/**
 * @param {string} primaryScanType -- the selected scan type
 * @param {string} specificScan -- the specific scan selected in given type of scan
 */

function updateSpecificScans(primaryScanType) {
	const specificScan = document.getElementById("scanTest");
	const scans = fieldTemplates[primaryScanType]?.specificScans || {};
	// console.log("Found these scans: ", scans);
	// console.log("spec scan: ", specificScan);

	specificScan.innerHTML = '<option value="" disabled selected> -- Select an option -- </option>';
	for (const [key, _] of Object.entries(scans)) {
		console.log("Creating", key, "scan");
		const option = document.createElement("option");
		option.value = key;
		option.textContent = key.replace(/-/g, " "); // replace each '-' for a white space
		specificScan.appendChild(option);
	}
}

function renderDynamicFields(primaryScanType, specificScan) {
	const fieldsContainer = document.getElementById("dynamicField")
	fieldsContainer.innerHTML = "";
	// fieldsContainer.classList.remove("hidden");
	// const scanForm = document.getElementById("scanForm");

	const fields = fieldTemplates[primaryScanType]?.specificScans[specificScan] || []; // fields array of each specific scan
	fields.forEach((field) => {
		const label = document.createElement("label");
		label.textContent = field.label;
		label.htmlFor = field.name;

		const input = document.createElement("input");
		input.type = field.type;
		input.name = field.name;
		input.id = field.name;
		input.placeholder = field.placeholder;
		if (field.required) input.required = true;

		// fieldsContainer.appendChild(label, input);
		fieldsContainer.appendChild(label);
		fieldsContainer.appendChild(input);
		// scanForm.appendChild(label, input);
	})
}

// Event listener for primary scan type changes
document.addEventListener("DOMContentLoaded", () => {
	document.getElementById("scanType").addEventListener("change", (e) => {
		const primaryScanType = e.target.value;
		updateSpecificScans(primaryScanType);
		renderDynamicFields(primaryScanType, ""); // Clear fields on type change
	});

	// Event listener for specific scan changes
	document.getElementById("scanTest").addEventListener("change", (e) => {
		const primaryScanType = document.getElementById("scanType").value;
		const specificScanType = e.target.value;
		renderDynamicFields(primaryScanType, specificScanType);
	});
})

