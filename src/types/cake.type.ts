type Cake = {
	cakeId: string; // -> 데이터 공유 or 확인 요청
	color: "CHOCOLATE" | "CREAM" | "BERRY";
	shape: "CIRCLE" | "SQUARE" | "HEART";
	topping: "CHERRY" | "BERRY" | "ORANGE" | "CHOCOLATE";
	sender: string; // 20자미만
	receiver: string; // 20자미만
	message: string; // -> 200자 미만

	createdAt: `${string}-${string}-${string}`; // yyyy-mm-dd
};

export type { Cake };
