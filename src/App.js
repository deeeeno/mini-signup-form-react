import './App.css'
import { useState, useRef } from 'react'
import Font from './component/Font'
import Modal from './component/Modal'
import Form from './component/Form'
import FormDataContext from './Context'
import { defaultFormValue } from './Context'

function App() {
    const [formData, setFormData] = useState(defaultFormValue)
    const modalRef = useRef(null)
    const modalOpen = () => {
        modalRef.current.showModal()
    }
    return (
        <>
            <FormDataContext.Provider value={{ formData, setFormData }}>
                <section className="form-wrapper">
                    <Form modalOpen={modalOpen} />
                    <footer className="text-center text-gray-500 text-xs">
                        ©2022 Hanameee Corp. All rights reserved
                    </footer>
                </section>
                <Font />
                <Modal ref={modalRef} />
            </FormDataContext.Provider>
        </>
    )
}

export default App
