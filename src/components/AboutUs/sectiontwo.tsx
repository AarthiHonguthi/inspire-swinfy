import { motion } from 'framer-motion';
import Image from 'next/image';

const images = [
  { id: 1, src: '/images/17.png', alt: 'Gallery Image 1' },
  { id: 2, src: '/images/18.png', alt: 'Gallery Image 2' },
  { id: 3, src: '/images/17.png', alt: 'Gallery Image 3' },
  { id: 4, src: '/images/18.png', alt: 'Gallery Image 4' },
  { id: 5, src: '/images/17.png', alt: 'Gallery Image 5' },
  { id: 6, src: '/images/18.png', alt: 'Gallery Image 6' },
  { id: 7, src: '/images/17.png', alt: 'Gallery Image 7' },
  { id: 8, src: '/images/18.png', alt: 'Gallery Image 8' },
];

const SectionTwo = () => {
  return (
    <div className="p-10 flex justify-center items-center ">
      <div className="relative p-10 flex justify-center items-center overflow-clip">
  {/* Outer Gray Box */}
  <div className="absolute top-0 left-0 w-[105%] h-[105%] bg-gray-800 rounded-lg shadow-lg transform -translate-x-6 -translate-y-6"></div>

  {/* Inner Box with Gallery */}
  <div className="relative bg-[#dfdfd5] rounded-lg shadow-lg p-20 z-10">
    {/* Heading */}
    <h2
      className="text-6xl font-bold text-[#14394b] mb-20 text-center"
      style={{ fontFamily: 'Playfair Display' }}
    >
      Our Gallery
    </h2>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
            {images.map((image) => (
              <motion.div
                key={image.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="overflow-hidden rounded-lg shadow-lg"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={400}
                  height={400}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionTwo;
