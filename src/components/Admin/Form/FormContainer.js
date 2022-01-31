const FormContainer = ({
  heading,
  handleSubmit,
  children
}) => (
  <div className="flex items-center justify-center w-full h-full">
    <div className="w-full p-8 m-4 bg-white rounded shadow-2xl">

      <h1 className="block w-full mb-6 text-2xl font-bold text-center text-gray-800">
        {heading}
      </h1>

      <form onSubmit={handleSubmit} method="POST">
        {children}
      </form>
    </div>
  </div>
)


export default FormContainer;