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

  const slideStyles = {
    width: "100%",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };

  const slides = [
    { backgroundColor: "teal", text: "red" },
    { backgroundColor: "tomato", text: "blue" },
    { backgroundColor: "skyblue", text: "시작하기" },
  ];

  // 초기 슬라이드가 설정되기 전에는 캐러셀이나 다른 컨텐츠가 렌더링 방지
  if (initialSlide === null) {
    return null;
  }

  return (
    <div style={{ width: "100%", height: "100vh" }}>
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
              {slide.text === "시작하기" ? (
                <button onClick={handleStart}>{slide.text}</button>
              ) : (
                slide.text
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default LandingPage;
