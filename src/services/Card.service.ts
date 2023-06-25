import { Cake } from "@/types/cake.type";
import ApiClient from "@/utils/apiClient";

class CardService extends ApiClient {
	public async createCard(values: any) {
		const { data } = await this.post("/create-card");

		return data;
	}

	public async fetchCakeCardDetail(id: string): Promise<Cake> {
		return {
			cakeId: id,
			color: "CHOCOLATE",
			shape: "CIRCLE",
			topping: "CHERRY",
			sender: "빡준", // 20자미만
			receiver: "우지", // 20자미만
			message: "우지 화이팅 ㅋ", // -> 200자 미만
			createdAt: "1996-09-11", // yyyy-mm-dd
		};
	}
}

export default new CardService();
