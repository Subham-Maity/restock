import image1 from '../images/banner1.jpg'
import image2 from '../images/banner2.jpg'
import image3 from '../images/banner3.jpg'
import image4 from '../images/banner2.jpg'
// import image4 from '../images/slide-4.jpg'

// @ts-ignore
export const images: string[] = [image1, image2, image3, image4]

const imageByIndex = (index: number): string => images[index % images.length]

export default imageByIndex