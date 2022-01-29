const UploadFile = ({
  label,
  name,
  onFileChange
}) => (
  <div className="my-4 border-1">
    <h1>{label}</h1>
    <input
      type="file"
      name={name}
      onChange={onFileChange}
    />
  </div>
)


export default UploadFile