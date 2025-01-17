/**
 * @property {string} label
 * @property {string} type
 * @property {string} name
 * @property {string} placeholder
 * @property {boolean} required
 * @typedef {Object} FieldTemplate
 *
 * @typedef {Object} ScanOptions
 * @property {Record<string, []FieldTemplate>} specific -- field templates for specific scans under a given scan type
 *
 * @type {Record<string, ScanOptions>}
 */


const fieldTemplates = {
	network: {
		specificScans: {
			"port-scan": [
				{ label: "Ports to scan (comma separated):", type: "text", name: "ports", placeholder: "e.g. 22,423,699", required: true }
			],
			"general-scan": [
				{ label: "General scan to map the network and provide information", type: "text", name: "generalScan", placeholder: "e.g. 22,423,699", required: false }
			],
			"mapper": [
				{ label: "Port to scan (comma separated):", type: "text", name: "ports", placeholder: "e.g. 22,423,699", required: false }
			],
			"ping-scan": [
				{ label: "Port to scan (comma separated):", type: "text", name: "ports", placeholder: "e.g. 22,423,699", required: false }
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

