import { motion } from 'framer-motion';
import Image from 'next/image';



const SectionOne = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto max-w-5xl grid grid-cols-1 md:grid-cols-4 lg:grid-cols-2 gap-4">
        {/* Our Mission Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-red-500 text-white p-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-4">OUR MISSION</h2>
          <p className="text-lg">
            To revolutionize event management by simplifying the process of
            connecting event hosts with industry experts. We aim to empower
            organizations to create impactful events effortlessly through
            seamless coordination, transparency, and secure logistics
            management.
          </p>
        </motion.div>

        {/* Target Image */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex justify-center items-center"
        >
          <Image
            src={"/images/target.png"}
            alt="Target"
            width={200}
            height={200}
          />
        </motion.div>

        {/* Binoculars Image - Aligned to the Left */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center items-center order-1 lg:order-none"
        >
          <Image
            src={"/images/binoculars.png"}
            alt="Binoculars"
            width={200}
            height={200}
          />
        </motion.div>

        {/* Our Vision Section - Aligned to the Right */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-orange-500 text-white p-8 rounded-lg order-2 lg:order-none"
        >
          <h2 className="text-2xl font-bold mb-4">OUR VISION</h2>
          <p className="text-lg">
            To become the leading platform for hosting extraordinary events by
            bridging the gap between organizations and expert talent worldwide.
            We envision a world where organizing events is streamlined, allowing
            hosts to focus on creating memorable experiences with ease and
            confidence.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-green-500 text-white p-8 rounded-lg"
        >
          <h2 className="text-2xl font-bold mb-4">OUR VALUES</h2>
          <p className="text-lg">
            Excellence: Striving to deliver the highest quality of service at
            every stage, from expert selection to event execution.
          </p>
          <p className="text-lg">
            Integrity: Committing to transparency, security, and reliability,
            ensuring trust in every interaction.
          </p>
          <p className="text-lg">
            Innovation: Continuously improving our platform to adapt to the
            evolving needs of our users.
          </p>
          <p className="text-lg">
            Collaboration: Building strong relationships with our users,
            experts, and partners to create meaningful and successful events.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex justify-center items-center"
        >
          <Image
            src={"/images/hands.png"}
            alt="Hands"
            width={200}
            height={200}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SectionOne;
