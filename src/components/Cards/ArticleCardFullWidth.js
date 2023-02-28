import slugify from "slugify";
import dollar from "../../assets/stockPhotos/r1_c1.jpg";
import { textClip } from "../../utils";
import { PDFButtonSmall } from "../utils";
import CardButton from "./CardButton";
import CardCover from "./CardCover";

function ArticleCardFullWidth(props) {
  const { coverPhoto, author, volume, title, slug, pdf } = props;

  const { cname, id, path } = props;
  const authorText = `BY ${textClip(
    author.toUpperCase(),
    65
  )} ${String.fromCharCode(183)} VOLUME ${volume}`;
  const defaultPhoto = coverPhoto ? coverPhoto : dollar;
  return (
    <div
      className={`rounded-md overflow-hidden
       shadow-lg my-4 md:m-4 lg:h-auto
       md:col-span-full`}
    >
      <CardCover coverPhoto={defaultPhoto} authorText={authorText} />
      <CardContent
        title={title}
        slug={slug}
        id={id}
        path={path}
        cname={cname}
        pdf={pdf}
      />
    </div>
  );
}

function CardContent({ title, slug, id, path, cname, pdf }) {
  const aboutSlug = textClip(slug, 400);
  const urlSlug = slugify(title);

  return (
    <div className="mx-2 my-4 text-justify md:mx-6 border-gray-light">
      <div className="h-10 text-lg font-bold text-left text-gray-600 truncate md:mb-4 md:text-2xl whitespace-nowrap text-ellipsis">
        {title}
      </div>
      <p className="px-2 mb-8 font-normal text-gray-700 break-words text-md lg:mb-0 lg:h-28">
        {aboutSlug}
      </p>
      <div className="flex flex-wrap content-evenly">
        <CardButton
          text="Read More"
          slug={urlSlug}
          id={id}
          path={path}
          cname={cname.button}
        />
        <PDFButtonSmall pdfLink={pdf} />
      </div>
    </div>
  );
}

export default ArticleCardFullWidth;
