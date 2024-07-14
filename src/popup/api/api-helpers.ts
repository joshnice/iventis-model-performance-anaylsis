export async function get<T>(url: string): Promise<T> {
	const request = await fetch(url);
	return request.json();
}
