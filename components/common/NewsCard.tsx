import { StrapiImage } from "../StrapiImage";

type NewsCardProps = {
  title: string;
  author_name: string;
  date: string;
  image: {
    url: string;
    alternativeText: string | null;
  };
};

const NewsCard = ({ title, author_name, date, image }: NewsCardProps) => {
  return (
    <div>
      <div className="h-[399px] relative">
        <img
          className="h-full max-h-[399px] w-full object-cover"
          src={image.url}
          alt={image.alternativeText || title}
          width={646}
          height={399}
        />
        <button className="absolute bottom-3 right-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="59"
            height="58"
            viewBox="0 0 59 58"
            fill="none"
          >
            <ellipse
              cx="29.1315"
              cy="28.7712"
              rx="29.1315"
              ry="28.7712"
              fill="white"
            />
            <path
              d="M16.9939 40.7592L41.2702 16.7832"
              stroke="black"
              strokeWidth="1.5"
            />
            <path
              d="M22.7739 16.7832H41.2701V32.7672"
              stroke="black"
              strokeWidth="1.5"
            />
          </svg>
        </button>
      </div>
      <div className="bg-[#F6F6F6] space-y-3 p-5">
        <div className="flex items-center gap-1">
          <p className="text-xl font-normal">
            {author_name} - <span className="text-[#aaa]">{date}</span>
          </p>
        </div>
        <div>
          <h2 className="text-xl xl:text-2xl font-bold">{title}</h2>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
