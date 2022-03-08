import { createContext } from 'react'

export const defaultFormValue = {
    id: '',
    pwd: '',
    pwdChk: '',
}

const FormDataContext = createContext({
    formData: defaultFormValue,
    setFormData: () => {},
})

export default FormDataContext
