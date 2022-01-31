const Form = (props) => {
  return (
    <form onSubmit={props.handleSubmit} className="w-5/6 mt-8 sm:w-3/4 md:w-1/2">
      {props.children}
    </form>
  )
}

const FormField = (props) => {
  return (
    <div className="flex flex-col justify-evenly">
      <label
        htmlFor={props.id}
        className="my-4 text-xl font-semibold"
      >
        {props.label}
      </label>
      <input
        type={props.type}
        value={props.value}
        name={props.name}
        id={props.id}
        className="h-12 px-4 py-2 border-2 border-gray-300 rounded-lg"
        onChange={props.handleFieldChange}
      />
    </div>
  )
}

const FormContainer = ({
  cname,
  children
}) => (
  <div className={
    `flex flex-col min-h-screen items-center
     ${cname || 'py-4 px-1 sm:p-4 md:p-8'} 
     justify-start`
  }
  >
    {children}
  </div>
)


const FormHeading = ({ heading }) => (
  <h1 className="mt-4 text-4xl font-bold tracking-wide text-center text-gray-700">
    {heading}
  </h1>
)


const FormButton = ({ text }) => (
  <div className="flex justify-center mt-12">
    <button className="w-32 h-12 px-4 py-2 font-mono text-2xl tracking-wide text-white bg-purple-700 rounded-lg">
      {text}
    </button>
  </div>
)


export {
  Form,
  FormField,
  FormContainer,
  FormHeading,
  FormButton,
}