const FormField = ({
  name,
  label,
  type,
  value,
  min,
  handleChange
}) => (
  // const minVal = type === 'number' ? `min=${min}` : false
  <div className="flex flex-col mb-4">
    <label
      className="mb-2 text-lg font-bold text-gray-900"
      htmlFor={name}
    >
      {label}
    </label>
    <input
      className="px-3 py-2 border text-grey-800"
      type={type ? type : 'text'}
      min={min}
      id={name}
      value={value}
      name={name}
      onChange={handleChange}
    />
  </div>
)


export default FormField;