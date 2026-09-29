const Button = ({
    handleClick,
    cname,
    type = 'submit',
    children
}) => {
    const btnCN = cname +
        ' block uppercase text-xl font-bold mx-auto p-4 rounded mt-8 w-64'
    return (
        <button
            className={btnCN}
            type={type}
            onClick={handleClick}
        >
            {children}
        </button>
    )
}


export default Button;