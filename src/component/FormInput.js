function FormInput({ label, id, errMessage, props }) {
    return (
        <>
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="id"
            >
                {label}
            </label>
            <input
                id={id}
                className={`shadow border rounded w-full py-2 px-3 text-gray-700 ${
                    errMessage === '' ? '' : 'border-red-600'
                }`}
                {...props}
            />
            <div id="id-msg" className="mt-1 mb-3 text-xs text-red-500">
                {errMessage}
            </div>
        </>
    )
}
export default FormInput
