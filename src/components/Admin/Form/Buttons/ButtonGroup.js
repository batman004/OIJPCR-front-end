import Button from "./Button";

const ButtonGroup = ({
    handleSubmit,
    handleDelete,
    deleteTxt
}) => {
    return (
        <div className="flex flex-row justify-center">
            <Button handleClick={handleSubmit} cname="primary-color-bg text-white">
                Save Data
            </Button>
            <Button handleClick={handleDelete} cname="bg-red-600 text-white">
                {deleteTxt || 'Delete Article'}
            </Button>
        </div>
    )
}


export default ButtonGroup;