import './App.css'
import { useState } from 'react'
import Font from './component/Font'
import Modal from './component/Modal'
import Form from './component/Form'
import FormDataContext from './Context'
import { defaultFormValue } from './Context'

function App() {
    const [isopen, setIsOpen] = useState(false)
    const [formData, setFormData] = useState(defaultFormValue)
    return (
        <>
            <FormDataContext.Provider value={{ formData, setFormData }}>
                <section className="form-wrapper">
                    <Form />
                    <footer className="text-center text-gray-500 text-xs">
                        ©2022 Hanameee Corp. All rights reserved
                    </footer>
                </section>
                <Font />
                <Modal isOpen={isopen} />
            </FormDataContext.Provider>
        </>
    )
}

export default App
