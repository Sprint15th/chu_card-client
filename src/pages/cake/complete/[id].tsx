import React, { HTMLAttributes, useEffect } from "react";
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
import { CAKE_PATH } from "@/constants/cakePath";

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

	const cakeImagePath = `/images/${CAKE_PATH[`${initialCake.shape}_${initialCake.topping}`]}.png`;

	return (
		<React.Fragment>
			<Meta
				title={kakaoShareData.title}
				description={kakaoShareData.description}
				image={kakaoShareData.image}
			/>
			<Wrapper>
				<Navigation>
					<HomeButton onClick={() => router.push("/")} />
				</Navigation>
				<Letter letterData={letterData} imagePath={cakeImagePath} />
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
		color: initialCake.color,
		shape: initialCake.shape,
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

const GITHUB_REPO_PATH = "https://github.com/Sprint15th/chu_card-client/blob/develop/public/images";

const getClipData = (cake: Cake) => ({
	title: `${cake.sender}님께서 ${cake.receiver}에게 축하메시지를 보냈습니다.`,
	description: cake.message,
	image: `${GITHUB_REPO_PATH}/${CAKE_PATH[`${cake.shape}_${cake.topping}`]}.png?raw=true`,
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

const Navigation = styled.div`
	padding: 15px 0;
`;

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

const HomeButton = (props: HTMLAttributes<HTMLButtonElement>) => {
	return (
		<button {...props}>
			<svg
				width="24"
				height="24"
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<g id="home">
					<path
						id="Vector"
						d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<path
						id="Vector_2"
						d="M9 22V12H15V22"
						stroke="black"
						strokeWidth="2"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
				</g>
			</svg>
		</button>
	);
};
