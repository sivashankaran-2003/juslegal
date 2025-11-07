import { Carousel } from "flowbite-react"

export default function Carosal() {
  return (
    <div className="flex items-center justify-center">
      {/* <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-screen"> */}
      <div className="w-screen h-[48vh] sm:h-screen">
        <Carousel>
          <img src="https://flowbite.com/docs/images/carousel/carousel-1.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-2.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-3.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-4.svg" alt="..." />
          <img src="https://flowbite.com/docs/images/carousel/carousel-5.svg" alt="..." />
        </Carousel>
      </div>
    </div>
  )
}
