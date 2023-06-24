import axios from "axios";

class ApiClient {
	protected async get<T>(url: string, options?: object) {
		return await axios.get<T>(url, options);
	}

	protected async post<T>(url: string, options?: object) {
		return await axios.post<T>(url, options);
	}
}

export default ApiClient;
