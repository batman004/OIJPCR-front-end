const UploadFile = ({
  label,
  name,
  accept,
  onFileChange
}) => (
  <div className="my-4 border-1">
    <h1>{label}</h1>
    <input
      type="file"
      name={name}
      accept={accept}
      onChange={onFileChange}
    />
  </div>
)


export default UploadFile