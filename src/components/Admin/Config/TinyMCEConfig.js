export const toolbar = 'save | undo redo | link | image media | ' +
  'insert | styleselect | bold | italic | code | ' +
  'alignleft aligncenter alignright alignjustify | ' +
  'bullist numlist | outdent indent | help'

export const plugins = [
  'advlist autolink lists link image',
  'charmap print preview anchor help',
  'searchreplace visualblocks fullscreen',
  'code',
  'insertdatetime media table paste wordcount save',
]

// Same classes as the body wrapper in components/Article/ArticleBody.js.
const ARTICLE_BODY_CLASSES = 'editor article-content text-justify'

// The editable area is an iframe and does not inherit this page's CSS. Mirror the
// app's stylesheets into it so authors see the article typography readers get.
function mirrorSiteStyles(editor) {
  const doc = editor.getDoc()
  document.querySelectorAll('link[rel="stylesheet"], style').forEach(node => {
    if (node.tagName === 'LINK') {
      if (node.href.includes('/tinymce/')) return
      const link = doc.createElement('link')
      link.rel = 'stylesheet'
      link.href = node.href
      doc.head.appendChild(link)
    } else {
      doc.head.appendChild(node.cloneNode(true))
    }
  })
}

async function uploadBlob(blobInfo, uploadImage) {
  const blob = blobInfo.blob()
  const file = new File([blob], blobInfo.filename(), { type: blob.type })
  const url = await uploadImage(file)
  if (!url) throw new Error('the server did not return a file URL')
  return url
}

export const createEditorInit = ({ uploadImage }) => ({
  height: 600,
  menubar: true,
  branding: false,
  plugins: plugins,
  toolbar: toolbar,
  content_css: false,
  body_class: ARTICLE_BODY_CLASSES,
  content_style: 'body { padding: 1rem 1.5rem; }',
  setup: editor => editor.on('PreInit', () => mirrorSiteStyles(editor)),

  // Article text always uses the site's font and size; drop overrides from pasted documents.
  invalid_styles: 'font-family font-size line-height',
  removed_menuitems: 'fontformats fontsizes',

  // Saved HTML is rendered under /archive/..., so URLs must not be rewritten relative to /admin/.
  convert_urls: false,

  // Pasted, dropped and dialog-picked images (and legacy base64 ones) are uploaded to media
  // storage when the article is saved (see readEditorContent), not while it is being edited.
  paste_data_images: true,
  automatic_uploads: false,
  images_upload_handler: (blobInfo, success, failure) => {
    uploadBlob(blobInfo, uploadImage)
      .then(success)
      .catch(err => failure(`Image upload failed: ${err?.response?.data?.message || err.message}`))
  },
})

export const config = {
  onRemove: '',
  onActivate: '',
  onAddUndo: '',
  onBeforeAddUndo: '',
  onBeforeExecCommand: '',
  onBeforeGetContent: '',
  onBeforePaste: '',
  onBeforeRenderUI: '',
  onBeforeSetContent: '',
  onBlur: '',
  onClearUndos: '',
  onClick: '',
  onContextMenu: '',
  onCopy: '',
  onCut: '',
  onDblclick: '',
  onDeactivate: '',
  onDirty: '',
  onDrag: '',
  onDragDrop: '',
  onDragEnd: '',
  onDragGesture: '',
  onDragOver: '',
  onDrop: '',
  onExecCommand: '',
  onFocus: '',
  onFocusIn: '',
  onFocusOut: '',
  onGetContent: '',
  onHide: '',
  onInit: '',
  onKeyDown: '',
  onKeyPress: '',
  onKeyUp: '',
  onLoadContent: '',
  onMouseDown: '',
  onMouseEnter: '',
  onMouseLeave: '',
  onMouseMove: '',
  onMouseOut: '',
  onMouseOver: '',
  onMouseUp: '',
  onNodeChange: '',
  onObjectResized: '',
  onObjectSelected: '',
  onObjectResizeStart: '',
  onPaste: '',
  onPostProcess: '',
  onPostRender: '',
  onPreProcess: '',
  onProgressState: '',
  onRedo: '',
  onReset: '',
  onSaveContent: '',
  onSelectionChange: '',
  onSetAttrib: '',
  onSetContent: '',
  onShow: '',
  onSubmit: '',
  onUndo: '',
  onVisualAid: '',
}