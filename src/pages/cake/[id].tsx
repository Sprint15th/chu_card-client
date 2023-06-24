import React, { useEffect } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { useSetRecoilState } from "recoil";
import { kakaoClipboard } from "react-kakao-share";
import styled from "@emotion/styled";

import { cakeState } from "@/store/cakeState";

import Meta from "@/components/Metadata";
import Letter from "@/components/Letter";

import cardService from "@/services/Card.service";
import type { Cake } from "@/types/cake.type";

type Props = {
	initialCake: Cake;
	kakaoShareData: {
		title: string;
		description: string;
		image: string;
		APIKEY: string;
	};
};

export default function CakeConfirm({ initialCake, kakaoShareData }: Props) {
	const router = useRouter();
	const setCreateCakeState = useSetRecoilState(cakeState);
	const createCakeState = initializeCreateCakeState(initialCake);

	const letterData = {
		cake: createCakeState.steps,
		message: initialCake.message,
		sender: initialCake.sender,
		receiver: initialCake.receiver,
	};

	useEffect(() => {
		setCreateCakeState(createCakeState);
	}, []);

	console.log(letterData);

	return (
		<React.Fragment>
			<Meta
				title={kakaoShareData.title}
				description={kakaoShareData.description}
				image={kakaoShareData.image}
			/>
			<Wrapper>
				<Navigation></Navigation>
				<Letter letterData={letterData} imagePath={""} />
				<ButtonContainer>
					<Button onClick={() => kakaoClipboard(kakaoShareData)}>공유하기</Button>
				</ButtonContainer>
			</Wrapper>
		</React.Fragment>
	);
}

const initializeCreateCakeState = (initialCake: Cake) => ({
	selectedIndex: 2,
	steps: {
		appearance: {
			valid: true,
			value: {
				color: initialCake.color,
				shape: initialCake.shape,
			},
		},
		decoration: {
			valid: true,
			value: {
				topping: initialCake.topping,
			},
		},
		letter: {
			valid: true,
			value: {
				sender: initialCake.sender,
				receiver: initialCake.receiver,
				message: initialCake.message,
			},
		},
	},
});

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
	const cake = await cardService.fetchCakeCardDetail(query.id as string);

	return {
		props: {
			initialCake: cake,
			kakaoShareData: getClipData(cake),
		},
	};
};

const getClipData = (cake: Cake) => ({
	title: `${cake.sender}님께서 ${cake.receiver}에게 축하메시지를 보냈습니다.`,
	description: cake.message,
	image: "https://cdn.discordapp.com/attachments/1119286155356160110/1122035909295091712/image.png",
	APIKEY: process.env.NEXT_PUBLIC_KAKAO_API_KEY,
});

const Wrapper = styled.div`
	background-color: #f6f4eb;
	height: 100vh;

	display: flex;
	flex-direction: column;
	justify-content: center;

	padding: 15px 18px;
`;

const Navigation = styled.div``;

const ButtonContainer = styled.div`
	margin-top: 28px;
	display: flex;
	gap: 16px;
`;

const Button = styled.button`
	padding: 12px;
	background-color: #ffe4d0;
	border-radius: 26px;
	font-family: Cafe24 Oneprettynight OTF;
	flex: 1;
`;
