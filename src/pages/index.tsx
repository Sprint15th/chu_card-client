import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from '@emotion/styled';

const LandingPage = () => {
  const router = useRouter();
  const [initialSlide, setInitialSlide] = useState<number | null>(null);

  // 첫방문 유저 캐러셀 상태 제어
  useEffect(() => {
    localStorage.getItem('isFirstVisitor') ? setInitialSlide(2) : setInitialSlide(0);
  }, []);

  const handleStart = () => {
    localStorage.setItem('isFirstVisitor', 'true');
    router.push('/cake');
  };

  interface SlideStyles {
    backgroundColor?: string;
    width: string;
    height: string;
    display: string;
    marginTop: string;
    alignItems: string;
    flexDirection?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
  }

  const slideStyles: any = {};

  const slides = [
    {
      img: '/landing/intro1.svg',
      text: `친구가 생일인데 색다르게 
축하해주고 싶지 않나요?`,
    },
    {
      img: '/landing/intro2.svg',
      text: `나만의 케이크를 제작하여
친구를 감동시켜주세요!`,
      comment: '그럼 시작해볼까요?',
    },
    {
      img: '/landing/intro3.svg',
      backgroundColor: 'white',
      text: '시작하기',
    },
  ];

  // 초기 슬라이드가 설정되기 전에는 캐러셀이나 다른 컨텐츠가 렌더링 방지
  if (initialSlide === null) {
    return null;
  }

  return (
    <Root>
      <Swiper
        initialSlide={initialSlide}
        modules={[Pagination]}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Container $backgroundColor={slide.backgroundColor}>
              <ImageContainer>
                <img src={slide.img} />
                {slide.text === '시작하기' ? <button onClick={handleStart}>{slide.text}</button> : slide.text} <br />
                <br />
                {slide.comment}
              </ImageContainer>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </Root>
  );
};

export default LandingPage;

const Root = styled.div`
  height: 100vh;
  position: relative;
`;

const Container = styled.div<{ $backgroundColor?: string }>`
  position: absolute;
  top: calc(var(--vh, 1vh) * 20);

  width: 100%;
  height: calc(var(--vh, 1vh) * 100);
  background-color: ${({ $backgroundColor }) => $backgroundColor};

  @media (min-height: 768px) {
    top: calc(var(--vh, 1vh) * 25);
  }

  @media (min-height: 1100px) {
    top: calc(var(--vh, 1vh) * 30);
  }
`;

const ImageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
