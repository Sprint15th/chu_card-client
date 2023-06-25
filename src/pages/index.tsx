import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const router = useRouter();
  const [initialSlide, setInitialSlide] = useState<number | null>(null);

  // 첫방문 유저 캐러셀 상태 제어
  useEffect(() => {
    localStorage.getItem("isFirstVisitor")
      ? setInitialSlide(2)
      : setInitialSlide(0);
  }, []);

  const handleStart = () => {
    localStorage.setItem("isFirstVisitor", "true");
    router.push("/cake");
  };

  interface SlideStyles {
    backgroundColor?: string;
    width: string;
    height: string;
    display: string;
    marginTop: string;
    alignItems: string;
    flexDirection?: "row" | "row-reverse" | "column" | "column-reverse";
  }
  
  const slideStyles: SlideStyles = {
    width: "100%",
    height: "100vh",
    display: "flex",
    marginTop: "10.063rem",
    alignItems: "center",
    flexDirection: "column",
  };

  const slides = [
    { 
      img: '/landing/intro1.svg',
      text: `친구가 생일인데 색다르게 
축하해주고 싶지 않나요?`
    },
    { 
      img: '/landing/Intro2.png',
      text: `나만의 케이크를 제작하여
친구를 감동시켜주세요!`,
      comment: '그럼 시작해볼까요?'
    },
    { 
      img: '/landing/intro3.svg',
      backgroundColor: "white", 
      text: "시작하기" 
    },
  ];

  // 초기 슬라이드가 설정되기 전에는 캐러셀이나 다른 컨텐츠가 렌더링 방지
  if (initialSlide === null) {
    return null;
  }

  return (
    <div style={{ width: "23.485rem", height: "100vh" }}>
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
            <div
              style={{ ...slideStyles, backgroundColor: slide.backgroundColor }}
            >
              <img src={slide.img}/>
              {slide.text === "시작하기" ? (
                <button onClick={handleStart}>{slide.text}</button>
              ) : (
                slide.text
              )} <br/><br/>
              {slide.comment}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LandingPage;
