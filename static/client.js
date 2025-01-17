/**
 * @param {Event} e - Form submision event 
 */
document.getElementById("scanForm").addEventListener("submit", async (e) => {
	e.preventDefault()

	const type = document.getElementById("scanType").value;
	const test = document.getElementById("scanTest").value;
	// const timeout = document.getElementById("timeout").value || 4000; // Get the timeout or set default as 4s

	const reqStruct = {
		type,
		test,
		// timeout: parseInt(timeout, 10),
	};

	const resp = await fetch("/start", {
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify(reqStruct),
	});

	const result = await resp.json();
	document.getElementById("results").textContent = JSON.stringify(result, null, 2)
})
