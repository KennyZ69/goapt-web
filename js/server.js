import { serve } from "bun";
import { join } from "path";

const pubDir = join(import.meta.dir, "public");
/** 
	* @param {Request} req 
	* @returns {Response}
*/

// async function handleRequest(req) {
const handleRequest = async (req) => {
	const url = new URL(req.url);

	// Handles if the user started a scan already
	if (req.method == "POST" && req.url == "/start") {
		const body = await req.json()

		// Mock response for now
		return new Response(
			JSON.stringify({
				message: `Scan started for type: ${body.type}, specific: ${body.test}, timeout: ${body.timeout}ms`,
			}),
			{ headers: { "Content-Type": "application/json" } }
		);
	}

	// Serve the index.html page for the user
	if (req.method == "GET" && (url.pathname == "/" || url.pathname == "/index.html")) {
		return new Response(await Bun.file("index.html"), {
			headers: { "Content-Type": "text/html" },
		});
	}

	// Serve static assets from the "public" directory (CSS, JS)
	if (req.method === "GET" && url.pathname.startsWith("/public")) {
		const filePath = join(pubDir, url.pathname.replace("/public", ""));
		try {
			return new Response(await Bun.file(filePath));
		} catch {
			return new Response("File not found", { status: 404 });
		}
	}

	return new Response("Not Found, haha", { status: 404 });
};

serve({
	fetch: handleRequest,
	port: 1769,
});
