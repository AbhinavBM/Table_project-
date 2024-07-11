import React from 'react'
import useEmblaCarousel, { EmblaOptionsType } from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import alt1 from './../src/assets/donation/dimg1.jpg'
import alt2 from './../src/assets/donation/dimg2.jpg'
import alt3 from './../src/assets/donation/dimg3.jpg'

export const images: string[] = [alt1, alt2, alt3]

const imageByIndex = (index: number): string => images[index % images.length]


type PropType = {
  slides: number[]
  options?: EmblaOptionsType
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options } = props
  const [emblaRef] = useEmblaCarousel(options, [Autoplay()])

  return (
    <div className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__number">
                <span>{index + 1}</span>
              </div>
              <img
                className="embla__slide__img"
                src={imageByIndex(index)}
                alt="Your alt text"
              />
            </div>
          ))}
        </div>
       
      </div>
    </div>
  )
}

export default EmblaCarousel
