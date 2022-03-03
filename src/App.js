import './App.css'
import { useState, useEffect } from 'react'
import Font from './component/Font'
import Modal from './component/Modal'
import Form from './component/Form'
function App() {
    const [id, setId] = useState('')
    const [pwd, setPwd] = useState('')
    const [pwdChk, setPwdChk] = useState('')

    return (
        <>
            <section className="form-wrapper">
                <Form
                    id={id}
                    pwd={pwd}
                    pwdChk={pwdChk}
                    setId={setId}
                    setPwd={setPwd}
                    setPwdChk={setPwdChk}
                />
                <footer className="text-center text-gray-500 text-xs">
                    ©2022 Hanameee Corp. All rights reserved
                </footer>
            </section>
            <Font />
            <Modal id={id} pwd={pwd} />
        </>
    )
}

export default App
