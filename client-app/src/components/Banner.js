import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
    return (
        <div className="relative">
            <div className="absolute w-full h-32 bg-gradient-to-t from-gray-100 to-transparent bottom-0 z-20" />
            <Carousel
                autoPlay
                infiniteLoop
                showStatus={false}
                showIndicators={false}
                showThumbs={false}
                interval={5000}>
                <div>
                    <img
                        loading="lazy"
                        src="https://www.paklap.pk/pub/media/easyslide/Best_Gaming_Laptops_in_Pakistan.jpg"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        loading="lazy"
                        src="https://www.paklap.pk/pub/media/easyslide/sliding_banners-03.jpg"
                        alt=""
                    />
                </div>
                <div>
                    <img
                        loading="lazy"
                        src="https://www.paklap.pk/pub/media/easyslide/Dell_Laptops_Prices_in_Pakistan_1.jpg"
                        alt=""
                    />
                </div>
            </Carousel>
        </div>
    );
}

export default Banner;
