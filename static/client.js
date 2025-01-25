/**
 * @param {Event} e - Form submision event 
 */
document.getElementById("scanForm").addEventListener("submit", async (e) => {
	e.preventDefault()

	// const type = document.getElementById("scanType").value;
	// const test = document.getElementById("scanTest").value;
	// const timeout = document.getElementById("timeout").value || 4000; // Get the timeout or set default as 4s

	// Now I have to get  the dynamic options somehow 

	/**
	 * @property { string } sourceIP 
	 * @property { string } netifi -- network interface of the current user
	 * @property { string } targetIPs -- the target ip range (CIDR)
	 * @property { number} ports 
	*/

	const NetOpstruct = {
		sourceIP: document.getElementById("sourceIP").value || null,
		netifi: document.getElementById("netifi").value || null,
		targetIPs: document.getElementById("targetIPs").value || null,
		ports: document.getElementById("").value || null,
	}

	const reqStruct = {
		type: document.getElementById("scanType").value,
		test: document.getElementById("scanTest").value,
		timeout: document.getElementById("timeout").value || 4000, // Get the timeout or set default as 4s

		// type,
		// test,
		// // timeout: parseInt(timeout, 10),
		NetOptions: NetOpstruct
	};

	// const dynamicFields = document.getElementById("dynamicField");
	// if (dynamicFields) {
	// Here I want to retrieve the dynamic option fields for request
	// But I guess it would be fine to make it like a switch based on the primary scan type or something
	// Or just hardcode everything inside the sent struct for now but do an || (as in 'or') to either get a real value or give null
	// }
	try {
		const resp = await fetch("/start", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(reqStruct),
		});

		if (!resp.ok) {
			throw new Error(`Error : ${resp.statusText}`)
		}

		const result = await resp.json();
		// document.getElementById("results").textContent = JSON.stringify(result, null, 2)
		document.getElementById("resultsContent").textContent = JSON.stringify(result, null, 2)

	} catch (error) {
		document.getElementById("resultsContent").textContent = `Scan failed: ${error}`;
	}
})
