import HTMLReactParser from 'html-react-parser'

// Keep these classes in sync with ARTICLE_BODY_CLASSES in Admin/Config/TinyMCEConfig.js.
const ArticleBody = ({ content = '', children }) => (
    <div className="max-w-full mt-16 text-justify lg:mx-4 article-content">
        {HTMLReactParser(content.toString())}
        {children}
    </div>
)


export default ArticleBody;
