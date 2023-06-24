import ApiClient from "@/utils/apiClient";

class CardService extends ApiClient {
	public async createCard(values: any) {
		const { data } = await this.post("/create-card");

		return data;
	}
}
