import Image from "next/image";
import Link from "next/link";
import Loader from "./Loader";
import { motion } from "framer-motion";

const Card = ({ name, population, region, capital, image, idx }) => {
  if (!name) return <Loader />;
  return (
    <Link href={`${name}`}>
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1, transition: { delay: idx * 0.05 } }}
        className={`card h-[350px] w-full cursor-pointer overflow-hidden rounded-md dark:bg-darkblue-1 max-lg:h-[400px] shadow-medium`}
      >
        <div className="flag w-full">
          <Image
            className="aspect-square h-44 w-full max-lg:h-52"
            src={image}
            height={0}
            width={0}
            sizes="200px"
            alt={name}
            priority
          />
        </div>
        <div className="px-8 pb-8 pt-7">
          <h2 className="text-lg font-extrabold">{name}</h2>
          <div className="pt-3 text-sm font-semibold">
            <p>
              Population: <span className="font-light">{population}</span>
            </p>
            <p>
              Region: <span className="font-light">{region}</span>
            </p>
            <p>
              Capital: <span className="font-light">{capital}</span>
            </p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default Card;
