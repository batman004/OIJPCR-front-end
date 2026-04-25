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
      className={`card-surface overflow-hidden
       my-4 md:m-4 lg:h-auto md:col-span-full`}
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
    <div className="mx-2 my-4 text-left md:mx-6">
      <div
        className="h-16 text-xl font-bold font-serif text-left overflow-hidden md:mb-4 md:text-2xl"
        style={{
          display: '-webkit-box',
          WebkitBoxOrient: 'vertical',
          WebkitLineClamp: 2,
          color: 'var(--color-primary)',
        }}
        title={title}
      >
        {title}
      </div>
      <p className="px-2 mb-6 font-normal break-words text-base leading-relaxed lg:mb-0 lg:h-28 overflow-hidden"
         style={{
           color: 'var(--color-text-muted)',
           display: '-webkit-box',
           WebkitBoxOrient: 'vertical',
           WebkitLineClamp: 4,
         }}>
        {aboutSlug}
      </p>
      <div className="flex flex-row flex-wrap items-center gap-3 px-2 mt-4 mb-2">
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
